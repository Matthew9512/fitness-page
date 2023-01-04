import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// // === main food
// // ingridient and amount
export const _ingOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPID_API_OPTIONS}`,
    // 'X-RapidAPI-Key': '32a6bd7e9dmsh3552baee89ed382p189bfejsne6b479110e8f',
    'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
  },
};

// overall nutrition info
export const _overallOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPID_API_OPTIONS}`,
    // 'X-RapidAPI-Key': '32a6bd7e9dmsh3552baee89ed382p189bfejsne6b479110e8f',
    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
  },
};

export const _overallUrl = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser';
export const _ingUrl = 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data';
// main food

// === usage is here === //
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

// second food
// export const _overallOptions = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': `${process.env.RAPID_API_OPTIONS}`,
//     // 'X-RapidAPI-Key': '94c6119454mshd12038289473588p123eadjsne98db6139cad',
//     'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com',
//   },
// };

// export const _ingOptions = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': `${process.env.RAPID_API_OPTIONS}`,
//     // 'X-RapidAPI-Key': '94c6119454mshd12038289473588p123eadjsne98db6139cad',
//     'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
//   },
// };
