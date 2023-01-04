import { getExercisesByBodyPart } from '../model.js';

// render body parts icons with data filled with body parts name
export const renderBodyParts = (bodyPartsData) => {
  const asideBodyModel = document.querySelector('.aside-body-model');

  const html = `
    <div class="tooltip" id="div-back" data-name="${bodyPartsData.at(0)}">
      <i class="fa-regular fa-circle-xmark" id="back-icon"></i>
    </div>
    <div class="tooltip" id="div-cardio" data-name="${bodyPartsData.at(1)}">
      <i class="fa-regular fa-circle-xmark" id="cardio-icon" ></i>
    </div>
    <div class="tooltip" id="div-chest" data-name="${bodyPartsData.at(2)}">
      <i class="fa-regular fa-circle-xmark" id="chest-icon" ></i>
    </div>
    <div class="tooltip" id="div-lower-arms" data-name="${bodyPartsData.at(3)}">
      <i class="fa-regular fa-circle-xmark" id="lower-arms-icon" ></i>
    </div>
    <div class="tooltip" id="div-upper-arms-biceps" data-name="${bodyPartsData.at(7)}">
      <i class="fa-regular fa-circle-xmark" id="upper-arms-biceps-icon" ></i>
    </div>
    <div class="tooltip" id="div-upper-arms-triceps" data-name="${bodyPartsData.at(7)}">
      <i class="fa-regular fa-circle-xmark" id="upper-arms-triceps-icon" ></i>
    </div>
    <div class="tooltip" id="div-lower-legs" data-name="${bodyPartsData.at(4)}">
      <i class="fa-regular fa-circle-xmark" id="lower-legs-icon" ></i>
    </div>
    <div class="tooltip" id="div-upper-legs-back" data-name="${bodyPartsData.at(8)}">
      <i class="fa-regular fa-circle-xmark" id="upper-legs-icon" ></i>
    </div>
    <div class="tooltip" id="div-upper-legs-front" data-name="${bodyPartsData.at(8)}">
      <i class="fa-regular fa-circle-xmark" id="upper-legs-icon" ></i>
    </div>
    <div class="tooltip" id="div-neck" data-name="${bodyPartsData.at(5)}">
      <i class="fa-regular fa-circle-xmark" id="neck-icon" ></i>
    </div>
    <div class="tooltip" id="div-shoulders" data-name="${bodyPartsData.at(6)}">
      <i class="fa-regular fa-circle-xmark" id="shoulders-icon" ></i>
    </div>
    <div class="tooltip" id="div-waist" data-name="${bodyPartsData.at(9)}">
      <i class="fa-regular fa-circle-xmark" id="waist-icon" ></i>
    </div>`;

  asideBodyModel.insertAdjacentHTML('afterbegin', html);

  const icons = document.querySelectorAll('.tooltip');

  //   take id from clicked icon
  icons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const bodyPartName = e.currentTarget.dataset.name;
      getExercisesByBodyPart(bodyPartName);
    });
  });
};
