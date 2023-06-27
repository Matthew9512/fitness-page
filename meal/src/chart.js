import { state } from './model.js';

//
export const renderChart = function (id) {
  const data = {
    options: {
      elements: {
        borderWidth: 0.9,
      },
    },
    datasets: [
      {
        data: [
          `${Math.ceil(state.productData.CHOCDF.quantity)}`,
          `${Math.ceil(state.productData.FAT.quantity)}`,
          `${Math.ceil(state.productData.PROCNT.quantity)}`,
        ],
        backgroundColor: ['rgb(2, 152, 19)', 'rgb(255, 0, 0)', 'rgb(250, 165, 6)', 'rgb(47, 0, 0)'],
        hoverOffset: 5,
        // weight of doughnut bar
        cutout: '85%',
        // spacing: 10,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
  };
  const myChart = new Chart(document.getElementById(id), config);
};

// =============================================
const myChart = document.getElementById('myChart');

let chart = new Chart(myChart, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [],
        backgroundColor: ['rgb(2, 152, 19)', 'rgb(255, 0, 0)', 'rgb(250, 165, 6)', 'rgb(47, 0, 0)'],
        hoverOffset: 5,
        // weight of doughnut bar
        cutout: '85%',
        // spacing: 10,
      },
    ],
  },
  options: {
    elements: {
      borderWidth: 0.9,
    },
  },
});

//
export const updateTotalChart = function () {
  const mealGridSum = document.querySelector('.meal__grid-sum');
  const mealGridSumKcal = document.querySelector('.meal__grid-sum-kcal');
  mealGridSumKcal.innerHTML = '';
  mealGridSum.classList.remove('hidden');

  chart.data.datasets.forEach((dataset) => {
    dataset.data = [`${Math.ceil(state.totalSum.carbs)}`, `${Math.ceil(state.totalSum.fat)}`, `${Math.ceil(state.totalSum.proteins)}`];
  });
  mealGridSumKcal.innerHTML = `${Math.ceil(state.totalSum.kcal)}kcal`;

  chart.update();
};
