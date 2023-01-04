import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const _videoOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPID_API_OPTIONS}`,
    // 'X-RapidAPI-Key': '94c6119454mshd12038289473588p123eadjsne98db6139cad',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
  },
};
export const _videoUrl = 'https://youtube-search-and-download.p.rapidapi.com';

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

// export const _exercisesOptions = {
// last was 16.12 => 160 total
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '94c6119454mshd12038289473588p123eadjsne98db6139cad',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
//   },
// };
export const _exerciseUrl = 'https://exercisedb.p.rapidapi.com/exercises';

// !!!!! main ExerciseDB !!!!!
// 21 left
// export const _exercisesOptions = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '32a6bd7e9dmsh3552baee89ed382p189bfejsne6b479110e8f',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
//   },
// };

// SECOND
// 15 left
export const _exercisesOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.EXERCISES_OPTIONS}`,
    // 'X-RapidAPI-Key': 'f8a3c34476msh3207ffa0714a7e4p1176d1jsn82cc4776c233',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};
