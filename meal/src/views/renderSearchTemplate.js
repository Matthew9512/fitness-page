import { _debounce } from '../config.js';
import { getProductList } from '../model.js';
import { scrollBottom } from '../controller.js';

const mealSectionWrapper = document.querySelector('.meal-section-wrapper');
const displayMealArticle = document.querySelector('.display-meal-article');

let mealNumber = 0;
// start and display new meal template
export const renderSearchTemplate = () => {
  // keep track of meal number
  mealNumber++;
  mealSectionWrapper.classList.add('hidden');

  const showNewProduct = document.createElement('article');
  showNewProduct.classList.add('show-new-product');
  showNewProduct.id = `${mealNumber}`;

  showNewProduct.innerHTML = ` 
  <legend>Meal number ${mealNumber}</legend>
    <div class="input-search-wrapper">
      <div class="search-div">
      <div class="search-div__wrapper">
      <input type="text" id="meal-search" class="inp" placeholder="search product" />
      <label for="product-search" class="label-search-icon"><i class="fa-brands fa-searchengin"></i></label>
      <p class="error-message hide"></p>
        </div>
        <button class="btn-add-meal">New meal</button>
      </div>
      <div class="meal-sum hidden">
        <p class="meal-nutrition-sum">Sum nutrition of your meal: </p>
          <ol>
            <li class="meal-nutrition-sum">Kcal: <span class="nutrition-kcal-total"> </span></li>
            <li class="meal-nutrition-sum">Proteins: <span class="nutrition-proteins-total"> </span></li>
            <li class="meal-nutrition-sum">Carbs: <span class="nutrition-carbs-total"> </span> </li>
            <li class="meal-nutrition-sum">Fat: <span class="nutrition-fat-total"> </span></li>
          </ol>
      </div>
    </div>`;

  displayMealArticle.appendChild(showNewProduct);

  scrollBottom();

  const mealSearch = showNewProduct.querySelector('#meal-search');
  const btnNewMeal = showNewProduct.querySelector('.btn-add-meal');

  // taka value of input to make a fetch call
  mealSearch.addEventListener('input', () => {
    const mealSearchValue = mealSearch.value;
    getProductList(mealSearchValue, showNewProduct);
  });

  // render a new meal article
  btnNewMeal.addEventListener('click', renderSearchTemplate);
};
