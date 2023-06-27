import { _debounce } from '../config.js';
import { getProductList, state } from '../model.js';

let number = 0;

export const renderSearchTemplate = function () {
   const mealGrid = document.querySelector('.meal__grid-article');
   number++;

   state.mealNumber = state.mealNumber += 1;

   const displayNumber = state.mealNumber <= 1 ? `Meal` : `Meal number ${state.mealNumber}`;

   const html = ` 
  <div class="product__component" data-id="${number}">
  <legend>${displayNumber}</legend>
        <div class="product__component-wrapper">
        <div class="product__component-div">
          <div class="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path
                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                </path>
            </g>
            </svg>
            <input placeholder="E.g. cheese" type="search" class="input input-search" />
          </div>
        <button class="button btn-add-meal">New meal</button>
        </div>
        <p class="error-message hide"></p>
        </div>
        <div class="product__sum hidden">
          <p class="product__sum-info">Sum nutrition of your meal: </p>
            <ol>
            <li class="product__sum-info">Kcal: <span class="nutrition-kcal-total"> </span></li>
            <li class="product__sum-info">Carbs: <span class="nutrition-carbs-total"> </span> </li>
            <li class="product__sum-info">Fat: <span class="nutrition-fat-total"></span></li>
              <li class="product__sum-info">Proteins: <span class="nutrition-proteins-total"></span></li>
            </ol>
        </div>
      </div>`;

   mealGrid.insertAdjacentHTML('afterbegin', html);

   const btnAddMeal = document.querySelector('.btn-add-meal');
   const inputSearch = document.querySelectorAll('.input-search');

   btnAddMeal.addEventListener('click', renderSearchTemplate);
   inputSearch.forEach((inputValue) => {
      inputValue.addEventListener('input', () => {
         getProductList(inputValue);
      });
   });
};
