import * as config from './config.js';
import { renderProductList } from './views/renderProductList.js';
import { renderProductNutrition } from './views/renderProductNutrition.js';
import { renderSpinner } from './views/renderSpinner.js';
import { scrollBottom } from './controller.js';

const btnNewMeal = document.querySelector('.btn-new-meal');
const productSearchModal = document.querySelector('.product-search-modal');

// fetch list of product based on imput value
export const getProductList = config._debounce(async (mealSearchValue, showNewProduct) => {
  const mealSearch = showNewProduct.querySelector('#meal-search');
  const errorMessage = showNewProduct.querySelector('.error-message');

  // remove focus and clear input value
  mealSearch.value = '';
  mealSearch.blur();

  try {
    const respond = await fetch(`${config._overallUrl}?ingr=${mealSearchValue}`, config._overallOptions);
    const data = await respond.json();
    const productData = data.hints;

    // throw a new error if respond is empty
    if (!productData.length) {
      throw new Error(data.text);
    } else {
      // hide product list and error message
      errorMessage.classList.add('hide');
      productSearchModal.classList.toggle('hidden');
      renderProductList(productData, showNewProduct);
    }
  } catch (error) {
    errorMessage.classList.remove('hide');
    errorMessage.innerHTML = `We couldn't find any product named: <span class="error-span">${error.message}</span> please try again :)`;
  }
});

// fetch product based on product name and ammount of it
export const getProductNutrition = async (productName, impAmmountValue, showNewProduct) => {
  const errorMessage = showNewProduct.querySelector('.error-message');

  try {
    const respond = await fetch(`${config._ingUrl}?ingr=${impAmmountValue}%20${productName}`, config._ingOptions);
    const nutritionData = await respond.json();
    renderProductNutrition(productName, impAmmountValue, nutritionData, showNewProduct);
    scrollBottom();
    productSearchModal.classList.toggle('hidden');
    btnNewMeal.classList.remove('hidden');
  } catch (error) {
    productSearchModal.classList.toggle('hidden');
    errorMessage.classList.remove('hide');
    errorMessage.innerHTML = `Looks like something went wrong, please try again ;)`;
  }
};
