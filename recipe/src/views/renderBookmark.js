import { checkLS, getRecipe } from '../model.js';

export const renderBookmark = (getLSArr) => {
  checkLS();

  const bookmarkDrop = document.querySelector('.bookmark-drop');
  bookmarkDrop.innerHTML = '';
  for (const lsKey of getLSArr) {
    const html = `
      <div class="bookmark-item" data-id="${lsKey.id}">
      <img src="${lsKey.image}" alt="meal recipe img" class="bookmark-img" />
    <div class="bookmark-info">
      <p class="recipe-title">${lsKey.title}</p>
      <p class="recipe-source">${lsKey.source}</p>
      </div
      </div>`;
    bookmarkDrop.insertAdjacentHTML('afterbegin', html);
  }

  // adding functionality to bookmark btns
  const bookmarkItem = document.querySelectorAll('.bookmark-item');
  bookmarkItem.forEach((item) => {
    item.addEventListener('click', (e) => {
      // temporary => display bookmarked recipe from bookmark
      const clickId = e.currentTarget.dataset.id;
      getRecipe(clickId);
      // temporary => display bookmarked recipe from bookmark
    });
  });
};
