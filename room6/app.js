/* =================================================
   Garden Lilith — room6 / app.js
   Clean fade version: 4 videos + layered music
   ================================================= */

/* ---------- VIDEO PLAYLIST ---------- */

const playlist = [
  "assets/video/01_calm_garden.mp4",
  "assets/video/02_mist.mp4",
  "assets/video/03_fire.mp4",
  "assets/video/02_mist.mp4",
  "assets/video/01_calm_garden.mp4",
  "assets/video/04_lilith_presence.mp4"
];

const PLAYBACK_RATE = 1.0;
const DEBUG = true;

const videoA = document.getElementById("videoA");
const videoB = document.getElementById("videoB");

let currentIndex = 0;
let activeVideo = videoA;
let hiddenVideo = videoB;
let isSwitching = false;

function log(...args){
  if (DEBUG) console.log("[Garden Lilith]", ...args);
}

function setupVideo(video){
  if (!video) return;

  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.playbackRate = PLAYBACK_RATE;
}

function clearVideo(video){
  if (!video) return;

  video.pause();
  video.onended = null;
  video.onloadeddata = null;
  video.onerror = null;
  video.removeAttribute("src");
  video.load();
}

function loadVideo(video, src){
  return new Promise((resolve, reject) => {
    clearVideo(video);
    setupVideo(video);

    video.src = src;

    video.onloadeddata = async () => {
      try {
        video.currentTime = 0;
        await video.play();
        resolve();
      } catch (err) {
        reject(err);
      }
    };

    video.onerror = () => {
      reject(new Error("Could not load video: " + src));
    };

    video.load();
  });
}

async function startInitialScene(){
  const src = playlist[currentIndex];
  log("Start initial:", src);

  try {
    await loadVideo(activeVideo, src);
    activeVideo.classList.add("active");
    attachEndedHandler();
  } catch (err) {
    console.error("[Garden Lilith] First scene error:", err);
  }
}

function attachEndedHandler(){
  activeVideo.onended = async () => {
    if (isSwitching) return;
    isSwitching = true;

    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextSrc = playlist[nextIndex];

    log("Scene ended. Loading next:", nextSrc);

    try {
      await loadVideo(hiddenVideo, nextSrc);

      hiddenVideo.classList.add("active");
      activeVideo.classList.remove("active");

      const oldActive = activeVideo;
      activeVideo = hiddenVideo;
      hiddenVideo = oldActive;

      currentIndex = nextIndex;

      attachEndedHandler();

      log("Now playing:", playlist[currentIndex]);

    } catch (err) {
      console.error("[Garden Lilith] Switch scene error:", err);
    } finally {
      isSwitching = false;
    }
  };
}


/* ---------- MULTI-LAYER MUSIC ---------- */

const layerSacral = document.getElementById("layerSacral");
const layerNight  = document.getElementById("layerNight");
const layerBell   = document.getElementById("layerBell");
const musicToggle = document.getElementById("musicToggle");

let musicStarted = false;
let bellTimer = null;

function randomBellDelay() {
  // колокольчик появляется примерно раз в 18–34 секунды
  return Math.floor(Math.random() * (34000 - 18000 + 1)) + 18000;
}

function scheduleBell() {
  if (!musicStarted || !layerBell) return;

  clearTimeout(bellTimer);

  bellTimer = setTimeout(async () => {
    if (!musicStarted || !layerBell) return;

    try {
      layerBell.currentTime = 0;
      await layerBell.play();
    } catch (err) {
      console.error("[Garden Lilith] Bell play error:", err);
    }

    scheduleBell();
  }, randomBellDelay());
}

async function startGardenMusic() {
  if (!layerSacral || !layerNight || !layerBell || !musicToggle) return;

  try {
    layerSacral.volume = 0.10;
    layerNight.volume  = 0.40;
    layerBell.volume   = 0.15;

    await layerSacral.play();
    await layerNight.play();

    musicStarted = true;
    musicToggle.textContent = "Music Off";

    scheduleBell();

  } catch (err) {
    console.error("[Garden Lilith] Music start error:", err);
  }
}

function stopGardenMusic() {
  if (!layerSacral || !layerNight || !layerBell || !musicToggle) return;

  musicStarted = false;
  clearTimeout(bellTimer);

  layerSacral.pause();
  layerNight.pause();
  layerBell.pause();

  layerSacral.currentTime = 0;
  layerNight.currentTime = 0;
  layerBell.currentTime = 0;

  musicToggle.textContent = "Music";
}

if (musicToggle) {
  musicToggle.addEventListener("click", async () => {
    if (!musicStarted) {
      await startGardenMusic();
    } else {
      stopGardenMusic();
    }
  });
}


/* ---------- START ---------- */

setupVideo(videoA);
setupVideo(videoB);
startInitialScene();
