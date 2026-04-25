/* =========================================================
   🜏 ROOM 8 — ART SPACE
   app.js

   Логика комнаты:
   - 2 зеркала
   - 2 галереи карточек
   - листание карточек
   - закрытие карточек
   - выход в Room 4
   - музыка on/off
   - mobile fallback
========================================================= */


/* =========================================================
   ===== DOM ELEMENTS =====
   Здесь мы собираем все нужные элементы из HTML
========================================================= */

const roomMusic = document.getElementById("roomMusic");
const musicToggleBtn = document.getElementById("musicToggleBtn");

const mirrorOneBtn = document.getElementById("mirrorOneBtn");
const mirrorTwoBtn = document.getElementById("mirrorTwoBtn");

const exitSigil = document.getElementById("exitSigil");
const mobileExitBtn = document.getElementById("mobileExitBtn");

const mobilePanel = document.getElementById("mobilePanel");
const mobileGalleryButtons = document.querySelectorAll(".mobile-btn[data-gallery]");

const cardOverlay = document.getElementById("cardOverlay");
const cardImage = document.getElementById("cardImage");

const cardPrevBtn = document.getElementById("cardPrevBtn");
const cardNextBtn = document.getElementById("cardNextBtn");
const cardCloseBtn = document.getElementById("cardCloseBtn");


/* =========================================================
   ===== ROOM 8 GALLERIES =====

   ЗДЕСЬ ТЫ ПОТОМ МОЖЕШЬ:
   - добавлять новые PNG
   - убирать старые PNG
   - менять порядок карточек

   Главное:
   - сохраняй точные имена файлов
   - путь всегда: assets/img/ИМЯ_ФАЙЛА
========================================================= */

const galleries = {
  mirror1: [
    "assets/img/serrano_ikona.webp",
    "assets/img/tata1.webp",
    "assets/img/tata2.webp",
    "assets/img/tata3.webp",
    "assets/img/tata4.webp",
    "assets/img/warning.webp"
  ],

   mirror2: [
    "assets/img/vivian.webp",
    "assets/img/sova.webp",
    "assets/img/lana_lik.webp",
    "assets/img/lana_boo.webp",
    "assets/img/lana_mirror.webp",
    "assets/img/lana_grimuar.webp",
    "assets/img/warning.webp"
  ]


};


/* =========================================================
   ===== GALLERY STATE =====
   currentGalleryKey = какая галерея сейчас открыта
   currentIndex = какая карточка сейчас показана
========================================================= */

let currentGalleryKey = null;
let currentIndex = 0;


/* =========================================================
   ===== MUSIC STATE =====
========================================================= */

let musicEnabled = false;


/* =========================================================
   ===== MUSIC SETTINGS =====

   Здесь можно регулировать стартовую громкость музыки.
   Если захочешь тише:
   0.10
   0.12
   0.15

   Сейчас поставила мягкую громкость.
========================================================= */

roomMusic.volume = 0.14;


/* =========================================================
   ===== HELPER: UPDATE MUSIC BUTTON TEXT =====
   Меняет текст кнопки в зависимости от состояния
========================================================= */

function updateMusicButton() {
  if (musicEnabled) {
    musicToggleBtn.textContent = "Music On";
  } else {
    musicToggleBtn.textContent = "Music Off";
  }
}


/* =========================================================
   ===== HELPER: GET CURRENT GALLERY =====
========================================================= */

function getCurrentGallery() {
  if (!currentGalleryKey) return [];
  return galleries[currentGalleryKey] || [];
}


/* =========================================================
   ===== HELPER: SHOW CURRENT CARD =====
   Показывает текущую PNG карточку
========================================================= */

function showCurrentCard() {
  const gallery = getCurrentGallery();

  if (!gallery.length) return;

  const currentCardPath = gallery[currentIndex];
  cardImage.src = currentCardPath;

  /* alt можно оставить нейтральным */
  cardImage.alt = `Card ${currentIndex + 1}`;
}


/* =========================================================
   ===== OPEN GALLERY =====
   Открывает нужную галерею по ключу:
   - mirror1
   - mirror2
========================================================= */

