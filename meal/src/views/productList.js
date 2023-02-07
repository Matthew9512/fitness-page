import { state } from '../model.js';

export const renderProductList = function () {
  const productSearch = document.querySelector('.product__search');
  const productSearchList = document.querySelector('.product__search-list');

  productSearch.classList.toggle('hidden');
  productSearchList.innerHTML = '';

  for (const product of state.productData) {
    const html = `
    <div class="item__wrapper">
        <div class="item__details">
          <p class="product__title">${product.food.label}</p>
          <div class="group">
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path
                  d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                </path>
            </g>
            </svg>
            <input placeholder="product weight in g" type="number" class="input input-search" />
            </div>
            </div>
            <button class="button add btn-add"><i class="add fa-solid fa-plus"></i></button>
      </div>`;
    productSearchList.insertAdjacentHTML('afterbegin', html);
  }
};
