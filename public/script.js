document.addEventListener("DOMContentLoaded", () => {
  // تحديد العناصر المطلوبة
  const formSection = document.querySelector(".form-section");
  const infoSection = document.querySelector(".info-section");
  const header = document.getElementById("header");
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.getElementById('navbar');

  // استخدام IntersectionObserver لتحسين أداء الكشف عن ظهور الأقسام
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      threshold: 0.25 // تفعيل عند رؤية 25% من العنصر
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // إيقاف المراقبة بعد التفعيل
        }
      });
    }, observerOptions);

    if (formSection) observer.observe(formSection);
    if (infoSection) observer.observe(infoSection);
  } else {
    // الحل البديل في حال عدم دعم IntersectionObserver
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.75; // نقطة التفعيل عند 75% من ارتفاع الشاشة
      if (formSection && formSection.getBoundingClientRect().top < triggerPoint) {
        formSection.classList.add("active");
      }
      if (infoSection && infoSection.getBoundingClientRect().top < triggerPoint) {
        infoSection.classList.add("active");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // تغيير مظهر الهيدر عند التمرير
  const handleHeaderScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  };
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // تفعيل زر القائمة (الهامبرغر) لتبديل عرض القائمة
  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }
});
