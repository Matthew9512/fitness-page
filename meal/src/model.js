import * as config from './config.js';
import { renderProductList } from './views/productList.js';
import { renderProductNutrition } from './views/productData.js';
import { decreaseMealSum } from './nutritionData.js';
import { renderSearchTemplate } from './views/searchTemplate.js';
import { loader } from './views/loaderView.js';

export const state = {
  productName: [],
  productData: [],
  productParent: [],
  totalSum: {
    carbs: [],
    kcal: [],
    fat: [],
    proteins: [],
  },
  mealSum: {
    carbs: [],
    kcal: [],
    fat: [],
    proteins: [],
  },
  mealNumber: 0,
};

//
const destructuringData = function () {
  const { ENERC_KCAL, CHOCDF, FAT, PROCNT } = state.productData.totalNutrients;
  const { totalWeight } = state.productData;
  const data = { ENERC_KCAL, CHOCDF, FAT, PROCNT, totalWeight };

  state.productData = data;

  renderProductNutrition();
};

export const getProductList = config._debounce(async function (inputValue) {
  const productParent = inputValue.closest('.product__component');
  loader(productParent);

  state.productParent = productParent;

  const errorMessage = state.productParent.querySelector('.error-message');

  try {
    const respond = await fetch(`${config._overallUrl}?ingr=${inputValue.value}`, config._overallOptions);
    const data = await respond.json();
    const productData = data.hints;

    if (productData.length === 0) {
      throw new Error(data.text);
    } else {
      state.productData = productData;
      renderProductList();
    }
  } catch (error) {
    console.log(error.message);
    errorMessage.classList.remove('hide');
    errorMessage.innerHTML = `We couldn't find any product named: <span class="error-span">${error.message}</span> please try again :)`;
  }

  inputValue.value = '';
  inputValue.blur();
});

// fetch product nutrition
export const getProductNutrition = async function (inputValue, productName) {
  const errorMessage = state.productParent.querySelector('.error-message');
  try {
    const respond = await fetch(`${config._ingUrl}?ingr=${inputValue}g%20${productName}`, config._ingOptions);
    const nutritionData = await respond.json();

    state.productData = nutritionData;
    state.productName = productName;

    destructuringData();
  } catch (error) {
    console.log(error.message);
    productSearchModal.classList.toggle('hidden');
    errorMessage.classList.remove('hide');
    errorMessage.innerHTML = `Looks like something went wrong, please try again ;)`;
  }
};

// remove clicked product
export const removeProduct = function (click) {
  const parentElement = click.closest('.product__component');
  const product = click.closest('.product');

  decreaseMealSum(product);
  removeHTML(click);
  parentElement.removeChild(product);
};

// keep track on removing meal templates based on how many products left
const removeHTML = function (click) {
  const mealGridArticle = document.querySelector('.meal__grid-article');
  const parentElement = click.closest('.product__component');
  const children = click.closest('.product__component').querySelectorAll('.product');
  const mealGridSum = document.querySelector('.meal__grid-sum');

  // number of meal templates
  const childrenNumber = mealGridArticle.childElementCount;

  // if theres only one meal template (parentElement => ('.product__component')) and it has no products then remove this meal template, hide main chart and render new search template
  if (children.length === 1 && childrenNumber === 1) {
    mealGridArticle.removeChild(parentElement);
    mealGridSum.classList.add('hidden');
    renderSearchTemplate();

    // if theres more than one meal template (parentElement => ('.product__component')) and it has no products then remove this meal template
  } else if (children.length === 1 && childrenNumber !== 1) {
    mealGridArticle.removeChild(parentElement);
    state.mealNumber = state.mealNumber -= 1;
  }
};
