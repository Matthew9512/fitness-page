import * as config from './config.js';
import { renderRecipeList } from './views/recipeListView.js';
import { renderPagination } from './views/paginationView.js';
import { renderRecipe } from './views/recipeView.js';
import { renderBookmark } from './views/bookmarkView.js';
import { renderError } from './views/errorView.js';

const inpRecipe = document.querySelector('.inp-search-recipe');
const recipeSectionDisplay = document.querySelector('.recipe-section-display');

export const state = {
  recipe: [],
  productName: [],
  fetchFROM: 0,
  fetchTO: 10,
  page: 1,
  bookmarked: '<i class="bkm fa-solid fa-bookmark"></i>',
  notBookmarked: '<i class="bkm fa-regular fa-bookmark"></i>',
};

// fetch recipe list
export const getRecipeList = config._debounce(async function () {
  const bestRecipesSection = document.querySelector('.best-recipes-section');
  const errorMessage = document.querySelector('.error-message');
  try {
    const respond = await fetch(
      `${config._oldRecipeUrl}&q=${state.productName}&from=${state.fetchFROM}&to=${state.fetchTO}`,
      config._recipeOptions
    );
    const data = await respond.json();
    state.recipe = data;

    inpRecipe.value = '';
    inpRecipe.blur();

    if (data.hits.length === 0) {
      throw new Error(`We couldn't find any product, please try again :)`);
    } else {
      destructuringRecipeList();
      // hide product list and error message
      errorMessage.classList.add('hidden');
      bestRecipesSection.classList.add('hidden');
    }
  } catch (error) {
    errorMessage.classList.remove('hidden');
    errorMessage.innerHTML = `${error.message}`;
  }
});

// destructur fetched data
const destructuringRecipeList = () => {
  const numOfPages = state.recipe.count / config._resPerPage;

  state.recipe = state.recipe.hits.map((recipe) => {
    const { label, image, source, uri } = recipe.recipe;
    return { label, image, source, uri };
  });

  // display/update pagination btns
  const paginationBtns = renderPagination(numOfPages);

  renderRecipeList(paginationBtns);
  if (window.innerWidth < 900) recipeSectionDisplay.classList.add('hidden');
  else recipeSectionDisplay.classList.remove('hidden');
};

// destructur fetch recipe data
const destructuringRecipe = function (data) {
  const { recipe } = data;
  return {
    source: recipe.source,
    label: recipe.label,
    images: recipe.images,
    totalTime: recipe.totalTime,
    dishType: recipe.dishType,
    url: recipe.url,
    yield: recipe.yield,
    ingredients: recipe.ingredients,
    carbs: recipe.totalNutrients.CHOCDF,
    kcal: recipe.totalNutrients.ENERC_KCAL,
    fat: recipe.totalNutrients.FAT,
    proteins: recipe.totalNutrients.PROCNT,
  };
};

// fetch recipe
export const recipeItem = async function (e) {
  const click = e.target;
  console.log(click);
  if (!click.closest('.recipe-wrapper')) return;
  else {
    recipeSectionDisplay.classList.remove('hidden');
    const parentID = click.closest('.recipe-wrapper').dataset.id;
    window.history.pushState(null, null, parentID);
    const ID = window.location.hash.slice(1);

    try {
      const respond = await fetch(
        `${config._recipeUrl}/${ID}?type=public&app_id=${config._recipeAppId}&app_key=${config._recipeApiKey}`,
        config._recipeOptions
      );
      const data = await respond.json();

      state.recipe = destructuringRecipe(data);
      // check if product was marked as bookmark
      const check = checkBookmark(ID);
      renderRecipe(ID, check);
    } catch (error) {
      console.log(error.message);
      const errorDiv = renderError();
      document.body.insertAdjacentHTML('afterbegin', errorDiv);
    }
  }
};

// get local storage
export const getLS = function () {
  return localStorage.getItem('recipe') ? JSON.parse(localStorage.getItem('recipe')) : [];
};

// display bookmark message and proper bookmark icon
export const bookmark = function (e) {
  const bookmarkDivRemoved = document.querySelector('.bookmark-div__removed');
  const bookmarkDivAdded = document.querySelector('.bookmark-div__added');
  const click = e.currentTarget;
  if (click.innerHTML === state.notBookmarked) {
    click.innerHTML = state.bookmarked;
    // display popup message
    bookmarkDivAdded.classList.toggle('hidden');
    setTimeout(() => {
      bookmarkDivAdded.classList.toggle('hidden');
    }, 1000);
    addBookmark(click);
  } else {
    click.innerHTML = state.notBookmarked;
    // display popup message
    bookmarkDivRemoved.classList.toggle('hidden');
    setTimeout(() => {
      bookmarkDivRemoved.classList.toggle('hidden');
    }, 1000);
    removeBookmark(click);
  }
};

// add recipe to localstorage
export const addBookmark = (click) => {
  const lsArr = getLS();

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

  lsArr.push(bookmarkArr);
  localStorage.setItem('recipe', JSON.stringify(lsArr));
  lengthBookmark();
};

// remove recipe from localstorage
const removeBookmark = function (click) {
  const id = click.closest('.new-recipe').dataset.id;
  const lsArr = getLS();
  const updatedLS = lsArr.filter((value) => value.id !== id);

  localStorage.setItem('recipe', JSON.stringify(updatedLS));
  lengthBookmark();
};

// display proper bookmark icon when recipe loads
export const checkBookmark = function (ID) {
  const lsArr = getLS();
  const check = lsArr.find((value) => value.id === ID);
  return check ? state.bookmarked : state.notBookmarked;
};

// update number of bookmarked recipes and render bookmark component
const lengthBookmark = function () {
  const bookmarkNumber = document.querySelector('.bookmark-number');
  const bookmarkDrop = document.querySelector('.bookmark-drop');
  const lsArr = getLS();

  if (lsArr.length === 0) {
    bookmarkNumber.innerHTML = 0;
    bookmarkDrop.innerHTML = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  } else {
    renderBookmark(lsArr);
    bookmarkNumber.innerHTML = lsArr.length;
  }
};
lengthBookmark();
