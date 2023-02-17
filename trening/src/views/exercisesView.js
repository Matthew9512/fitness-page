import { checkBookmark, pagination, state } from '../model.js';

export const renderExercises = function (paginationBtns) {
  const exerciseArticle = document.querySelector('.exercise-article');
  exerciseArticle.innerHTML = '';

  for (const exercise of state.slicedExercises) {
    // display proper bookmark icon
    const isBookmarked = checkBookmark(exercise.id);

    const html = `
      <div class="bkm exercise-item" data-id="${exercise.id}" data-name="${exercise.name}">
        <div class="exercise-item-info">
          <p class="exercise-item-info-name">${exercise.name}</p>
          <p class="exercise-item-info-target">${exercise.target}</p>
          <button class="bookmark btn-bookmark">${isBookmarked}</button>
        </div>
          <img src="${exercise.gifUrl}" alt="exercise gif" loading="lazy" class="exercise-item-info-gif">
      </div>`;
    exerciseArticle.insertAdjacentHTML('afterbegin', html);
  }

  exerciseArticle.insertAdjacentHTML('beforeend', paginationBtns);

  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  btnPrev.addEventListener('click', () => {
    state.page = state.page - 1;

    pagination();
  });
  btnNext.addEventListener('click', () => {
    state.page = state.page + 1;

    pagination();
  });
};
