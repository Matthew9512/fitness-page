import * as config from './config.js';
import { renderProductList } from './views/productList.js';
import { renderProductNutrition } from './views/productData.js';
import { decreaseMealSum } from './nutritionData.js';

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
  const errorMessage = document.querySelector('.error-message');
  const productParent = inputValue.closest('.product__component');

  state.productParent = productParent;
  console.log(productParent);

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
    // console.log(error.message);
    // errorMessage.classList.remove('hide');
    // errorMessage.innerHTML = `We couldn't find any product named: <span class="error-span">${error.message}</span> please try again :)`;
  }

  inputValue.value = '';
  inputValue.blur();
});

//
export const getProductNutrition = async function (inputValue, productName) {
  try {
    const respond = await fetch(`${config._ingUrl}?ingr=${inputValue}%20${productName}`, config._ingOptions);
    const nutritionData = await respond.json();

    state.productData = nutritionData;
    state.productName = productName;

    destructuringData();
  } catch (error) {
    console.log(error.message);
  }
};

//
export const removeProduct = function (click) {
  const parentElement = click.closest('.product__component');
  const product = parentElement.querySelector('.product');

  decreaseMealSum(product);
  parentElement.removeChild(product);
};
