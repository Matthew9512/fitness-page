export const renderSpinner = (parentElement) => {
  const html = `
  <div class="spinner hidden">
  <div class="loader">
    <span class="loader-dot"></span>
    <div class="loader-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  </div>`;
  parentElement.insertAdjacentHTML('afterbegin', html);
};
