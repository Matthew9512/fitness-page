import { chartJS } from '../chartJS.js';
import { removeProduct } from '../controller.js';
import { nutritionSumOfAllMeals, mealNutritionObj, specificMealNutritionDetiles } from '../nutritionData.js';

let id = 1;
export const renderProductNutrition = (productName, impAmmountValue, nutritionData, showNewProduct) => {
  // make new id of for chart.js
  id++;

  const kcal = Math.ceil(nutritionData.totalNutrients.ENERC_KCAL.quantity);
  const proteins = Math.ceil(nutritionData.totalNutrients.PROCNT.quantity);
  const carbs = Math.ceil(nutritionData.totalNutrients.CHOCDF.quantity);
  const fat = Math.ceil(nutritionData.totalNutrients.FAT.quantity);

  // push product nutrition data to obj
  mealNutritionObj.kcal.push(kcal);
  mealNutritionObj.proteins.push(proteins);
  mealNutritionObj.carbs.push(carbs);
  mealNutritionObj.fat.push(fat);
  {
    /* <span>Kcal: </span> */
    // <p class="product-nutrition-protein"><span>Proteins: </span>${proteins}<span>g</span></p>
    // <p class="product-nutrition-carbs"><span>carbs: </span>${carbs}<span>g</span></p>
    // <p class="product-nutrition-fat"><span>fat: </span>${fat}<span>g</span></p>
  }
  {
    // <p class="product-nutrition-kcal">${kcal}</p>
    // <p class="product-nutrition-protein">${proteins}</p>
    // <p class="product-nutrition-carbs">${carbs}</p>
    // <p class="product-nutrition-fat">${fat}</p>
  }
  const html = `
    <div class="new-product">
      <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
        <div class="product-wrapper">
          <div class="product-nutrition-info">
            <p class="product-title"><i class="fa-solid fa-utensils"></i>${productName}</p>
            <p class="product-weight">${impAmmountValue}</p>
              <div class="product-nutrition-details">
                <p>Kcal: <span class="product-nutrition-kcal">${kcal}</span> kcal</p>
                <p>Proteins: <span class="product-nutrition-protein">${proteins}</span>g</p>
                <p>carbs: <span class="product-nutrition-carbs">${carbs}</span>g</p>
                <p>fat: <span class="product-nutrition-fat">${fat}</span>g</p>
              </div>
          </div>
        <div class="chart-js-nutrition-wrapper">
          <span class="kcal-chart-js">${kcal}</span>
          <canvas id="${id}"></canvas>
        </div>
      </div>
    </div>`;

  showNewProduct.insertAdjacentHTML('beforeend', html);

  const btnDelete = document.querySelectorAll('.btn-delete');

  // remove clicked product function
  removeProduct(btnDelete, mealNutritionObj);

  // specific meal nutrition detiles function
  specificMealNutritionDetiles(showNewProduct, mealNutritionObj);

  // move to specificMealNutritionDetiles?
  // calc sum of all meals => chart
  nutritionSumOfAllMeals(mealNutritionObj);
  // move to specificMealNutritionDetiles?

  // chart.js Doughnut visualization of product nutrition
  chartJS(proteins, carbs, fat, id);
};
