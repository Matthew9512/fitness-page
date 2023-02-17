export const renderBookmark = function (lsArr) {
  const bookmarkDrop = document.querySelector('.bookmark-drop');
  bookmarkDrop.innerHTML = '';

  for (const lsItem of lsArr) {
    const html = `
        <div class="recipe-wrapper" data-id="#${lsItem.id}">
        <img src="${lsItem.image}" alt="meal recipe img" class="bookmark-img" />
      <div class="bookmark-info">
        <p class="recipe-title">${lsItem.title}</p>
        <p class="recipe-source">${lsItem.source}</p>
        </div
        </div>`;
    bookmarkDrop.insertAdjacentHTML('afterbegin', html);
  }
};
