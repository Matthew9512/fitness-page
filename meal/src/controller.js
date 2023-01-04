import { deleteProduct } from './nutritionData.js';
import { renderSearchTemplate } from './views/renderSearchTemplate.js';

const btnNewMeal = document.querySelector('.btn-new-meal');
const inputSearchWrapper = document.querySelector('.input-search-wrapper');
const displayMealArticleGrid = document.querySelector('.display-meal-article-grid');

btnNewMeal.addEventListener('click', () => {
  inputSearchWrapper.classList.add('hidden');
  displayMealArticleGrid.classList.remove('hidden');
  renderSearchTemplate();
});

// line clamp idea
const btnToggleClamp = document.querySelector('.btn-toggle-clamp');
btnToggleClamp.addEventListener('click', () => {
  const mealSectionText = document.querySelector('.meal-section-text');
  mealSectionText.classList.toggle('line-clamp');
  btnToggleClamp.textContent = 'hide';
  if (mealSectionText.classList.contains('line-clamp')) btnToggleClamp.textContent = 'read more';
});

// delete product
export const removeProduct = (btnDelete, mealNutritionObj) => {
  btnDelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const click = e.currentTarget;
      const target = click.closest('.new-product');
      const parent = click.closest('.show-new-product');
      parent.removeChild(target);

      //
      deleteProduct(target, mealNutritionObj, parent);
      e.stopImmediatePropagation();
    });
  });
};

// scrollBottom of .display-meal-article
export const scrollBottom = () => {
  const displayMealArticle = document.querySelector('.display-meal-article');
  const bottom = displayMealArticle.getBoundingClientRect().bottom;
  displayMealArticle.scrollTo({
    top: `${bottom}`,
    behavior: 'smooth',
  });
};