function openGallery(galleryKey) {
  const gallery = galleries[galleryKey];

  if (!gallery || !gallery.length) return;

  currentGalleryKey = galleryKey;
  currentIndex = 0;

  showCurrentCard();
  cardOverlay.classList.remove("hidden");
}


/* =========================================================
   ===== CLOSE GALLERY =====
========================================================= */

function closeGallery() {
  cardOverlay.classList.add("hidden");
  currentGalleryKey = null;
  currentIndex = 0;
}


/* =========================================================
   ===== NEXT CARD =====
   Листание по кругу вперёд
========================================================= */

function nextCard() {
  const gallery = getCurrentGallery();

  if (!gallery.length) return;

  currentIndex++;

  if (currentIndex >= gallery.length) {
    currentIndex = 0;
  }

  showCurrentCard();
}


/* =========================================================
   ===== PREVIOUS CARD =====
   Листание по кругу назад
========================================================= */

function prevCard() {
  const gallery = getCurrentGallery();

  if (!gallery.length) return;

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = gallery.length - 1;
  }

  showCurrentCard();
}


/* =========================================================
   ===== TOGGLE MUSIC =====
   Включить / выключить музыку комнаты
========================================================= */

function toggleMusic() {
  if (!musicEnabled) {
    roomMusic.play().then(() => {
      musicEnabled = true;
      updateMusicButton();
    }).catch((error) => {
      console.log("Music autoplay blocked:", error);
    });
  } else {
    roomMusic.pause();
    musicEnabled = false;
    updateMusicButton();
  }
}


/* =========================================================
   ===== GO TO ROOM 4 =====
   Переход назад в Hall / Room 4

   ЕСЛИ НУЖНО ПОТОМ ИЗМЕНИТЬ ПУТЬ:
   меняешь только строку ниже
========================================================= */

function goToRoom4() {
  window.location.href = "../room4/index.html";
}


/* =========================================================
   ===== CLICK EVENTS — MIRRORS =====
========================================================= */

mirrorOneBtn.addEventListener("click", () => {
  openGallery("mirror1");
});

mirrorTwoBtn.addEventListener("click", () => {
  openGallery("mirror2");
});


/* =========================================================
   ===== CLICK EVENTS — MOBILE PANEL =====
========================================================= */

mobileGalleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const galleryKey = button.dataset.gallery;
    openGallery(galleryKey);
  });
});


/* =========================================================
   ===== CLICK EVENTS — CARD CONTROLS =====
========================================================= */

cardPrevBtn.addEventListener("click", prevCard);
cardNextBtn.addEventListener("click", nextCard);
cardCloseBtn.addEventListener("click", closeGallery);


/* =========================================================
   ===== CLOSE ON DARK OVERLAY CLICK =====
   Закрываем карточки, если кликнули по затемнению
   Но не закрываем, если клик был внутри card-viewer
========================================================= */

cardOverlay.addEventListener("click", (event) => {
  if (event.target === cardOverlay) {
    closeGallery();
  }
});


/* =========================================================
   ===== MUSIC BUTTON =====
========================================================= */

musicToggleBtn.addEventListener("click", toggleMusic);


/* =========================================================
   ===== EXIT TO ROOM 4 =====
========================================================= */

exitSigil.addEventListener("click", goToRoom4);

if (mobileExitBtn) {
  mobileExitBtn.addEventListener("click", goToRoom4);
}


/* =========================================================
   ===== KEYBOARD SUPPORT =====
   Удобно для теста на ноутбуке:
   ArrowLeft  -> назад
   ArrowRight -> вперёд
   Escape     -> закрыть карточки
========================================================= */

document.addEventListener("keydown", (event) => {
  const overlayIsOpen = !cardOverlay.classList.contains("hidden");

  if (!overlayIsOpen) return;

  if (event.key === "ArrowLeft") {
    prevCard();
  }

  if (event.key === "ArrowRight") {
    nextCard();
  }

  if (event.key === "Escape") {
    closeGallery();
  }
});


/* =========================================================
   ===== INITIAL UI STATE =====
========================================================= */

updateMusicButton();


/* =========================================================
   ===== OPTIONAL DEBUG =====

   Если потом захочешь быстро проверить,
   что именно загружается, можно временно раскомментировать:

   console.log(galleries);
========================================================= */
