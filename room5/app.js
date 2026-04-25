// =========================================================
// ROOM 5 — VIDEO + SEPARATE MUSIC + DOOR SIGIL
// =========================================================

// ===== ELEMENTS =====
const soundBtn = document.getElementById("soundBtn");

const musicTrack = document.getElementById("musicTrack");
const musicBtn = document.getElementById("musicBtn");

const doorBtn = document.getElementById("doorBtn");


// Отдельная музыка — мягкий фон
const MUSIC_VOLUME = 0.60;

musicTrack.volume = MUSIC_VOLUME;


// ===== MUSIC TOGGLE =====
// Эта кнопка управляет только музыкой.
musicBtn.addEventListener("click", async () => {
  try {
    if (musicTrack.paused) {
      await musicTrack.play();
      musicBtn.classList.add("is-active");
    } else {
      musicTrack.pause();
      musicBtn.classList.remove("is-active");
    }
  } catch (error) {
    console.log("Music toggle failed:", error);
  }
});

// ===== DOOR TRANSITION =====
// Клик по сигилу на двери ведёт в altar room.
doorBtn.addEventListener("click", () => {
  window.location.href = "../room5_altar/index.html";
});
