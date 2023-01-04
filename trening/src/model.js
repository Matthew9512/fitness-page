import * as config from './config.js';
import { renderBodyParts } from './views/renderBodyParts.js';
import { renderExercisesByBodyPart } from './views/renderExercisesByBodyPart.js';
import { renderExercise } from './views/renderExercise.js';
import { renderError } from './views/renderError.js';
import { renderPagination } from './views/renderBtns.js';
import { renderBookmark } from './views/renderBookmark.js';
import { renderSpinner } from './views/renderSpinner.js';
import { scroll } from './controller.js';

const exerciseArticle = document.querySelector('.exercise-article');
const exerciseModal = document.querySelector('.exercise-modal');
const bookmarkNumber = document.querySelector('.bookmark-number');

// array of all exercises data
export const stateObj = {
  listOfExercises: [],
  slicedExercisesList: [],
  page: 1,
  resPerPage: config._resPerPage,
  bookmarked: '<i class="bkm fa-solid fa-bookmark"></i>',
  notBookmarked: '<i class="bkm fa-regular fa-bookmark"></i>',
};

// FETCH DATA FUNCTIONS
// fetch list of body parts
export const getBodyPartList = async () => {
  try {
    const respond = await fetch(`${config._exerciseUrl}/bodyPartList`, config._exercisesOptions);
    const bodyPartsData = await respond.json();
    renderBodyParts(bodyPartsData);
  } catch (error) {
    console.error(error);
    renderError(error, exerciseArticle);
  }
};

// fetch exercises by body part name
export const getExercisesByBodyPart = async (bodyPartName) => {
  stateObj.listOfExercises = [];
  try {
    const respond = await fetch(`${config._exerciseUrl}/bodyPart/${bodyPartName}`, config._exercisesOptions);
    const bodyPartExercisesData = await respond.json();

    // array of all exercises
    stateObj.listOfExercises.push(bodyPartExercisesData);
    pagination((stateObj.page = 1));
    scroll();
  } catch (error) {
    console.error(error);
    renderError(error, exerciseArticle);
  }
};

export const getExerciseById = async (exerciseID, exerciseName) => {
  renderSpinner(exerciseModal);
  // fetch exercise
  try {
    const exerciseRespond = await fetch(`${config._exerciseUrl}/exercise/${exerciseID}`, config._exercisesOptions);
    const exerciseByIDData = await exerciseRespond.json();

    // fetch videos
    const videoRespond = await fetch(`${config._videoUrl}/search?query=${exerciseName}`, config._videoOptions);
    const videoData = await videoRespond.json();

    destructuringExerciseData(exerciseByIDData, videoData, exerciseID);
  } catch (error) {
    renderError(error, exerciseModal);
  }
};

// take dataset.id from recipe item / return if click on pagination btn
export const takeID = (e) => {
  // e.stopImmediatePropagation();

  // prevent loading exercise if user clicks on bookmark btn
  if (e.target.classList.contains('bkm')) return;
  // prevent loading exercise if user clicks on pagination btn
  if (e.target.classList.contains('btn')) return;
  else {
    const exerciseID = e.target.closest('.exercise-item').dataset.id;
    const exerciseName = e.target.closest('.exercise-item').dataset.name;
    console.log(exerciseID);
    getExerciseById(exerciseID, exerciseName);
  }
};

// PAGINATION
export const pagination = (page) => {
  const prev = (stateObj.page - 1) * stateObj.resPerPage;
  const next = stateObj.page * stateObj.resPerPage;
  const numOfPages = Math.ceil(stateObj.listOfExercises.at(0).length / stateObj.resPerPage);

  const cutData = stateObj.listOfExercises.flat().slice(prev, next);

  const paginationBtns = renderPagination(numOfPages, page);

  exerciseArticle.removeEventListener('click', takeID);
  destructuringExercisesListData(cutData, paginationBtns);
  scroll();
};

// get localStorage array
export const getLS = () => {
  const lsArr = localStorage.getItem('exercise') ? JSON.parse(localStorage.getItem('exercise')) : [];
  return lsArr;
};

// check localStorage => if id is in localStorage or no and display correct icon
export const checkBookmark = (id) => {
  const lsArr = getLS();
  const searchID = lsArr.find((value) => value.id === id);
  const bookmarkIcon = searchID ? stateObj.bookmarked : stateObj.notBookmarked;
  return bookmarkIcon;
};

// update localStorage
export const updateLS = () => {
  const lsArr = getLS();

  bookmarkNumber.textContent = lsArr.length;
  renderBookmark(lsArr);
};

// BOOKMARK
// addBookmark
export const addBookmark = (target) => {
  const exerciseItem = target.closest('.exercise-item');

  const exerciseID = exerciseItem.dataset.id;
  const exerciseName = exerciseItem.querySelector('.exercise-item-info-name').textContent;
  const exerciseTarget = exerciseItem.querySelector('.exercise-item-info-target').textContent;
  const exerciseGif = exerciseItem.querySelector('.exercise-item-info-gif').src;

  const lsObj = {
    id: exerciseID,
    name: exerciseName,
    target: exerciseTarget,
    gif: exerciseGif,
  };

  target.innerHTML = stateObj.bookmarked;

  const lsArr = getLS();

  lsArr.push(lsObj);
  localStorage.setItem('exercise', JSON.stringify(lsArr));

  updateLS();
};

// removeBookmark
export const removeBookmark = (target) => {
  const exerciseItemID = target.closest('.exercise-item').dataset.id;

  target.innerHTML = stateObj.notBookmarked;

  const lsArr = getLS();
  const remove = lsArr.filter((value) => value.id !== exerciseItemID);

  localStorage.setItem('exercise', JSON.stringify(remove));

  updateLS();
};

// DESTRUCTURING DATA FUCNTIONS
// destructuring list of exercises data
export const destructuringExercisesListData = (cutData, paginationBtns) => {
  const temporaryCutExercisesData = cutData.map((data) => {
    const { gifUrl, id, name, target } = data;
    return { gifUrl, id, name, target };
  });

  renderExercisesByBodyPart(temporaryCutExercisesData, paginationBtns);
};

// destructuring exercise data
export const destructuringExerciseData = (exerciseByIDData, videoData, exerciseID) => {
  const slicedVideoData = videoData.contents.slice(0, 3).map((data) => {
    const { title, channelName, videoId, thumbnails } = data.video;
    return { title, channelName, videoId, thumbnails };
  });

  renderExercise(exerciseByIDData, slicedVideoData);
};
