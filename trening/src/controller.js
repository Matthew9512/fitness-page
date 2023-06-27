import * as model from './model.js';
const asideBodyModel = document.querySelector('.aside-body-model');
const exerciseArticle = document.querySelector('.exercise-article');
const bookmarkDrop = document.querySelector('.bookmark-drop');

// fetch body parts name
if (navigator.onLine) model.getBodyParts();

// scroll into exerciseArticle
export const scroll = function () {
   const exerciseArticle = document.querySelector('.exercise-article');
   exerciseArticle.scrollIntoView();
};

asideBodyModel.addEventListener('click', model.getExercises);
exerciseArticle.addEventListener('click', (e) => {
   const click = e.target;
   if (!click.closest('.exercise-item')) return;
   else if (click.classList.contains('bookmark')) model.bookmark(click);
   else model.getExerciseByID(click);
});

// fetch display bookmark item after click
bookmarkDrop.addEventListener('click', (e) => {
   const click = e.target;
   model.getExerciseByID(click);
});
