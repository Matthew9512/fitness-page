// import * as dotenv from 'dotenv';
// dotenv.config();

export const _debounce = function (fn, deley = 1200) {
  let id;
  return (...args) => {
    if (id) clearInterval(id);
    id = setTimeout(() => {
      fn(...args);
    }, deley);
  };
};

// edamam api _recipeOptions
export const _recipeOptions = {
  method: 'GET',
  header: {
    'Content-Type': 'application/json',
  },
};
// edamam app info
export const _recipeApiKey = `047e98544b24e92e8bb6ba60b458939c`;
export const _recipeAppId = `f6481aae`;
// export const _recipeApiKey = `${process.env.RECIPE_API_KEY}`;
// export const _recipeAppId = `${process.env.RECIPE_APP_ID}`;

// === new version of api === //
export const _recipeUrl = `https://api.edamam.com/api/recipes/v2`;
// === old version of api but still supported === //
export const _oldRecipeUrl = `https://api.edamam.com/search?app_id=${_recipeAppId}&app_key=${_recipeApiKey}`;

//
export const _resPerPage = 10;
export const _resultsNumber = 10;