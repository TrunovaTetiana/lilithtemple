const video = document.getElementById("bgVideo");
const videoBtn = document.getElementById("videoStartBtn");

video.play().then(() => {
  videoBtn.style.display = "none";
}).catch(() => {
  videoBtn.style.display = "block";
});

videoBtn.addEventListener("click", async () => {
  await video.play();
  videoBtn.style.display = "none";
});

/* 🎧 SOUND */
const sound = document.getElementById("bgSound");
const soundBtn = document.getElementById("soundBtn");

soundBtn.addEventListener("click", () => {
  sound.volume = 0;
  sound.play();

  let v = 0;
  const fade = setInterval(() => {
    if (v < 0.08) {
      v += 0.005;
      sound.volume = v;
    } else {
      clearInterval(fade);
    }
  }, 200);
});

/* 🜏 SIGIL → назад */
document.getElementById("sigilBtn").addEventListener("click", () => {
  window.location.href = "../room2/index.html";
});

/* 🔥 PORTALS */
document.querySelectorAll(".hotspot").forEach(h => {
  h.addEventListener("click", () => {
    window.location.href = h.dataset.target;
  });
});



document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = btn.dataset.target;
  });
});
