/* ===================================== */
/* ЭЛЕМЕНТЫ ИЗ HTML */
/* ===================================== */

// Все основные книги на столе
const books = document.querySelectorAll(".book");

// Все корешки на полках
const spines = document.querySelectorAll(".spine");

// Кнопки мобильной панели
const mobileShelfButtons = document.querySelectorAll(".mobile-shelf-btn");

// Тёмный фон
const overlay = document.getElementById("overlay");

// Окно свитка
const scrollWindow = document.getElementById("scrollWindow");

// Заголовок свитка
const scrollTitle = document.getElementById("scrollTitle");

// Текст свитка
const scrollText = document.getElementById("scrollText");

// Кнопка закрытия
const closeBtn = document.getElementById("closeBtn");

// Кнопки языка
const langButtons = document.querySelectorAll(".lang-btn");

// Заголовки мобильных секций
const mobileGroupTitles = document.querySelectorAll(".mobile-group-title");

/* ===================================== */
/* ТЕКУЩЕЕ СОСТОЯНИЕ */
/* ===================================== */

let currentLanguage = "ru";
let currentOpenKey = null;


/* ===================================== */
/* ФУНКЦИЯ ОТКРЫТИЯ СВИТКА */
/* ===================================== */

function openScroll(key) {
  const data = libraryTexts[key];

  if (!data || !data[currentLanguage]) return;

  currentOpenKey = key;

  scrollTitle.textContent = data[currentLanguage].title;
  scrollText.innerHTML = data[currentLanguage].text;

  overlay.classList.remove("hidden");
  scrollWindow.classList.remove("hidden");
}


/* ===================================== */
/* ФУНКЦИЯ ЗАКРЫТИЯ СВИТКА */
/* ===================================== */

function closeScroll() {
  overlay.classList.add("hidden");
  scrollWindow.classList.add("hidden");
}


/* ===================================== */
/* ОБНОВЛЕНИЕ ТЕКСТА МОБИЛЬНЫХ КНОПОК */
/* НОВЫЙ БЛОК */
/* ===================================== */

function updateMobileShelfLabels() {
  mobileShelfButtons.forEach((btn) => {
    const label =
      currentLanguage === "en"
        ? btn.dataset.titleEn
        : btn.dataset.titleRu;

    if (label) {
      btn.textContent = label;
    }
  });
}

/* ===================================== */
/* ОБНОВЛЕНИЕ ЗАГОЛОВКОВ МОБИЛЬНЫХ СЕКЦИЙ */
/* НОВЫЙ БЛОК */
/* ===================================== */

function updateMobileGroupTitles() {
  mobileGroupTitles.forEach((title) => {
    const value =
      currentLanguage === "en"
        ? title.dataset.titleEn
        : title.dataset.titleRu;

    if (value) {
      title.textContent = value;
    }
  });
}



/* ===================================== */
/* ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА */
/* ===================================== */

function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.setAttribute("lang", lang);

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  updateMobileShelfLabels();
  updateMobileGroupTitles();

  if (currentOpenKey) {
    openScroll(currentOpenKey);
  }
}


/* ===================================== */
/* КЛИКИ ПО ОСНОВНЫМ КНИГАМ */
/* ===================================== */

books.forEach((book) => {
  book.addEventListener("click", () => {
    const key = book.dataset.book;
    openScroll(key);
  });
});


/* ===================================== */
/* КЛИКИ ПО КОРЕШКАМ */
/* ===================================== */

spines.forEach((spine) => {
  spine.addEventListener("click", () => {
    const key = spine.dataset.book;
    openScroll(key);
  });
});


/* ===================================== */
/* КЛИКИ ПО МОБИЛЬНОЙ ПАНЕЛИ */
/* ===================================== */

mobileShelfButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.book;
    openScroll(key);
  });
});


/* ===================================== */
/* КНОПКИ ЯЗЫКА */
/* ===================================== */

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
  });
});


/* ===================================== */
/* ЗАКРЫТИЕ СВИТКА */
/* ===================================== */

closeBtn.addEventListener("click", closeScroll);
overlay.addEventListener("click", closeScroll);


/* ===============================
   SIGIL PORTAL → ROOM 3
================================ */

const sigilGate = document.getElementById("sigilGate");

if (sigilGate) {
  sigilGate.addEventListener("click", () => {
    window.location.href = "../room3/index.html";
  });
}


/* ===================================== */
/* СТАРТОВЫЙ ЯЗЫК */
/* ===================================== */

setLanguage("ru");
