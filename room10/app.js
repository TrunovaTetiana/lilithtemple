const video = document.getElementById("bgVideo");
const soundToggle = document.getElementById("soundToggle");
const sigilBack = document.getElementById("sigilBack");

/* стартуем видео без звука */
video.muted = true;
video.autoplay = true;
video.loop = false;

/* пытаемся автозапустить */
const playPromise = video.play();
if (playPromise !== undefined) {
  playPromise.catch(() => {
    console.log("Autoplay was blocked by browser.");
  });
}

/* кнопка звука */
soundToggle.addEventListener("click", async () => {
  try {
    if (video.paused) {
      await video.play();
    }

    video.muted = !video.muted;
    soundToggle.textContent = video.muted ? "Sound: OFF" : "Sound: ON";
  } catch (error) {
    console.log("Sound toggle error:", error);
  }
});

/* возврат в room3 */
sigilBack.addEventListener("click", () => {
  window.location.href = "../room3/index.html";
});
