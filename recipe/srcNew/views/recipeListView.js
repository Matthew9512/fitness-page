import { _resultsNumber } from '../config.js';
import { getRecipeList, state } from '../model.js';

export const renderRecipeList = function (paginationBtns) {
  const recipeList = document.querySelector('.recipe-list');
  recipeList.innerHTML = '';

  for (const recipe of state.recipe) {
    // cut uri string from fetch data to retrive recipe id
    const id = recipe.uri.slice(recipe.uri.indexOf('#'));

    const html = `
      <div class="recipe-wrapper" data-id="${id}">
        <img src="${recipe.image}" alt="food img" loading="lazy" class="recipe-list-img">
        <div class="recipe-info">
          <p class="recipe-title">${recipe.label}</p>
          <p class="recipe-source">${recipe.source}</p>
        </div>
      </div>`;
    recipeList.insertAdjacentHTML('afterbegin', html);
  }
  // display pagination btns after recipe list
  recipeList.insertAdjacentHTML('beforeend', paginationBtns);

  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  btnPrev.addEventListener('click', () => {
    state.fetchFROM -= _resultsNumber;
    state.fetchTO -= _resultsNumber;
    state.page = state.page - 1;

    getRecipeList();
  });
  btnNext.addEventListener('click', () => {
    state.fetchFROM += _resultsNumber;
    state.fetchTO += _resultsNumber;
    state.page = state.page + 1;

    getRecipeList();
  });
};
