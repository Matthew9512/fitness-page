import { scrollTop } from '../controller.js';
import { displayNextResultsPage, displayPrevResultsPage } from '../model.js';
import { takeID } from '../model.js';

export const renderBtns = (parentElement, data) => {
  // keep track of numbers of items currently fetch
  const from = data.from;
  const to = data.to;

  const _numberOfResults = 20;
  const currentPage = to / _numberOfResults;
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  const btnsHtml =
    prevPage === 0
      ? `
  <div class="btns">
  <button class="btn btn-prev hide">${prevPage} page</button>
  <button class="btn btn-next">${nextPage} page</button>
  </div>`
      : `
  <div class="btns">
  <button class="btn btn-prev">${prevPage} page</button>
  <button class="btn btn-next">${nextPage} page</button>
  </div>`;
  parentElement.insertAdjacentHTML('beforeend', btnsHtml);

  // link to next results list page IN NEW VERSION OF API
  // const nextPage = data._links.next.href;

  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  btnPrev.addEventListener('click', () => {
    displayPrevResultsPage(from, to);
    parentElement.removeEventListener('click', takeID);
    scrollTop();
  });

  btnNext.addEventListener('click', () => {
    displayNextResultsPage(from, to);
    parentElement.removeEventListener('click', takeID);
    scrollTop();
    // new version of api
    // displayNextResultsPage(nextPage);
  });
};
