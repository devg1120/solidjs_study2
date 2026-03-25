document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.test-scroll-container');
  const tableHeader = document.querySelector('.test-scroll-header');

  scrollContainer.addEventListener('scroll', () => {
    tableHeader.style.transform = `translateX(${scrollContainer.scrollLeft}px)`;
  });
});


