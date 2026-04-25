/* =========================================================
   ROOM 7 — MUSIC ROOM
========================================================= */

/* =========================================================
   DOM
========================================================= */
const sceneVideo = document.getElementById("sceneVideo");
const roomSoundBtn = document.getElementById("roomSoundBtn");

const cardOverlay = document.getElementById("cardOverlay");
const cardBackdrop = document.getElementById("cardBackdrop");
const closeCardBtn = document.getElementById("closeCardBtn");

const prevCardBtn = document.getElementById("prevCardBtn");
const nextCardBtn = document.getElementById("nextCardBtn");

const artistOpenButtons = document.querySelectorAll(".artist-hotspot");
const allCards = document.querySelectorAll(".music-card");
const trackButtons = document.querySelectorAll(".track-btn");

const musicPlayer = document.getElementById("musicPlayer");

/* =========================================================
   SETTINGS
========================================================= */
const MOBILE_VIDEO_BREAKPOINT = 600;

const VIDEO_SOURCES = {
  desktop: "assets/video/scene-desktop.mp4",
  mobile: "assets/video/scene-desktop.mp4"
};

const CARD_ORDER = ["less-doll", "nina"];

let currentVideoMode = null;
let currentCardKey = null;
let roomSoundEnabled = false;
let currentTrackButton = null;

/* =========================================================
   VIDEO SOURCE
========================================================= */
function setResponsiveVideo() {
  const isMobile = window.innerWidth <= MOBILE_VIDEO_BREAKPOINT;
  const nextMode = isMobile ? "mobile" : "desktop";

  if (currentVideoMode === nextMode) return;

  currentVideoMode = nextMode;
  sceneVideo.src = VIDEO_SOURCES[nextMode];
  sceneVideo.load();

  sceneVideo.play().catch(() => {
    /* autoplay can be blocked */
  });

  if (roomSoundEnabled) {
    sceneVideo.muted = false;
    sceneVideo.volume = 0.45;
  } else {
    sceneVideo.muted = true;
  }
}

/* =========================================================
   ROOM SOUND
========================================================= */
function updateRoomSoundButton() {
  roomSoundBtn.textContent = roomSoundEnabled ? "Room Sound: ON" : "Room Sound: OFF";
}

function enableRoomSound() {
  roomSoundEnabled = true;
  sceneVideo.muted = false;
  sceneVideo.volume = musicPlayer.paused ? 0.45 : 0.08;

  sceneVideo.play().catch(() => {
    /* browser can require gesture */
  });

  updateRoomSoundButton();
}

function disableRoomSound() {
  roomSoundEnabled = false;
  sceneVideo.muted = true;
  updateRoomSoundButton();
}

function lowerRoomSoundForMusic() {
  if (!roomSoundEnabled) return;
  sceneVideo.muted = false;
  sceneVideo.volume = 0.08;
}

function restoreRoomSoundAfterMusic() {
  if (!roomSoundEnabled) return;
  sceneVideo.muted = false;
  sceneVideo.volume = 0.45;
}

/* =========================================================
   CARDS
========================================================= */
function getCardElement(cardKey) {
  return document.getElementById(`card-${cardKey}`);
}

function hideAllCards() {
  allCards.forEach((card) => {
    card.classList.remove("active-card");
  });
}

function openCard(cardKey) {
  currentCardKey = cardKey;

  hideAllCards();

  const card = getCardElement(cardKey);
  if (card) {
    card.classList.add("active-card");
  }

  cardOverlay.classList.remove("hidden");
  cardOverlay.setAttribute("aria-hidden", "false");
}

function closeCard() {
  cardOverlay.classList.add("hidden");
  cardOverlay.setAttribute("aria-hidden", "true");
  hideAllCards();
}

function showPreviousCard() {
  if (!currentCardKey) return;

  const currentIndex = CARD_ORDER.indexOf(currentCardKey);
  const prevIndex = (currentIndex - 1 + CARD_ORDER.length) % CARD_ORDER.length;
  openCard(CARD_ORDER[prevIndex]);
}

function showNextCard() {
  if (!currentCardKey) return;

  const currentIndex = CARD_ORDER.indexOf(currentCardKey);
  const nextIndex = (currentIndex + 1) % CARD_ORDER.length;
  openCard(CARD_ORDER[nextIndex]);
}

/* =========================================================
   TRACKS
========================================================= */
function clearTrackStates() {
  trackButtons.forEach((button) => {
    button.classList.remove("is-playing");
  });
  currentTrackButton = null;
}

function stopCurrentTrack() {
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
  clearTrackStates();
  restoreRoomSoundAfterMusic();
}

function playTrackFromButton(button) {
  const trackSrc = button.dataset.track;
  if (!trackSrc) return;

  const isSameTrack =
    musicPlayer.src.includes(trackSrc) &&
    !musicPlayer.paused &&
    currentTrackButton === button;

  if (isSameTrack) {
    stopCurrentTrack();
    return;
  }

  musicPlayer.pause();
  musicPlayer.currentTime = 0;

  clearTrackStates();

  musicPlayer.src = trackSrc;
  musicPlayer.load();
  musicPlayer.play().catch(() => {
    /* user gesture should already exist */
  });

  currentTrackButton = button;
  currentTrackButton.classList.add("is-playing");

  lowerRoomSoundForMusic();
}

/* =========================================================
   FIRST USER GESTURE
   Чтобы room sound мог стартовать корректно на телефоне
========================================================= */
function unlockMedia() {
  sceneVideo.play().catch(() => {});
  document.removeEventListener("click", unlockMedia);
  document.removeEventListener("touchstart", unlockMedia);
}

/* =========================================================
   EVENTS
========================================================= */
artistOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cardKey = button.dataset.card;
    openCard(cardKey);
  });
});

closeCardBtn.addEventListener("click", closeCard);
cardBackdrop.addEventListener("click", closeCard);

prevCardBtn.addEventListener("click", showPreviousCard);
nextCardBtn.addEventListener("click", showNextCard);

roomSoundBtn.addEventListener("click", () => {
  if (roomSoundEnabled) {
    disableRoomSound();
  } else {
    enableRoomSound();
  }
});

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playTrackFromButton(button);
  });
});

musicPlayer.addEventListener("ended", () => {
  clearTrackStates();
  restoreRoomSoundAfterMusic();
});

window.addEventListener("resize", setResponsiveVideo);

document.addEventListener("keydown", (event) => {
  if (cardOverlay.classList.contains("hidden")) return;

  if (event.key === "Escape") {
    closeCard();
  }

  if (event.key === "ArrowLeft") {
    showPreviousCard();
  }

  if (event.key === "ArrowRight") {
    showNextCard();
  }
});

document.addEventListener("click", unlockMedia);
document.addEventListener("touchstart", unlockMedia);

/* =========================================================
   INIT
========================================================= */
setResponsiveVideo();
updateRoomSoundButton();
