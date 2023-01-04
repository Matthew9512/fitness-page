import { renderBtns } from './renderBtns.js';
import { getRecipe, takeID } from '../model.js';
// import { renderSpinner } from './renderSpinner.js';
// import { modal, scrollTop } from '../controller.js';

export const renderRecipeList = (recipeListData, data) => {
  const recipeList = document.querySelector('.recipe-list');
  recipeList.innerHTML = '';

  for (const recipe of recipeListData) {
    // cut uri string data to retrive recipe id
    const _cutURI = recipe.uri.indexOf('#');
    const id = recipe.uri.slice(_cutURI);

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

  // render prevPage and nextPage
  renderBtns(recipeList, data);

  // eventDelegation
  recipeList.addEventListener('click', takeID);
  //  => {
  // e.stopImmediatePropagation();
  // if (e.target.classList.contains('btn')) {
  //   console.log(`return`);
  //   return;
  // } else {
  //   const id = e.target.closest('.recipe-wrapper').dataset.id;
  //   console.log(id);
  //   // push id to link
  //   history.pushState(null, null, id);
  //   getRecipe();
  //   modal();
  //   scrollTop();
  // }
  // });

  // eventDelegation

  // const recipeWrapper = document.querySelectorAll('.recipe-wrapper');

  // recipeWrapper.forEach((wrapper) => {
  //   wrapper.addEventListener('click', (e) => {
  //     const id = e.currentTarget.dataset.id;
  //     // push id to link
  //     history.pushState(null, null, id);
  //     getRecipe();
  //     modal();
  //     scrollTop();
  //   });
  // });
};
