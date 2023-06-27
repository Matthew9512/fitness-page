export const renderError = function (error, parentElement) {
  const html = `
      <div class="error-div">
        <i class="fa-regular fa-face-frown error-icon"></i>
        <p class="error-message">Upssss, Looks like something went wrong: ${error.message}, Please try again ;)</p>
      </div>`;
  parentElement.insertAdjacentHTML('afterbegin', html);
};
