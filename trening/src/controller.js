import { getBodyPartList, updateLS } from './model.js';

// scroll into exerciseArticle
export const scroll = () => {
  const exerciseArticle = document.querySelector('.exercise-article');
  exerciseArticle.scrollIntoView();
};

if (navigator.onLine) {
  console.log(`online`);
  // check ls
  updateLS();
  // fetch body parts
  // getBodyPartList();
} else {
  //   const exerciseArticle = document.querySelector('.exercise-article');
  document.body.textContent = `looks like your internet is down for this moment, try restart router or contact you internet seller`;
  //   exerciseArticle.textContent = `looks like your internet is down for this moment, try restart router or contact you internet seller`;
}
