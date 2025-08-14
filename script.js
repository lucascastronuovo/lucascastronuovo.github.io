const filterContainerProjects = document.querySelector('.gallery__projects');
const filterContainerCategories = document.querySelector('.gallery__categories');
const galleryItems = document.querySelectorAll('.project__card');

function filterGallery(filterValue) {
    galleryItems.forEach(item => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.classList.remove("hide");
            item.classList.add("show");
        } else {
            item.classList.remove("show");
            item.classList.add("hide");
        }
    });
}

filterContainerProjects.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) {
        const activeCategory = filterContainerCategories.querySelector(".active");
        if (activeCategory) activeCategory.classList.remove("active");

        const activeProject = filterContainerProjects.querySelector(".active");
        if (activeProject) activeProject.classList.remove("active");
        event.target.classList.add("active");

        const filterValue = event.target.getAttribute("data-filter");
        filterGallery(filterValue);
    }
});

filterContainerCategories.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item")) {
        const activeProject = filterContainerProjects.querySelector(".active");
        if (activeProject) activeProject.classList.remove("active");

        const activeCategory = filterContainerCategories.querySelector(".active");
        if (activeCategory) activeCategory.classList.remove("active");
        event.target.classList.add("active");

        const filterValue = event.target.getAttribute("data-filter");
        filterGallery(filterValue);
    }
});


function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const aboutSection = document.querySelector('.about__me');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutSection.classList.add('visible');
            } else {
                aboutSection.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(aboutSection);
});


const knowledgeCards = document.querySelectorAll('.knowledge__card .card');

knowledgeCards.forEach(card => {
    card.addEventListener('click', () => {
        const filterValue = card.getAttribute('data-filter');

        scrollToSection('portfolio');

        const filterContainerProjects = document.querySelector('.gallery__projects');
        if (filterContainerProjects) {
            const activeProject = filterContainerProjects.querySelector('.active');
            if (activeProject) activeProject.classList.remove('active');
        }

        const activeCategory = filterContainerCategories.querySelector('.active');
        if (activeCategory) activeCategory.classList.remove('active');

        const categoryToActivate = filterContainerCategories.querySelector(`.filter-item[data-filter="${filterValue}"]`);
        if (categoryToActivate) categoryToActivate.classList.add('active');

        filterGallery(filterValue);
    });
});