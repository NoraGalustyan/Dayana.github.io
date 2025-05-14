// Бургер меню
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });
};

navSlide();

// Галерея
const carouselContainer = document.querySelector(".carousel-container");
const carouselWrapper = document.querySelector(".carousel-wrapper");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

let itemWidth;
let currentPosition = 0;
let itemsPerSlide = 2; // По умолчанию 2 элемента на слайд

// Функция для определения количества элементов на слайд
function updateItemsPerSlide() {
  if (window.innerWidth <= 820) {
    itemsPerSlide = 1; // 1 элемент на мобильных
  } else {
    itemsPerSlide = 2; // 2 элемента на больших экранах
  }
  itemWidth = carouselItems[0].offsetWidth; // Обновляем ширину элемента
}

// Вызываем функцию при загрузке и изменении размера окна
updateItemsPerSlide();
window.addEventListener("resize", updateItemsPerSlide);

function moveCarousel(direction) {
  updateItemsPerSlide(); // Обновляем количество элементов на слайд перед каждым движением
  currentPosition += itemWidth * direction * itemsPerSlide;

  // Ограничения для прокрутки
  if (currentPosition > 0) {
    currentPosition = 0;
  } else if (
    currentPosition <
    -(carouselItems.length - itemsPerSlide) * itemWidth
  ) {
    currentPosition = -(carouselItems.length - itemsPerSlide) * itemWidth;
  }

  carouselWrapper.style.transform = `translateX(${currentPosition}px)`;
}

// Обработчики событий для кнопок
prevButton.addEventListener("click", () => moveCarousel(1)); // Исправлено: 1 для "назад"
nextButton.addEventListener("click", () => moveCarousel(-1)); // Исправлено: -1 для "вперед"

// Сенсорное управление
let touchStartX = 0;
let touchEndX = 0;

carouselWrapper.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

carouselWrapper.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  const swipeThreshold = 50; // Минимальное расстояние для определения свайпа

  if (swipeDistance > swipeThreshold) {
    // Свайп влево (вперед)
    moveCarousel(-1);
  } else if (swipeDistance < -swipeThreshold) {
    // Свайп вправо (назад)
    moveCarousel(1);
  }
}
