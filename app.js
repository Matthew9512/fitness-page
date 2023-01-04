const questionWrapper = document.querySelectorAll('.question-wrapper');
const faqArrows = document.querySelectorAll('.fa-angle-down');
const btnLogin = document.querySelector('.btn-login');
const mainNavbar = document.querySelector('.main-navbar');
const heroSection = document.querySelector('.hero-section');
const scrollTop = document.querySelector('.btn-scroll-top');

// height of navbar
const mainNavbarHeight = mainNavbar.getBoundingClientRect().height;

// change arrow direction
questionWrapper.forEach((qw) => {
  qw.addEventListener('click', () => {
    faqArrows.forEach((arrow) => {
      if (arrow.classList.contains('active')) {
        arrow.classList.toggle('active');
      } else {
        faqArrows.forEach((arrow) => arrow.classList.remove('active'));
        arrow.classList.add('active');
      }
    });
  });
});

// show clicked answer
questionWrapper.forEach((q) => {
  q.addEventListener('click', () => {
    if (q.parentElement.classList.contains('active')) {
      q.parentElement.classList.toggle('active');
    } else {
      questionWrapper.forEach((q) => q.parentElement.classList.remove('active'));
      q.parentElement.classList.add('active');
    }
  });
});

// sticky navbar
const stickyNavbar = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      mainNavbar.classList.add('sticky');
      scrollTop.classList.remove('hidden');
    } else {
      scrollTop.classList.add('hidden');
      mainNavbar.classList.remove('sticky');
    }
  });
};

const navbarObserver = new IntersectionObserver(stickyNavbar, {
  root: null,
  threshold: 0,
  rootMargin: `-${mainNavbarHeight}px`,
});
navbarObserver.observe(heroSection);
