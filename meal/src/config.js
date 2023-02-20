// ingridient and amount
export const _ingOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
  },
};
export const _ingUrl = 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data';

// overall nutrition info
export const _overallOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
  },
};
export const _overallUrl = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser';

export const _debounce = function (fn, deley = 1200) {
  let id;
  return (...args) => {
    if (id) clearInterval(id);
    id = setTimeout(() => {
      fn(...args);
    }, deley);
  };
};

export let _numberOfResults = 10;
