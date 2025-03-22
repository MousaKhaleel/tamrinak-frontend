// الحصول على قسم الـ Hero
const heroSection = document.getElementById('hero');

// مصفوفة الصور للخلفية
const backgrounds = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg'
];

// الفهرس الحالي
let currentIndex = 0;

// دالة تغيير الخلفية
function changeBackground() {
  currentIndex = (currentIndex + 1) % backgrounds.length;
  heroSection.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
}

// تغيير الخلفية كل 5 ثوانٍ
setInterval(changeBackground, 5000);
