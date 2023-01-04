import * as config from './config.js';
import { renderRecipeList } from './views/renderRecipeList.js';
import { renderRecipe } from './views/renderRecipe.js';
import { renderSpinner } from './views/renderSpinner.js';
import { renderBookmark } from './views/renderBookmark.js';
import { modal, scrollTop } from './controller.js';
import { renderError } from './views/renderError.js';

const inpSearchRecipe = document.querySelector('.inp-search-recipe');

const recipeObj = {
  recipeName: [],
};

// === pagination === //
// pagination from NEW VERSION OF API => display next recipe list page
// export const displayNextResultsPage = async (nextPage) => {
//   try {
//     const respond = await fetch(`${nextPage}`);
//     const data = await respond.json();
//     const recipeListData = data.hits.map((recipe) => {
//       const { label, image, source, uri } = recipe.recipe;
//       return { label, image, source, uri };
//     });
//     renderRecipeList(recipeListData, data);
//     inpSearchRecipe.value = '';
//     inpSearchRecipe.blur();
//     console.log(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// destructuring fetch data
const destructuringData = (data) => {
  const recipeListData = data.hits.map((recipe) => {
    const { label, image, source, uri } = recipe.recipe;
    return { label, image, source, uri };
  });
  renderRecipeList(recipeListData, data);
};

export const getRecipeList = async () => {
  const bestRecipesSection = document.querySelector('.best-recipes-section');
  const errorMessage = document.querySelector('.error-message');

  const inpSearchRecipeValue = inpSearchRecipe.value;
  recipeObj.recipeName = inpSearchRecipeValue;

  try {
    const respond = await fetch(
      `${config._recipeUrl}?type=public&app_id=${config._recipeAppId}&app_key=${config._recipeApiKey}&q=${inpSearchRecipeValue}`,
      config._recipeOptions
    );
    const data = await respond.json();
    if (data.hits.length === 0) {
      throw new Error(`We couldn't find any product, please try again :)`);
    } else {
      destructuringData(data);
      // hide product list and error message
      errorMessage.classList.add('hidden');
      bestRecipesSection.classList.add('hidden');
      inpSearchRecipe.value = '';
      inpSearchRecipe.blur();
    }
  } catch (error) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerHTML = `${error.message}`;
  }
};

// old but still supported version of api => only way for now to make next page work
export const displayNextResultsPage = async (from, to) => {
  try {
    const respond = await fetch(`${config._oldRecipeUrl}&q=${recipeObj.recipeName}&from=${from + 20}&to=${to + 20}`, config._recipeOptions);
    const data = await respond.json();

    destructuringData(data);

    inpSearchRecipe.value = '';
    inpSearchRecipe.blur();
  } catch (error) {
    const errorDiv = renderError();
    document.body.insertAdjacentHTML('afterbegin', errorDiv);
  }
};

// old but still supported version of api => only way for now to make prev page work
export const displayPrevResultsPage = async (from, to) => {
  try {
    const respond = await fetch(`${config._oldRecipeUrl}&q=${recipeObj.recipeName}&from=${from - 20}&to=${to - 20}`, config._recipeOptions);
    const data = await respond.json();

    destructuringData(data);

    inpSearchRecipe.value = '';
    inpSearchRecipe.blur();
  } catch (error) {
    const errorDiv = renderError();
    document.body.insertAdjacentHTML('afterbegin', errorDiv);
  }
};

// fetch recipe by id
export const getRecipe = async () => {
  // take # from link, remove # and add to fetch link
  const id = window.location.hash.slice(1);
  if (!id) return;

  try {
    const respond = await fetch(
      `${config._recipeUrl}/${id}?type=public&app_id=${config._recipeAppId}&app_key=${config._recipeApiKey}`,
      config._recipeOptions
    );
    const currentMealData = await respond.json();
    renderRecipe(currentMealData, id);
    checkBookmark(id);
  } catch (error) {
    const errorDiv = renderError();
    document.body.insertAdjacentHTML('afterbegin', errorDiv);
  }
};

// take dataset.id from recipe item / return if click on pagination btn
export const takeID = (e) => {
  // e.stopImmediatePropagation();
  if (e.target.classList.contains('btn')) return;
  const id = e.target.closest('.recipe-wrapper').dataset.id;
  console.log(id);
  // push id to link
  history.pushState(null, null, id);
  getRecipe();
  modal();
  scrollTop();
};

// === localStorage functions === //
// get and return localStorage
const getLS = () => {
  const getLSArr = localStorage.getItem('recipe') ? JSON.parse(localStorage.getItem('recipe')) : [];
  return getLSArr;
};

// push bookmark to local storage function
const pushLS = (bookmarkArr) => {
  const getLSArr = getLS();
  getLSArr.push(bookmarkArr);
  localStorage.setItem('recipe', JSON.stringify(getLSArr));

  renderBookmark(getLSArr);
};

// update ls after bookmarking recipe
export const updateLS = (click) => {
  const parentElementID = click.closest('.new-recipe').dataset.id;

  const getLSArr = getLS();

  // return recipes that are different than clicked recipe
  const changedLSArr = getLSArr.filter((value) => {
    if (value.id !== parentElementID) return value;
  });
  localStorage.setItem('recipe', JSON.stringify(changedLSArr));
  renderBookmark(changedLSArr);
};

// check ammount of item in localStorage to display proper number value
export const checkLS = () => {
  const bookmarkNumber = document.querySelector('.bookmark-number');
  const getLSArr = getLS();

  if (!getLSArr) bookmarkNumber.innerHTML = 0;
  else bookmarkNumber.innerHTML = getLSArr.length;
};

// === bookmark functions === //
// push data from recipe to bookmark arr
export const bookmarkProduct = (click) => {
  const parentElement = click.closest('.new-recipe');
  const id = parentElement.dataset.id;
  const bookmarkImg = parentElement.querySelector('.recipe-img').src;
  const bookmarkTitle = parentElement.querySelector('.recipe-meal-title').innerHTML;
  const bookmarkSource = parentElement.querySelector('.recipe-meal-source').innerHTML;

  // push data to bookmarkArr
  const bookmarkArr = {
    id: id,
    image: bookmarkImg,
    title: bookmarkTitle,
    source: bookmarkSource,
  };

  pushLS(bookmarkArr);
};

// check if localStorage arr contains specific meal and display appropriate icon
export const checkBookmark = (id) => {
  const getLSArr = getLS();
  if (!getLSArr) return '<i class="fa-regular fa-bookmark"></i>';
  else {
    // find recipe in ls and return specific icon
    const findTitle = getLSArr.find((value) => value.id === id);
    const isBookmarked = findTitle ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
    return isBookmarked;
  }
};

// get bookmark from local storage
export const getLSBookmark = () => {
  const bookmarkDrop = document.querySelector('.bookmark-drop');
  const getLSArr = getLS();
  if (!getLSArr) bookmarkDrop.innerHTML = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  else renderBookmark(getLSArr);
};
getLSBookmark();
