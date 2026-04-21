const video = document.getElementById("bgVideo");
const soundToggle = document.getElementById("soundToggle");
const sigilBack = document.getElementById("sigilBack");

video.loop = false;
video.muted = true;

window.addEventListener("load", async () => {
  try {
    await video.play();
  } catch (error) {
    console.log("Autoplay blocked:", error);
  }
});

soundToggle.addEventListener("click", async () => {
  try {
    if (video.paused) {
      await video.play();
    }

    video.muted = !video.muted;
    soundToggle.textContent = video.muted ? "Sound: OFF" : "Sound: ON";
  } catch (error) {
    console.log("Toggle error:", error);
  }
});

sigilBack.addEventListener("click", () => {
  window.location.href = "../room3/index.html";
});
