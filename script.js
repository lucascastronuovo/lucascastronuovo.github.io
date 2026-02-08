/* Portfolio interactions (filtering, smooth scroll, reveal on scroll) */

// Exposed globally because it is used from inline onclick handlers in HTML.
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth' });
}

(() => {
  'use strict';

  const filterContainerProjects = document.querySelector('.gallery__projects');
  const filterContainerCategories = document.querySelector('.gallery__categories');
  const galleryItems = document.querySelectorAll('.project__card');

  function filterGallery(filterValue) {
    galleryItems.forEach((item) => {
      const shouldShow = filterValue === 'all' || item.classList.contains(filterValue);

      if (shouldShow) {
        item.classList.remove('hide');
        item.classList.add('show');
      } else {
        item.classList.remove('show');
        item.classList.add('hide');
      }
    });
  }

  function clearActive(container) {
    if (!container) return;
    const current = container.querySelector('.active');
    if (current) current.classList.remove('active');
  }

  function setActive(container, element) {
    if (!container) return;
    clearActive(container);
    if (element) element.classList.add('active');
  }

  // Gallery filters (if the page includes the filter UI)
  if (filterContainerProjects && filterContainerCategories) {
    filterContainerProjects.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.classList.contains('filter-item')) return;

      clearActive(filterContainerCategories);
      setActive(filterContainerProjects, target);

      const filterValue = target.getAttribute('data-filter');
      if (!filterValue) return;
      filterGallery(filterValue);
    });

    filterContainerCategories.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.classList.contains('filter-item')) return;

      clearActive(filterContainerProjects);
      setActive(filterContainerCategories, target);

      const filterValue = target.getAttribute('data-filter');
      if (!filterValue) return;
      filterGallery(filterValue);
    });
  }

  // Reveal on scroll
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      // Fallback: if observer is not supported, show everything.
      sections.forEach((section) => section.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  });

  // Clicking a knowledge card scrolls to portfolio and applies the corresponding filter
  const knowledgeCards = document.querySelectorAll('.knowledge__card .card');
  knowledgeCards.forEach((card) => {
    card.addEventListener('click', () => {
      const filterValue = card.getAttribute('data-filter');
      if (!filterValue) return;

      scrollToSection('portfolio');

      // Update active state on filter controls if they exist on the page
      clearActive(filterContainerProjects);

      if (filterContainerCategories) {
        clearActive(filterContainerCategories);

        const categoryToActivate = filterContainerCategories.querySelector(
          `.filter-item[data-filter="${filterValue}"]`
        );
        if (categoryToActivate) categoryToActivate.classList.add('active');
      }

      filterGallery(filterValue);
    });
  });
})();
