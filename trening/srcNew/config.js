// import * as dotenv from 'dotenv';
// dotenv.config();

export const _videoOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `f8a3c34476msh3207ffa0714a7e4p1176d1jsn82cc4776c233`,
    // 'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};
export const _videoUrl = 'https://youtube-search-and-download.p.rapidapi.com';

// !!!!! main ExerciseDB !!!!!
// 21 left
// 24-12
// export const _exercisesOptions = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
//   },
// };

export const _exercisesOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `94c6119454mshd12038289473588p123eadjsne98db6139cad`,
    // 'X-RapidAPI-Key': `${process.env.EXERCISES_KEY}`,
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