// =========================================================
// ROOM 5 — VIDEO + SEPARATE MUSIC + DOOR SIGIL
// =========================================================

// ===== ELEMENTS =====
const roomVideo = document.getElementById("roomVideo");
const soundBtn = document.getElementById("soundBtn");

const musicTrack = document.getElementById("musicTrack");
const musicBtn = document.getElementById("musicBtn");

const doorBtn = document.getElementById("doorBtn");

// ===== INITIAL AUDIO LEVELS =====
// Тихий родной звук видео (огонь / комната)
const VIDEO_VOLUME = 0.18;

// Отдельная музыка — мягкий фон
const MUSIC_VOLUME = 0.30;

musicTrack.volume = MUSIC_VOLUME;

// ===== VIDEO SOUND UNLOCK =====
// Браузер не даст autoplay со звуком.
// Поэтому видео стартует muted,
// а кнопка 🔥 включает именно звук видео.
soundBtn.addEventListener("click", async () => {
  try {
    roomVideo.muted = false;
    roomVideo.volume = VIDEO_VOLUME;
    await roomVideo.play();

    soundBtn.classList.add("is-active");
    soundBtn.disabled = true;
  } catch (error) {
    console.log("Video sound unlock failed:", error);
  }
});

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
