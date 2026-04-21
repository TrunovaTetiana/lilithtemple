/* =================================================
   Garden Lilith — room6 / app.js
   Простая и надёжная версия
   ================================================= */

const playlist = [
  "assets/video/01_calm_garden.mp4",
  "assets/video/01_calm_garden.mp4",

  "assets/video/03_light_mist.mp4",
  "assets/video/04_strong_mist.mp4",

  "assets/video/01_calm_garden.mp4",

  "assets/video/05_arch.mp4",

  "assets/video/01_calm_garden.mp4",

  "assets/video/06_fire.mp4",

  "assets/video/01_calm_garden.mp4",

  "assets/video/07_snake.mp4",

  "assets/video/01_calm_garden.mp4",

  "assets/video/08_lilith_intro.mp4",
  "assets/video/09_lilith_reveal.mp4",
  "assets/video/10_lilith_presence.mp4",

  "assets/video/01_calm_garden.mp4"
];

const PLAYBACK_RATE = 0.90;
const DEBUG = true;

const videoA = document.getElementById("videoA");
const videoB = document.getElementById("videoB");

const layerSacral = document.getElementById("layerSacral");
const layerNight  = document.getElementById("layerNight");
const layerBell   = document.getElementById("layerBell");
const musicToggle = document.getElementById("musicToggle");

let currentIndex = 0;
let activeVideo = videoA;
let hiddenVideo = videoB;
let isSwitching = false;

function log(...args){
  if (DEBUG) console.log("[Garden Lilith]", ...args);
}

function setupVideo(video){
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.playbackRate = PLAYBACK_RATE;
}

function clearVideo(video){
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
      reject(new Error("Не удалось загрузить видео: " + src));
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
    console.error("Ошибка старта первой сцены:", err);
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
      console.error("Ошибка переключения сцены:", err);
    } finally {
      isSwitching = false;
    }
  };
}


/* ---------- MULTI-LAYER MUSIC ---------- */
let musicStarted = false;
let bellTimer = null;

function randomBellDelay() {
  // колокольчик будет появляться примерно раз в 18–34 секунды
  return Math.floor(Math.random() * (34000 - 18000 + 1)) + 18000;
}

function scheduleBell() {
  if (!musicStarted) return;

  clearTimeout(bellTimer);

  bellTimer = setTimeout(async () => {
    if (!musicStarted) return;

    try {
      layerBell.currentTime = 0;
      await layerBell.play();
    } catch (err) {
      console.error("Bell play error:", err);
    }

    scheduleBell();
  }, randomBellDelay());
}

async function startGardenMusic() {
  try {
    /* громкости */
    layerSacral.volume = 0.10;  // сакральный слой
    layerNight.volume  = 0.40;  // ночной слой
    layerBell.volume   = 0.15;  // редкий акцент

    /* старт двух постоянных слоёв */
    await layerSacral.play();
    await layerNight.play();

    musicStarted = true;
    musicToggle.textContent = "Music Off";

    scheduleBell();

  } catch (err) {
    console.error("Не удалось запустить многослойный звук:", err);
  }
}

function stopGardenMusic() {
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
