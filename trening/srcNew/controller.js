import * as model from './model.js';
const asideBodyModel = document.querySelector('.aside-body-model');
const exerciseArticle = document.querySelector('.exercise-article');

// if (navigator.onLine) model.getBodyParts();

asideBodyModel.addEventListener('click', model.getExercises);
exerciseArticle.addEventListener('click', (e) => {
  const click = e.target;
  if (!click.closest('.exercise-item')) return;
  else if (click.classList.contains('bkm')) model.bookmark(click);
  else model.getExerciseByID(click);
});
