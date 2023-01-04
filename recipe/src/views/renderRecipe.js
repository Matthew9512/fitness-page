import { bookmarkProduct, checkBookmark, updateLS } from '../model.js';
import { modal } from '../controller.js';

const renderRecipeArticle = document.querySelector('.render-recipe-article');

const bookmarkDivRemoved = document.querySelector('.bookmark-div__removed');
const bookmarkDivAdded = document.querySelector('.bookmark-div__added');

export const renderRecipe = (currentMealData, id) => {
  renderRecipeArticle.innerHTML = '';

  const { source, label, images, totalTime, dishType, url } = currentMealData.recipe;
  const { CHOCDF, PROCNT, FAT, ENERC_KCAL } = currentMealData.recipe.totalNutrients;

  const mealNutrition = currentMealData.recipe.ingredients
    .map((ing) => {
      return `
        <li class="ingredient-item">${Math.floor(ing.weight)}g / ${ing.text}</li>`;
    })
    .join('');

  const isBookmarked = checkBookmark(id);

  const html = `
    <div class="new-recipe" data-id="${id}">
    <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
      <img src="${images.REGULAR.url}" alt="meal recipe img" class="recipe-img" />
      <h3 class="recipe-meal-title">${label}</h3>
      <p class="recipe-meal-type">${dishType}</p>
      <div class="recipe-details">
        <div class="recipe-info">
          <i class="fa-regular fa-clock"></i>
          <span>${totalTime} MIN</span>
          <i class="fa-solid fa-user"></i>
          <span>${currentMealData.recipe.yield} SERVINGS</span>
        </div>
        <button class="btn-bookmark">${isBookmarked}</button>
      </div>
    <h3 class="recipe-meal-title recipe-title">recipe ingredients</h3>
    <div class="recipe-ingredients">
      <ol class="ingredients-list">
        ${mealNutrition}
      </ol>
    </div>
    <div class="recipe-nutrition-wrapper">
      <p class="recipe-nutrition-item">${CHOCDF.label}: ${Math.floor(CHOCDF.quantity)} ${CHOCDF.unit}</p>
      <p class="recipe-nutrition-item">${PROCNT.label}: ${Math.floor(PROCNT.quantity)} ${PROCNT.unit}</p>
      <p class="recipe-nutrition-item">${FAT.label}: ${Math.floor(FAT.quantity)} ${FAT.unit}</p>
      <p class="recipe-nutrition-item">${ENERC_KCAL.label}: ${Math.floor(ENERC_KCAL.quantity)} ${ENERC_KCAL.unit}</p>
    </div>
    <h3 class="new-recipe-footer-title">Intrested in this recipe?</h3>
    <p class="new-recipe-footer-text">
      Vistit creators site <a href="${url}" target="_blank"><span class="recipe-meal-source">${source}</span></a>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, dolorum!
    </p>
  </div>`;

  renderRecipeArticle.insertAdjacentHTML('beforeend', html);

  const btnBookmark = document.querySelector('.btn-bookmark');
  const btnClose = document.querySelector('.btn-close');

  btnClose.addEventListener('click', () => {
    history.pushState(null, null, ' ');
    modal();
  });

  btnBookmark.addEventListener('click', (e) => {
    const click = e.currentTarget;
    if (click.innerHTML === '<i class="fa-regular fa-bookmark"></i>') {
      bookmarkDivAdded.classList.toggle('hidden');
      setTimeout(() => {
        bookmarkDivAdded.classList.toggle('hidden');
      }, 1000);
      click.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
      bookmarkProduct(click);
    } else {
      bookmarkDivRemoved.classList.toggle('hidden');
      setTimeout(() => {
        bookmarkDivRemoved.classList.toggle('hidden');
      }, 1000);
      click.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      updateLS(click);
    }
  });
};
