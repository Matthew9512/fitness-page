// render exercise and videos related to specific exercise
export const renderExercise = (exerciseByIDData, slicedVideoData) => {
  const exerciseModal = document.querySelector('.exercise-modal');

  exerciseModal.innerHTML = '';
  exerciseModal.classList.toggle('hidden');

  const html = `
  <button class="btn-close-modal"><i class="fa-solid fa-xmark"></i></button>
      <article class="exercise-details-article">
        <div class="exercise-details-article__details">
          <div class="exercise-details-article__info">
            <p class="exercise-details-article__body-part">Body part: ${exerciseByIDData.bodyPart}</p>
            <p class="exercise-details-article__exercise-name">Exercise name: ${exerciseByIDData.name}</p>
            <p class="exercise-details-article__exercise-target">Muscle group target: 
            ${exerciseByIDData.bodyPart} ${exerciseByIDData.target}</p>
            <p class="exercise-details-article__exercise-equipment">Equipment: ${exerciseByIDData.equipment}</p>
            <p class="exercise-details-article__exercise-description">Exercise description: If your goal is to gain big ${
              exerciseByIDData.target
            } then ${exerciseByIDData.name} is an amazing exercise for you, you will see results very fast. All you need is just ${
    exerciseByIDData.equipment
  }!!! pull until you have enought energy kahsda auhdjasd jksdfjnac uskd Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, tenetur!</p>  
          </div>
            <img src="${exerciseByIDData.gifUrl}" alt="gif" class="exercise-details-article__img" />
          </div>
          <p class="exercise-details-article__text">Watch <span class="exercise-name-span">
          ${exerciseByIDData.name}</span> exercise videos:</p>
          <div class="exercise-details-article__videos-wrapper">
            <div class="video-info-wrapper">
              <a href="https://www.youtube.com/watch?v=${slicedVideoData.at(0).videoId}" target="_blank " rel="noreferrer">
              <img src="${slicedVideoData.at(0).thumbnails.at(0).url}" alt="exercise video link" class="exercise-details-article__video">
              </a>
              <p class="video-title">${slicedVideoData.at(0).title}</p>
              <p class="video-channel-name">${slicedVideoData.at(0).channelName}</p>
            </div>
            <div class="video-info-wrapper">
              <a href="https://www.youtube.com/watch?v=${slicedVideoData.at(1).videoId}" target="_blank " rel="noreferrer">
              <img src="${slicedVideoData.at(1).thumbnails.at(0).url}" alt="exercise video link" class="exercise-details-article__video">
              </a>
              <p class="video-title">${slicedVideoData.at(1).title}</p>
              <p class="video-channel-name">${slicedVideoData.at(1).channelName}</p>
            </div>
            <div class="video-info-wrapper">
              <a href="https://www.youtube.com/watch?v=${slicedVideoData.at(2).videoId}" target="_blank " rel="noreferrer">
              <img src="${slicedVideoData.at(2).thumbnails.at(0).url}" alt="exercise video link" class="exercise-details-article__video">
              </a>
              <p class="video-title">${slicedVideoData.at(2).title}</p>
              <p class="video-channel-name">${slicedVideoData.at(2).channelName}</p>
            </div>
          </div>
      </article>`;

  exerciseModal.insertAdjacentHTML('afterbegin', html);

  const btnCloseModal = document.querySelector('.btn-close-modal');
  btnCloseModal.addEventListener('click', () => {
    exerciseModal.classList.toggle('hidden');
  });
};
