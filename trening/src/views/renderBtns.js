export const renderPagination = (numOfPages, page) => {
  // im on page 1 and there are other pages
  if (page === 1 && numOfPages > 1) {
    return `
    <div class="btns">
      <button class="btn btn-prev hide"><i class="fa-solid fa-arrow-left"></i> prev</button>
      <button class="btn btn-next">Page ${page + 1} <i class="fa-solid fa-arrow-right"></i></button>
    </div>`;
  }
  // im on page other than first and last
  else if (page < numOfPages) {
    return `
    <div class="btns">
      <button class="btn btn-prev"><i class="fa-solid fa-arrow-left"></i> Page ${page - 1}</button>
      <button class="btn btn-next">Page ${page + 1} <i class="fa-solid fa-arrow-right"></i></button>
    </div>`;
  }
  // im on last page
  else if (page === numOfPages && numOfPages > 1) {
    return `
    <div class="btns">
      <button class="btn btn-prev"><i class="fa-solid fa-arrow-left"></i> Page ${page - 1}</button>
      <button class="btn btn-next hide">next <i class="fa-solid fa-arrow-right"></i></button>
    </div>`;
  }
  // only one page
  else {
    return `
    <div class="btns hide">
      <button class="btn btn-prev"> <i class="fa-solid fa-arrow-left"></i></button>
      <button class="btn btn-next"> <i class="fa-solid fa-arrow-right"></i></button>
    </div>`;
  }
};
