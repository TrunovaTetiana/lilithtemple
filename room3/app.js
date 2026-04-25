
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
