import { getProductNutrition } from '../model.js';

export const renderProductList = (productData, showNewProduct) => {
  const displayProductList = document.querySelector('.display-product-list');
  displayProductList.innerHTML = '';
  for (const product of productData) {
    const html = `
      <div class="search-details">
        <div class="search-wrapper">
          <p class="product-title">${product.food.label}</p>
          <input type="text" class="inp-ammount" class="inp" placeholder="e.g.100g" />
        </div>
        <button class="btn btn-add"><i class="fa-solid fa-plus"></i></button>
      </div>`;
    displayProductList.insertAdjacentHTML('afterbegin', html);

    const btnAddProduct = document.querySelector('.btn-add');
    const inpAmmount = document.querySelector('.inp-ammount');

    // take product name and input ammount
    btnAddProduct.addEventListener('click', (e) => {
      const parnetElement = e.currentTarget.closest('.search-details');
      const productName = parnetElement.querySelector('.product-title').textContent;
      const impAmmountValue = inpAmmount.value;
      if (!impAmmountValue) return;
      getProductNutrition(productName, impAmmountValue, showNewProduct);
    });
  }
};
