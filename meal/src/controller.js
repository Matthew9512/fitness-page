import { renderSearchTemplate } from './views/searchTemplate.js';
import * as model from './model.js';

const searchWrapper = document.querySelector('.search-wrapper');
const productSearch = document.querySelector('.product__search');
const mealContainer = document.querySelector('.meal__container');
const mealGridArticle = document.querySelector('.meal__grid-article');
const mealSectionWrapper = document.querySelector('.meal__section-wrapper');
const mealSectionText = document.querySelector('.meal__section-text');

// btns
const btnNewMeal = document.querySelector('.btn-new-meal');
const btnToggleClamp = document.querySelector('.btn-toggle-clamp');

//
const searchUI = function () {
   searchWrapper.classList.add('hidden');
   mealSectionWrapper.classList.add('hidden');
   mealContainer.classList.remove('hidden');

   renderSearchTemplate();
};

// addEventListeners
btnNewMeal.addEventListener('click', searchUI);
// show more/hide text
btnToggleClamp.addEventListener('click', () => {
   mealSectionText.classList.toggle('line-clamp');
});
productSearch.addEventListener('click', (e) => {
   const errorMessage = model.state.productParent.querySelector('.error-message');
   errorMessage.classList.add('hide');

   const click = e.target;
   if (!click.classList.contains('add')) return;
   else {
      const inputValue = click.closest('.item__wrapper').querySelector('.input-search').value;
      const productName = click.closest('.item__wrapper').querySelector('.product__title').textContent;
      model.getProductNutrition(inputValue, productName);
   }
});
mealGridArticle.addEventListener('click', (e) => {
   const click = e.target;
   if (!click.classList.contains('delete')) return;
   else model.removeProduct(click);
});
