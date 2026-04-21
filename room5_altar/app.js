const altarVideo = document.getElementById("altarVideo");
const musicTrack = document.getElementById("musicTrack");
const musicBtn = document.getElementById("musicBtn");
const backBtn = document.getElementById("backBtn");

/* Базовые уровни громкости */
const VIDEO_BASE_VOLUME = 1.0;   // обычный треск огня
const VIDEO_LOW_VOLUME  = 0.08;   // когда включён Шёпот
const MUSIC_VOLUME      = 0.20;   // отдельный mp3

musicTrack.volume = MUSIC_VOLUME;
altarVideo.volume = VIDEO_BASE_VOLUME;

/* Первый клик пользователя включает звук видео */
function unlockVideoSound() {
  altarVideo.muted = false;
  altarVideo.volume = VIDEO_BASE_VOLUME;

  altarVideo.play().catch((error) => {
    console.log("Video sound unlock failed:", error);
  });

  document.removeEventListener("pointerdown", unlockVideoSound);
}

document.addEventListener("pointerdown", unlockVideoSound);

/* Кнопка Шёпот:
   - включает / выключает mp3
   - приглушает / возвращает звук видео
*/
musicBtn.addEventListener("click", async () => {
  try {
    if (musicTrack.paused) {
      await musicTrack.play();

      /* При включении Шёпота немного приглушаем треск огня */
      altarVideo.volume = VIDEO_LOW_VOLUME;

      musicBtn.classList.add("is-active");
    } else {
      musicTrack.pause();

      /* Возвращаем обычную громкость треска огня */
      altarVideo.volume = VIDEO_BASE_VOLUME;

      musicBtn.classList.remove("is-active");
    }
  } catch (error) {
    console.log("Music toggle failed:", error);
  }
});

/* Возврат назад */
backBtn.addEventListener("click", () => {
  window.location.href = "../room4/index.html";
});
