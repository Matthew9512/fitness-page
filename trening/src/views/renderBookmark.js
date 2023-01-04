export const renderBookmark = (lsArr) => {
  const bookmarkNumber = document.querySelector('.bookmark-number');
  const bookmarkDrop = document.querySelector('.bookmark-drop');

  bookmarkDrop.innerHTML = '';

  if (lsArr.length === 0) {
    bookmarkDrop.textContent = `nothing to see here`;
  }

  for (const ls of lsArr) {
    const html = `
        <div class="bookmark-item" data-id="${ls.id}">
        <img src="${ls.gif}" alt="meal recipe img" class="bookmark-img" />
      <div class="bookmark-info">
        <p class="recipe-name">${ls.name}</p>
        <p class="recipe-target">${ls.target}</p>
        </div
        </div>`;
    bookmarkDrop.insertAdjacentHTML('afterbegin', html);
  }
  // adding functionality to bookmark btns
  const bookmarkItem = document.querySelectorAll('.bookmark-item');

  bookmarkNumber.textContent = lsArr.length;

  bookmarkItem.forEach((item) => {
    item.addEventListener('click', (e) => {
      // temporary => display bookmarked recipe from bookmark
      // const clickId = e.currentTarget.dataset.id;
      // getRecipe(clickId);
      // temporary => display bookmarked recipe from bookmark
    });
  });
};
