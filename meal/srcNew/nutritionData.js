import { state } from './model.js';
import { updateTotalChart } from './chart.js';

//
export const totalSum = function () {
  // sum nutrition of all products
  const mealCarbs = state.mealSum.carbs.reduce((acc, value) => acc + value, 0);
  const mealKcal = state.mealSum.kcal.reduce((acc, value) => acc + value, 0);
  const mealFat = state.mealSum.fat.reduce((acc, value) => acc + value, 0);
  const mealProteins = state.mealSum.proteins.reduce((acc, value) => acc + value, 0);

  state.totalSum.carbs = mealCarbs;
  state.totalSum.kcal = mealKcal;
  state.totalSum.fat = mealFat;
  state.totalSum.proteins = mealProteins;

  updateTotalChart();
};

//
export const destructureMealSum = function () {
  // ===== REMOVE ARR? ===== //
  const arr = [state.productData];
  // ===== REMOVE ARR? ===== //
  let meal = arr.map((value) => {
    const { quantity: carbs } = value.CHOCDF;
    const { quantity: kcal } = value.ENERC_KCAL;
    const { quantity: fat } = value.FAT;
    const { quantity: proteins } = value.PROCNT;
    return { carbs, kcal, fat, proteins };
  });

  increaseMealSum(meal);
};

//
const increaseMealSum = function (meal) {
  const productSum = state.productParent.querySelector('.product__sum');

  let carbsValue = state.productParent.querySelector('.nutrition-carbs-total');
  let kcalValue = state.productParent.querySelector('.nutrition-kcal-total');
  let fatValue = state.productParent.querySelector('.nutrition-fat-total');
  let proteinsValue = state.productParent.querySelector('.nutrition-proteins-total');

  let carbs = +carbsValue.innerHTML;
  let kcal = +kcalValue.innerHTML;
  let fat = +fatValue.innerHTML;
  let proteins = +proteinsValue.innerHTML;

  productSum.classList.remove('hidden');

  // increase current meal sum
  carbsValue.innerHTML = Math.ceil(meal.at(0).carbs) + Math.ceil(carbs);
  kcalValue.innerHTML = Math.ceil(meal.at(0).kcal) + Math.ceil(kcal);
  fatValue.innerHTML = Math.ceil(meal.at(0).fat) + Math.ceil(fat);
  proteinsValue.innerHTML = Math.ceil(meal.at(0).proteins) + Math.ceil(proteins);

  // push each new product nutrition to arr
  state.mealSum.carbs.push(Math.ceil(meal.at(0).carbs));
  state.mealSum.kcal.push(Math.ceil(meal.at(0).kcal));
  state.mealSum.fat.push(Math.ceil(meal.at(0).fat));
  state.mealSum.proteins.push(Math.ceil(meal.at(0).proteins));

  totalSum();
};

//
export const decreaseMealSum = function (product) {
  // values of removed product
  const carbsValue = +product.querySelector('.nutrition__details-carbs').childNodes[1].textContent;
  const kcalValue = +product.querySelector('.nutrition__details-kcal').childNodes[1].textContent;
  const fatValue = +product.querySelector('.nutrition__details-fat').childNodes[1].textContent;
  const proteinsValue = +product.querySelector('.nutrition__details-proteins').childNodes[1].textContent;

  // parent of product
  const mealSum = product.previousElementSibling;

  // sum of current meal
  let mealCarbsValue = mealSum.querySelector('.nutrition-carbs-total');
  let mealKcalValue = mealSum.querySelector('.nutrition-kcal-total');
  let mealFatValue = mealSum.querySelector('.nutrition-fat-total');
  let mealProteinsValue = mealSum.querySelector('.nutrition-proteins-total');

  const carbs = +mealCarbsValue.innerHTML;
  const kcal = +mealKcalValue.innerHTML;
  const fat = +mealFatValue.innerHTML;
  const proteins = +mealProteinsValue.innerHTML;

  // decrease current meal sum
  mealCarbsValue.innerHTML = Math.ceil(carbs) - Math.ceil(carbsValue);
  mealKcalValue.innerHTML = Math.ceil(kcal) - Math.ceil(kcalValue);
  mealFatValue.innerHTML = Math.ceil(fat) - Math.ceil(fatValue);
  mealProteinsValue.innerHTML = Math.ceil(proteins) - Math.ceil(proteinsValue);

  // location in arr nutrition values of remove product => made like this to avoid removing few products with same values
  const carbsItem = state.mealSum.carbs.indexOf(Math.ceil(carbsValue));
  const kcalItem = state.mealSum.kcal.indexOf(Math.ceil(kcalValue));
  const fatItem = state.mealSum.fat.indexOf(Math.ceil(fatValue));
  const proteinsItem = state.mealSum.proteins.indexOf(Math.ceil(proteinsValue));

  // remove from global array data of removed product
  state.mealSum.carbs = state.mealSum.carbs.slice(carbsItem, 1);
  state.mealSum.kcal = state.mealSum.kcal.slice(kcalItem, 1);
  state.mealSum.fat = state.mealSum.fat.slice(fatItem, 1);
  state.mealSum.proteins = state.mealSum.proteins.slice(proteinsItem, 1);

  totalSum();
};
