export const loader = function (parentElement) {
  const html = `
    <div class="loader">
      <div class="loader__box">
        <span class="loader__box-circle"></span>
        <span class="loader__box-circle"></span>
        <span class="loader__box-circle"></span>
        <span class="loader__box-circle"></span>
      </div>
    </div>`;
  parentElement.insertAdjacentHTML('afterbegin', html);
};
