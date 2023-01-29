export const renderBookmark = function (lsArr) {
  const bookmarkDrop = document.querySelector('.bookmark-drop');
  bookmarkDrop.innerHTML = '';

  for (const lsItem of lsArr) {
    const html = `
      <div class="bkm bookmark-item" data-id="${lsItem.id}" data-name="${lsItem.name}">
        <img src="${lsItem.gif}" alt="meal recipe img" class="bookmark-img" />
        <div class="bookmark-info">
          <p class="recipe-name">${lsItem.name}</p>
          <p class="recipe-target">${lsItem.target}</p>
        </div
      </div>`;
    bookmarkDrop.insertAdjacentHTML('afterbegin', html);
  }
};
