export const renderExercise = function (exerciseData, videos) {
  const exerciseModal = document.querySelector('.exercise-modal');
  exerciseModal.innerHTML = '';
  exerciseModal.classList.toggle('hidden');

  const html = `
    <button class="btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
        <article class="exercise-details-article">
          <div class="exercise-details-article__details">
            <div class="exercise-details-article__info">
              <p class="exercise-details-article__body-part">Body part: ${exerciseData.bodyPart}</p>
              <p class="exercise-details-article__exercise-name">Exercise name: ${exerciseData.name}</p>
              <p class="exercise-details-article__exercise-target">Muscle group target: 
              ${exerciseData.bodyPart} ${exerciseData.target}</p>
              <p class="exercise-details-article__exercise-equipment">Equipment: ${exerciseData.equipment}</p>
              <p class="exercise-details-article__exercise-description">Exercise description: If your goal is to gain big ${exerciseData.target} then ${exerciseData.name} is an amazing exercise for you, you will see results very fast. All you need is just ${exerciseData.equipment}!!! pull until you have enought energy kahsda auhdjasd jksdfjnac uskd Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, tenetur!</p>  
            </div>
              <img src="${exerciseData.gifUrl}" alt="gif" class="exercise-details-article__img" />
            </div>
            <p class="exercise-details-article__text">Watch <span class="exercise-name-span">
            ${exerciseData.name}</span> exercise videos:</p>
            <div class="exercise-details-article__videos-wrapper">${videos}</div>
        </article>`;
  exerciseModal.insertAdjacentHTML('afterbegin', html);

  const btnCloseModal = document.querySelector('.btn-close-modal');
  btnCloseModal.addEventListener('click', () => {
    exerciseModal.classList.toggle('hidden');
  });
};
