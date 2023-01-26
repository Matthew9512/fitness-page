import * as config from './config.js';
import { renderBodyParts } from './views/bodyPartsView.js';
import { renderExercises } from './views/exercisesView.js';
import { renderPagination } from './views/paginationView.js';
import { renderExercise } from './views/exerciseView.js';
import { renderVideos } from './views/videosView.js';
import { renderBookmark } from './views/bookmarkView.js';

export const state = {
  exercises: [],
  slicedExercises: [],
  page: 1,
  bookmarked: '<i class="bkm fa-solid fa-bookmark"></i>',
  notBookmarked: '<i class="bkm fa-regular fa-bookmark"></i>',
};

// fetch body parts
export const getBodyParts = async function () {
  try {
    const respond = await fetch(`${config._exerciseUrl}/bodyPartList`, config._exercisesOptions);
    const data = await respond.json();

    renderBodyParts(data);
  } catch (error) {
    // console.log(error.message);
  }
};

// fetch exercises list
export const getExercises = async function (e) {
  const click = e.target;
  if (!click.closest('.tooltip')) return;
  else {
    try {
      const exerciseName = click.closest('.tooltip').dataset.name;
      const respond = await fetch(`${config._exerciseUrl}/bodyPart/${exerciseName}`, config._exercisesOptions);
      const data = await respond.json();

      state.exercises = data;
      pagination();
    } catch (error) {
      console.log(error.message);
    }
  }
};

// fetch exercise by id
export const getExerciseByID = async function (click) {
  const ID = click.closest('.exercise-item').dataset.id;
  const name = click.closest('.exercise-item').dataset.name;

  try {
    const exerciseRespond = await fetch(`${config._exerciseUrl}/exercise/${ID}`, config._exercisesOptions);
    const exerciseData = await exerciseRespond.json();

    // fetch videos
    const videoRespond = await fetch(`${config._videoUrl}/search?query=${name}`, config._videoOptions);
    const videoData = await videoRespond.json();

    const slicedVideoData = await destructuring(videoData);
    const videos = renderVideos(slicedVideoData);
    renderExercise(exerciseData, videos);
  } catch (error) {
    // console.log(error.message);
  }
};

// cut arr of fetched exercises
export const pagination = function () {
  const prev = (state.page - 1) * config._resPerPage;
  const next = state.page * config._resPerPage;
  const numOfPages = Math.ceil(state.exercises.length / config._resPerPage);

  state.slicedExercises = state.exercises.slice(prev, next);

  const paginationBtns = renderPagination(numOfPages);
  renderExercises(paginationBtns);
};

// dest fetched videos
const destructuring = function (videoData) {
  const videos = videoData.contents.slice(0, 3).map((value) => {
    return {
      title: value.video.title,
      channelName: value.video.channelName,
      videoId: value.video.videoId,
      thumbnails: value.video.thumbnails,
    };
  });
  return videos;
};

//
const getLS = function () {
  return localStorage.getItem('exercise') ? JSON.parse(localStorage.getItem('exercise')) : [];
};

//
export const bookmark = function (click) {
  const target = click.closest('.btn-bookmark');
  const bookmarkDivRemoved = document.querySelector('.bookmark-div__removed');
  const bookmarkDivAdded = document.querySelector('.bookmark-div__added');
  if (target.innerHTML === state.notBookmarked) {
    target.innerHTML = state.bookmarked;
    // display popup message
    bookmarkDivAdded.classList.toggle('hidden');
    setTimeout(() => {
      bookmarkDivAdded.classList.toggle('hidden');
    }, 1000);
    addBookmark(target);
  } else {
    target.innerHTML = state.notBookmarked;
    // display popup message
    bookmarkDivRemoved.classList.toggle('hidden');
    setTimeout(() => {
      bookmarkDivRemoved.classList.toggle('hidden');
    }, 1000);
    removeBookmark(target);
  }
};

// check if exercise was bookmarked or not and display proper icon on load
export const checkBookmark = function (id) {
  const lsArr = getLS();
  const searchID = lsArr.find((value) => value.id === id);
  const bookmarkIcon = searchID ? state.bookmarked : state.notBookmarked;
  return bookmarkIcon;
};

// add bookmark
export const addBookmark = function (target) {
  const exerciseItem = target.closest('.exercise-item');

  const exerciseID = exerciseItem.dataset.id;
  const exerciseName = exerciseItem.querySelector('.exercise-item-info-name').textContent;
  const exerciseTarget = exerciseItem.querySelector('.exercise-item-info-target').textContent;
  const exerciseGif = exerciseItem.querySelector('.exercise-item-info-gif').src;

  const lsArr = getLS();

  const lsObj = {
    id: exerciseID,
    name: exerciseName,
    target: exerciseTarget,
    gif: exerciseGif,
  };

  lsArr.push(lsObj);
  localStorage.setItem('exercise', JSON.stringify(lsArr));

  lengthBookmark();
};

// remove bookmark
export const removeBookmark = function (target) {
  const id = target.closest('.exercise-item').dataset.id;
  const lsArr = getLS();
  const updatedLS = lsArr.filter((value) => value.id !== id);

  localStorage.setItem('exercise', JSON.stringify(updatedLS));

  lengthBookmark();
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
