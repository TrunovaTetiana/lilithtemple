const hotspotButtons = document.querySelectorAll(".hotspot");
const mobileButtons = document.querySelectorAll(".mobile-btn");
const hallVideo = document.getElementById("hallVideo");
const hallAudio = document.getElementById("hallAudio");
const videoStartBtn = document.getElementById("videoStartBtn");

let isSoundOn = false;

function goToTarget(target) {
  if (!target) return;
  window.location.href = target;
}

/* HOTSPOTS */
hotspotButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToTarget(button.dataset.target);
  });
});

/* MOBILE BUTTONS */
mobileButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToTarget(button.dataset.target);
  });
});

/* VIDEO AUTOPLAY (always muted) */
async function tryStartVideo() {
  if (!hallVideo) return;

  try {
    hallVideo.muted = true;
    hallVideo.playsInline = true;
    await hallVideo.play();
  } catch (err) {
    console.log("Autoplay blocked or failed:", err);
  }

  /* Кнопку НЕ скрываем */
  if (videoStartBtn) {
    videoStartBtn.classList.remove("hidden");
    videoStartBtn.textContent = "Whisper";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  tryStartVideo();
});

/* WHISPER BUTTON = AUDIO TOGGLE */
videoStartBtn?.addEventListener("click", async () => {
  try {
    if (!hallAudio) return;

    if (!isSoundOn) {
      hallVideo.muted = true;

      hallAudio.volume = 0.4;
      await hallAudio.play();

      videoStartBtn.textContent = "Mute";
      isSoundOn = true;
    } else {
      hallAudio.pause();
      hallAudio.currentTime = 0;

      videoStartBtn.textContent = "Whisper";
      isSoundOn = false;
    }
  } catch (err) {
    console.log("Audio toggle error:", err);
  }
});










