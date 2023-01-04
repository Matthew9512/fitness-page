// chart.js Doughnut visualization of product nutrition ammount
export const chartJS = (proteins, carbs, fat, id) => {
  const data = {
    options: {
      elements: {
        borderWidth: 0.9,
      },
    },
    datasets: [
      {
        data: [`${proteins}`, `${carbs}`, `${fat}`],
        // backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        backgroundColor: ['rgb(2, 152, 19)', 'rgb(255, 0, 0)', 'rgb(250, 165, 6)'],
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
  // include 'setup' then 'config' above
  const myChart = new Chart(document.getElementById(id), config);
};

// === doughnut chart === //
const ctx = document.getElementById('myChart');
// /global font size options
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 400;
Chart.defaults.font.family = 'Rubik';
let chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    // labels: ['Proteins:', 'Carbs:', 'Fat:'],
    datasets: [
      {
        // label: 'asd',
        data: [],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(2, 152, 19)', 'rgb(255, 0, 0)', 'rgb(250, 165, 6)'],
        hoverOffset: 5,
        // weight of doughnut bar
        cutout: '85%',
        spacing: 10,
      },
    ],
  },
  options: {
    elements: {
      borderWidth: 0.9,
    },
  },
});
// doughnut chart

// update nutrition sum of all meals
export const updateChartJS = (totalNutritionArr, sumTotalKcal) => {
  const totalSum = document.querySelector('.total-sum');
  const kcalSum = document.querySelector('.kcal-sum');

  // display chart.js
  totalSum.classList.remove('hidden');

  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.data.datasets.forEach((dataset) => {
    dataset.data = totalNutritionArr;
  });
  kcalSum.innerHTML = `${sumTotalKcal} kcal`;
  chart.update();

  // hide chart.js if theres no values to show
  if (kcalSum.innerHTML === '0 kcal') totalSum.classList.add('hidden');
};

// === bar chart === //
// update
// const ctx = document.getElementById('myChart');

// /global font size options
// Chart.defaults.font.size = 16;
// Chart.defaults.font.weight = 400;
// Chart.defaults.font.family = 'Rubik';
// let chart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Kcal:', 'Proteins:', 'Carbs:', 'Fat:'],
//     datasets: [
//       {
//         label: 'All meals nutrition sum',
//         data: [],
//         barPercentage: 1,
//         categoryPercentage: 1,
//         // borderColor: 'hsl(10, 79%, 65%)',
//         // hoverBackgroundColor: 'hsl(186, 34%, 60%)',
//         backgroundColor: ['rgb(54, 162, 235)', 'rgb(2, 152, 19)', 'rgb(255, 0, 0)', 'rgb(250, 165, 6)'],
//         // borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     plugins: {
//       legend: {
//         labels: {
//           boxWidth: 0,
//         },
//       },
//     },
//     // making chart take size of parent
//     responsive: true,
//     indexAxis: 'y',
//     layout: {
//       padding: 5,
//     },
//     scales: {
//       //   x: {
//       //     // usuniecie linii siatki x w 'scales'
//       //     grid: {
//       //       display: false,
//       //       drawBorder: false,
//       //       drawOnChartArea: false,
//       //     },
//       //   },

//       y: {
//         // usuniecie linii siatki y w 'scales'
//         grid: {
//           display: false,
//           drawBorder: false,
//           drawOnChartArea: false,
//         },
//         // usuniecie skali
//         // ticks: {
//         //   display: false,
//         // },
//       },
//     },
//   },
// });
// === bar chart === //
