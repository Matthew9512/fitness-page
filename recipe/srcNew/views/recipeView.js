import { modal } from '../controller.js';
import { state, bookmark } from '../model.js';

export const renderRecipe = function (ID, check) {
  const renderRecipeArticle = document.querySelector('.render-recipe-article');
  renderRecipeArticle.classList.remove('hidden');
  renderRecipeArticle.innerHTML = '';

  const mealNutrition = state.recipe.ingredients
    .map((ing) => {
      return `
        <li class="ingredient-item">${Math.floor(ing.weight)}g / ${ing.text}</li>`;
    })
    .join('');

  const html = `
    <div class="new-recipe" data-id="${ID}">
    <button class="btn-close"><i class="fa-solid fa-xmark"></i></button>
      <img src="${state.recipe.images.REGULAR.url}" alt="meal recipe img" class="recipe-img" />
      <h3 class="recipe-meal-title">${state.recipe.label}</h3>
      <p class="recipe-meal-type">${state.recipe.dishType.at(0)}</p>
      <div class="recipe-details">
        <div class="recipe-info">
          <i class="fa-regular fa-clock"></i>
          <span>${state.recipe.totalTime} MIN</span>
          <i class="fa-solid fa-user"></i>
          <span>${state.recipe.yield} SERVINGS</span>
        </div>
       <button class="btn-bookmark">${check}</button>
      </div>
    <h3 class="recipe-meal-title recipe-title">recipe ingredients</h3>
    <div class="recipe-ingredients">
      <ol class="ingredients-list">
        ${mealNutrition}
      </ol>
    </div>
    <div class="recipe-nutrition-wrapper">
      <p class="recipe-nutrition-item">${state.recipe.carbs.label}: ${Math.ceil(state.recipe.carbs.quantity)} ${state.recipe.carbs.unit}</p>
      <p class="recipe-nutrition-item">${state.recipe.kcal.label}: ${Math.ceil(state.recipe.kcal.quantity)} ${state.recipe.kcal.unit}</p>
      <p class="recipe-nutrition-item">${state.recipe.fat.label}: ${Math.ceil(state.recipe.fat.quantity)} ${state.recipe.fat.unit}</p>
      <p class="recipe-nutrition-item">${state.recipe.proteins.label}: ${Math.ceil(state.recipe.proteins.quantity)} ${
    state.recipe.proteins.unit
  }</p>
    </div>
    <h3 class="new-recipe-footer-title">Intrested in this recipe?</h3>
    <p class="new-recipe-footer-text">
      Vistit creators site <a href="${state.recipe.url}" target="_blank"><span class="recipe-meal-source">${state.recipe.source}</span></a>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, dolorum!
    </p>
  </div>`;

  renderRecipeArticle.insertAdjacentHTML('afterbegin', html);

  const btnBookmark = document.querySelector('.btn-bookmark');
  const btnClose = document.querySelector('.btn-close');

  btnBookmark.addEventListener('click', bookmark);
  btnClose.addEventListener('click', modal);
};
