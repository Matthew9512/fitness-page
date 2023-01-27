import { getRecipeList, state, recipeItem } from './model.js';
import { _debounce } from './config.js';

const inpRecipe = document.querySelector('.inp-search-recipe');
const recipeList = document.querySelector('.recipe-list');

// show/hide more text => best recipes section
const btnShow = document.querySelectorAll('.btn-show');
btnShow.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const click = e.target;
    const target = click.previousElementSibling;
    target.classList.toggle('show-more');
    !target.classList.contains('show-more') ? (btn.innerHTML = 'Hide text') : (btn.innerHTML = 'Show more');
  });
});

// modal on small screen
export const modal = () => {
  history.pushState(null, null, ' ');
  const recipeSectionDisplay = document.querySelector('.recipe-section-display');
  recipeSectionDisplay.classList.toggle('hidden');
};

// addEventListeners
inpRecipe.addEventListener('input', () => {
  state.productName = inpRecipe.value;
  //   reset fetch setings to display proper pagination
  state.fetchFROM = 0;
  state.fetchTO = 10;
  state.page = 1;

  getRecipeList();
});
recipeList.addEventListener('click', recipeItem);
