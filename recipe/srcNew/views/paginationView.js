import { state } from '../model.js';

export const renderPagination = (numOfPages) => {
  // im on page 1 and there are other pages
  if (state.page === 1 && numOfPages > 1) {
    return `
      <div class="btns">
        <button class="button btn-prev hide"><i class="fa-solid fa-arrow-left"></i> prev</button>
        <button class="button btn-next">Page ${state.page + 1} <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
  // im on page other than first and last
  else if (state.page < numOfPages) {
    return `
      <div class="btns">
        <button class="button btn-prev"><i class="fa-solid fa-arrow-left"></i> Page ${state.page - 1}</button>
        <button class="button btn-next">Page ${state.page + 1} <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
  // im on last page
  else if (state.page === numOfPages && numOfPages > 1) {
    return `
      <div class="btns">
        <button class="button btn-prev"><i class="fa-solid fa-arrow-left"></i> Page ${state.page - 1}</button>
        <button class="button btn-next hide">next <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
  // only one page
  else {
    return `
      <div class="btns hide">
        <button class="button btn-prev"> <i class="fa-solid fa-arrow-left"></i></button>
        <button class="button btn-next"> <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;
  }
};
