export const _videoOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_EXERCISES_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};
export const _videoUrl = 'https://youtube-search-and-download.p.rapidapi.com';

export const _exercisesOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};
export const _exerciseUrl = 'https://exercisedb.p.rapidapi.com/exercises';

// function to improve users experience => fetch/change state when user finish task
export const _debounce = function (fn, deley) {
  let id;
  return (...args) => {
    if (id) clearInterval(id);
    id = setTimeout(() => {
      fn(...args);
    }, deley);
  };
};

export const _resPerPage = 10;
