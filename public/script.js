document.addEventListener("DOMContentLoaded", () => {
  // Define DOM elements
  const formSection = document.querySelector(".form-section");
  const infoSection = document.querySelector(".info-section");
  const header = document.getElementById("header");
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.getElementById('navbar');

  // Intersection Observer for lazy loading of sections
  const initializeIntersectionObserver = () => {
    if ("IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        threshold: 0.25 // Trigger when 25% of the element is visible
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Stop observing once active
          }
        });
      }, observerOptions);

      if (formSection) observer.observe(formSection);
      if (infoSection) observer.observe(infoSection);
    } else {
      // Fallback for browsers that do not support IntersectionObserver
      const handleScroll = () => {
        const triggerPoint = window.innerHeight * 0.75;
        if (formSection && formSection.getBoundingClientRect().top < triggerPoint) {
          formSection.classList.add("active");
        }
        if (infoSection && infoSection.getBoundingClientRect().top < triggerPoint) {
          infoSection.classList.add("active");
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Trigger on initial load
    }
  };

  // Header scroll effect
  const handleHeaderScroll = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  };

  // Toggle navbar visibility
  const toggleNavbar = () => {
    if (menuToggle && navbar) {
      menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
      });
    }
  };

  // Initialize functionality
  initializeIntersectionObserver();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Trigger initial state
  toggleNavbar();
});
