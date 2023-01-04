import { getExerciseById, pagination, stateObj, addBookmark, checkBookmark, removeBookmark, takeID } from '../model.js';

// render list of exercises fetch by body part name
export const renderExercisesByBodyPart = (temporaryCutExercisesData, paginationBtns) => {
  const exerciseArticle = document.querySelector('.exercise-article');
  const bookmarkDivAdded = document.querySelector('.bookmark-div__added');
  const bookmarkDivRemoved = document.querySelector('.bookmark-div__removed');

  exerciseArticle.innerHTML = '';

  for (const exercise of temporaryCutExercisesData) {
    const id = exercise.id;
    const bookmarkIcon = checkBookmark(id);
    const html = `
      <div class="exercise-item" data-id="${exercise.id}" data-name="${exercise.name}">
        <div class="exercise-item-info">
          <p class="exercise-item-info-name">${exercise.name}</p>
          <p class="exercise-item-info-target">${exercise.target}</p>
          <button class="bkm btn-bookmark">${bookmarkIcon}</button>
        </div>
        <img src="${exercise.gifUrl}" alt="exercise gif" class="exercise-item-info-gif">
      </div>`;
    exerciseArticle.insertAdjacentHTML('afterbegin', html);
  }

  // render pagination btns
  exerciseArticle.insertAdjacentHTML('beforeend', paginationBtns);

  // exercise to take id from
  // const exerciseItem = document.querySelectorAll('.exercise-item');

  // pagination btns
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  // bookmark btn
  const btnBookmark = document.querySelectorAll('.btn-bookmark');

  // eventDelegation
  exerciseArticle.addEventListener('click', takeID);
  // exerciseArticle.addEventListener('click', (e) => {
  //   e.stopImmediatePropagation();

  //   // prevent loading exercise if user clicks on bookmark btn
  //   if (e.target.classList.contains('bkm')) return;
  //   if (e.target.classList.contains('btn')) return;
  //   else {
  //     const exerciseID = e.target.closest('.exercise-item').dataset.id;
  //     const exerciseName = e.target.closest('.exercise-item').dataset.name;
  //     console.log(exerciseID);
  //     getExerciseById(exerciseID, exerciseName);
  //   }
  // });
  // eventDelegation

  // exerciseItem.forEach((item) => {
  //   item.addEventListener('click', (e) => {
  //     const click = e.target;
  //     const exerciseID = e.currentTarget.dataset.id;
  //     const exerciseName = e.currentTarget.dataset.name;

  //     // prevent loading exercise if user clicks on bookmark btn
  //     if (click.classList.contains('btn-bookmark') || click.classList.contains('fa-bookmark')) return;
  //     else {
  //       getExerciseById(exerciseID, exerciseName);
  //     }
  //   });
  // });

  btnPrev.addEventListener('click', () => {
    stateObj.page--;
    let currentPage = stateObj.page;
    pagination(currentPage);
  });

  btnNext.addEventListener('click', () => {
    stateObj.page++;
    let currentPage = stateObj.page;
    pagination(currentPage);
  });

  btnBookmark.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget;
      // work or not?
      // target.innerHTML === stateObj.notBookmarked ? addBookmark(target) : removeBookmark(target);
      if (target.innerHTML === stateObj.notBookmarked) {
        bookmarkDivAdded.classList.toggle('hidden');
        setTimeout(() => {
          bookmarkDivAdded.classList.toggle('hidden');
        }, 1000);
        addBookmark(target);
      } else {
        bookmarkDivRemoved.classList.toggle('hidden');
        setTimeout(() => {
          bookmarkDivRemoved.classList.toggle('hidden');
        }, 1000);
        removeBookmark(target);
      }
    });
  });
};
