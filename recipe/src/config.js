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
export const _recipeApiKey = import.meta.env.VITE_RECIPE_API_KEY;
export const _recipeAppId = import.meta.env.VITE_RECIPE_APP_ID;

// === new version of api === //
export const _recipeUrl = `https://api.edamam.com/api/recipes/v2`;
// === old version of api but still supported === //
export const _oldRecipeUrl = `https://api.edamam.com/search?app_id=${_recipeAppId}&app_key=${_recipeApiKey}`;

//
export const _resPerPage = 10;
export const _resultsNumber = 10;
