import { state } from '../model.js';
import { renderChart } from '../chart.js';
import { destructureMealSum } from '../nutritionData.js';

let id = 0;

export const renderProductNutrition = function () {
  const productSearch = document.querySelector('.product__search');
  const productSum = document.querySelector('.product__sum ');

  id++;
  productSearch.classList.toggle('hidden');
  productSum.classList.toggle('hidden');

  const html = `
  <div class="product">
  <button class="button delete btn-delete"><i class="delete fa-solid fa-trash"></i></button>
    <div class="product__wrapper">
      <div class="product__nutrition-info">
        <p class="product__title"><i class="fa-solid fa-utensils"></i>${state.productName}</p>
        <p class="product__weight">${state.productData.totalWeight}g</p>
            <ol class="nutrition__details"> 
              <li class="nutrition__details-kcal"><span>Kcal: </span>${Math.ceil(state.productData.ENERC_KCAL.quantity)}
              <span>${state.productData.ENERC_KCAL.unit}</span></li>
              <li class="nutrition__details-carbs"><span>Carbs: </span>${Math.ceil(state.productData.CHOCDF.quantity)}
              <span>${state.productData.CHOCDF.unit}</span></li>
              <li class="nutrition__details-fat"><span>Fat: </span>${Math.ceil(state.productData.FAT.quantity)}
              <span>${state.productData.FAT.unit}</span></li>
              <li class="nutrition__details-proteins"><span>Proteins: </span>${Math.ceil(state.productData.PROCNT.quantity)}
              <span>${state.productData.PROCNT.unit}</span></li>
            </ol>
      </div>
      <div class="product__chart">
      <span class="product__chart-kcal">${Math.ceil(state.productData.ENERC_KCAL.quantity)}kcal</span>
      <canvas id="${id}"></canvas>
    </div>
  </div>
</div>`;
  state.productParent.insertAdjacentHTML('beforeend', html);

  renderChart(id);
  destructureMealSum();
};
