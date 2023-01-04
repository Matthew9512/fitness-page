import * as config from './config.js';
import { getRecipeList, getRecipe } from './model.js';

const inpSearchRecipe = document.querySelector('.inp-search-recipe');

// export let inpSearchRecipeArr = [];

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
  const recipeSectionDisplay = document.querySelector('.render-recipe-article');
  if (window.innerWidth > 900) recipeSectionDisplay.classList.remove('hidden');
  else recipeSectionDisplay.classList.toggle('hidden');
};

// scroll to top
export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

inpSearchRecipe.addEventListener('input', config._debounce(getRecipeList, 1200));
window.addEventListener('load', getRecipe);
