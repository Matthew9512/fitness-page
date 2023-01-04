import { updateChartJS } from './chartJS.js';

export const mealNutritionObj = {
  kcal: [],
  proteins: [],
  carbs: [],
  fat: [],
};

// totalNutritionArr
let totalNutritionArr = [];

// calc specific meal nutrition and render this info
export const specificMealNutritionDetiles = (showNewProduct, mealNutritionObj) => {
  const mealNutritionSum = showNewProduct.querySelector('.meal-sum');
  mealNutritionSum.classList.remove('hidden');

  const nutritionKcalTotal = mealNutritionSum.querySelector('.nutrition-kcal-total');
  const totalKcal = +nutritionKcalTotal.innerHTML;

  const nutritionProtiensTotal = mealNutritionSum.querySelector('.nutrition-proteins-total');
  const totalProteins = +nutritionProtiensTotal.innerHTML;

  const nutritionCarbsTotal = mealNutritionSum.querySelector('.nutrition-carbs-total');
  const totalCarbs = +nutritionCarbsTotal.innerHTML;

  const nutritionFatTotal = mealNutritionSum.querySelector('.nutrition-fat-total');
  const totalFat = +nutritionFatTotal.innerHTML;

  // sum nutrition in correct div
  const sumTotalKcal = mealNutritionObj.kcal.at(-1) + totalKcal;
  const sumTotalProteins = mealNutritionObj.proteins.at(-1) + totalProteins;
  const sumTotalCarbs = mealNutritionObj.carbs.at(-1) + totalCarbs;
  const sumTotalFat = mealNutritionObj.fat.at(-1) + totalFat;

  // display nutrition in correct div
  nutritionKcalTotal.innerHTML = `${sumTotalKcal}`;
  nutritionProtiensTotal.innerHTML = `${sumTotalProteins}`;
  nutritionCarbsTotal.innerHTML = `${sumTotalCarbs}`;
  nutritionFatTotal.innerHTML = `${sumTotalFat}`;
};

// deleteProduct
export const deleteProduct = (target, mealNutritionObj, parent) => {
  const kcal = +target.querySelector('.product-nutrition-kcal').textContent;
  const protein = +target.querySelector('.product-nutrition-protein').textContent;
  const carbs = +target.querySelector('.product-nutrition-carbs').textContent;
  const fat = +target.querySelector('.product-nutrition-fat').textContent;
  const newProduct = target.querySelector('.new-product');

  const removedKcal = mealNutritionObj.kcal.filter((value) => {
    return value !== kcal;
  });
  const removedProtein = mealNutritionObj.proteins.filter((value) => {
    return value !== protein;
  });
  const removedCarbs = mealNutritionObj.carbs.filter((value) => {
    return value !== carbs;
  });
  const removedFat = mealNutritionObj.fat.filter((value) => {
    return value !== fat;
  });

  mealNutritionObj.kcal = removedKcal;
  mealNutritionObj.proteins = removedProtein;
  mealNutritionObj.carbs = removedCarbs;
  mealNutritionObj.fat = removedFat;

  // hide element if theres no products unless its a first meal => id of 1
  if (!newProduct && parent.id != 1) parent.classList.add('hidden');

  updateMealSum(parent, kcal, protein, carbs, fat);
  nutritionSumOfAllMeals(mealNutritionObj);
};

//
export const updateMealSum = (parent, kcal, protein, carbs, fat) => {
  const nutritionKcalTotal = parent.querySelector('.nutrition-kcal-total');
  const totalKcal = +nutritionKcalTotal.innerHTML;

  const nutritionProtiensTotal = parent.querySelector('.nutrition-proteins-total');
  const totalProteins = +nutritionProtiensTotal.innerHTML;

  const nutritionCarbsTotal = parent.querySelector('.nutrition-carbs-total');
  const totalCarbs = +nutritionCarbsTotal.innerHTML;

  const nutritionFatTotal = parent.querySelector('.nutrition-fat-total');
  const totalFat = +nutritionFatTotal.innerHTML;

  // sum nutrition in correct div
  const sumTotalKcal = totalKcal - kcal;
  const sumTotalProteins = totalProteins - protein;
  const sumTotalCarbs = totalCarbs - carbs;
  const sumTotalFat = totalFat - fat;

  // display nutrition in correct div
  nutritionKcalTotal.innerHTML = `${sumTotalKcal}`;
  nutritionProtiensTotal.innerHTML = `${sumTotalProteins}`;
  nutritionCarbsTotal.innerHTML = `${sumTotalCarbs}`;
  nutritionFatTotal.innerHTML = `${sumTotalFat}`;
};

// calc sum of all meals
export const nutritionSumOfAllMeals = (mealNutritionObj) => {
  totalNutritionArr = [];

  // calc product nutrition
  for (let key in mealNutritionObj) {
    key = mealNutritionObj[key].reduce((acc, value) => {
      return acc + value;
    }, 0);
    // check how to retrieve data from loops
    totalNutritionArr.push(key);
  }
  const sumTotalKcal = totalNutritionArr.at(0);
  const sumTotalProteins = totalNutritionArr.at(1);
  const sumTotalCarbs = totalNutritionArr.at(2);
  const sumTotalFat = totalNutritionArr.at(3);
  const arr = [sumTotalProteins, sumTotalCarbs, sumTotalFat];

  updateChartJS(arr, sumTotalKcal);
};
