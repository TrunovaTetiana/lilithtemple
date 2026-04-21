(function () {

  /* =========================================================
     🜏 READY
  ========================================================= */

  var body = document.body;

  function addReadyClass() {
    if (!body) return;

    if (body.classList) {
      body.classList.add("ready");
    } else {
      body.className += " ready";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addReadyClass);
  } else {
    addReadyClass();
  }


  /* =========================================================
     🎬 НАСТРОЙКИ
     👉 МЕНЯЙ ТОЛЬКО ЗДЕСЬ
  ========================================================= */

  var CONFIG = {

    /* скорость сцен
       1.0 = нормальная
       0.8 = медленнее
       1.2 = быстрее
    */
    speed: {
      scene1: 0.78,   // первая сцена чуть медленнее
      scene2: 1.00,
      scene3: 1.05,
      scene4: 1.00
    },

    /* громкость самих видео
       если хочешь убрать звук у сцены -> поставь 0.0
    */
    volume: {
      scene1: 0.00,
      scene2: 0.55,
      scene3: 0.45,
      scene4: 0.95
    },

    /* громкость loop-музыки по кнопке */
    ambientVolume: 0.35,

    /* длительность удержания сцен в кадре (в секундах) */
    duration: {
      scene1a: 8.5,   // первая длинная сцена
      scene2: 5.0,
      scene1b: 2.4,   // короткий возврат 1
      scene3: 5.0,
      scene1c: 2.2,   // короткий возврат 2
      scene4: 5.0
    },

    /* скорость fade между сценами */
    fadeDuration: 550
  };


  /* =========================================================
     🎬 ЭЛЕМЕНТЫ
  ========================================================= */

  var scene1 = document.getElementById("scene1");
  var scene2 = document.getElementById("scene2");
  var scene3 = document.getElementById("scene3");
  var scene4 = document.getElementById("scene4");

  var ambientAudio = document.getElementById("ambientAudio");
  var soundToggleBtn = document.getElementById("soundToggleBtn");


  /* =========================================================
     🎬 ПУТИ К ВИДЕО
     👉 ЕСЛИ ПОМЕНЯЕШЬ ИМЕНА ФАЙЛОВ, МЕНЯЙ ТОЛЬКО ЗДЕСЬ
  ========================================================= */

  scene1.src = "assets/video/01_scena_vxod.mp4";
  scene2.src = "assets/video/02_scena_sova_pantera.mp4";
  scene3.src = "assets/video/03_scena_sova.mp4";
  scene4.src = "assets/video/04_scena_pantera.mp4";


  /* =========================================================
     ⚙️ БАЗОВАЯ НАСТРОЙКА ВИДЕО
  ========================================================= */

  function setupVideo(video, speed, volume) {
    video.playbackRate = speed;
    video.volume = volume;
    video.muted = false;
    video.preload = "auto";
    video.playsInline = true;
    video.setAttribute("playsinline", "");
  }

  setupVideo(scene1, CONFIG.speed.scene1, CONFIG.volume.scene1);
  setupVideo(scene2, CONFIG.speed.scene2, CONFIG.volume.scene2);
  setupVideo(scene3, CONFIG.speed.scene3, CONFIG.volume.scene3);
  setupVideo(scene4, CONFIG.speed.scene4, CONFIG.volume.scene4);

  ambientAudio.volume = CONFIG.ambientVolume;


  /* =========================================================
     🎞 FADE
  ========================================================= */

  scene1.style.transitionDuration = CONFIG.fadeDuration + "ms";
  scene2.style.transitionDuration = CONFIG.fadeDuration + "ms";
  scene3.style.transitionDuration = CONFIG.fadeDuration + "ms";
  scene4.style.transitionDuration = CONFIG.fadeDuration + "ms";

  function show(video) {
    if (video.classList) {
      video.classList.add("active");
    }
  }

  function hide(video) {
    if (video.classList) {
      video.classList.remove("active");
      video.classList.remove("hold");
    }
  }

  function hold(video) {
    if (video.classList) {
      video.classList.add("active");
      video.classList.add("hold");
    }
  }


  /* =========================================================
     ⏱ УТИЛИТЫ
  ========================================================= */

  function wait(seconds) {
    return new Promise(function(resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  }

  async function safePlay(media) {
    try {
      await media.play();
      return true;
    } catch (e) {
      console.log("Play blocked or failed:", e);
      return false;
    }
  }

  function safePause(media) {
    try {
      media.pause();
    } catch (e) {}
  }

  function resetVideo(video) {
    safePause(video);
    try {
      video.currentTime = 0;
    } catch (e) {}
  }

  function primeVideos() {
    scene1.load();
    scene2.load();
    scene3.load();
    scene4.load();
  }


  /* =========================================================
     🔊 КНОПКА ЗВУКА
  ========================================================= */

  function setSoundButtonState(isOn) {
    if (!soundToggleBtn) return;

    if (isOn) {
      soundToggleBtn.textContent = "Sound: On";
      soundToggleBtn.setAttribute("aria-pressed", "true");

      if (soundToggleBtn.classList) {
        soundToggleBtn.classList.add("active");
      }
    } else {
      soundToggleBtn.textContent = "Sound: Off";
      soundToggleBtn.setAttribute("aria-pressed", "false");

      if (soundToggleBtn.classList) {
        soundToggleBtn.classList.remove("active");
      }
    }
  }

  async function toggleAmbientSound() {
    if (!ambientAudio) return;

    if (ambientAudio.paused) {
      ambientAudio.volume = CONFIG.ambientVolume;
      var played = await safePlay(ambientAudio);
      setSoundButtonState(played);
    } else {
      safePause(ambientAudio);
      setSoundButtonState(false);
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", function () {
      toggleAmbientSound();
    });
  }

  setSoundButtonState(false);


  /* =========================================================
     🎬 ПОКАЗ ОДНОЙ СЦЕНЫ
     video    = какое видео показать
     duration = сколько держать в кадре
     prev     = какое предыдущее скрыть после fade
  ========================================================= */

  async function playScene(video, duration, prev) {
    resetVideo(video);
    show(video);
    await safePlay(video);

    if (prev) {
      await wait(CONFIG.fadeDuration / 1000);
      hide(prev);
    }

    await wait(duration);
  }


  /* =========================================================
     🎬 ГЛАВНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ
  ========================================================= */

  async function playSequence() {

    primeVideos();

    /* СЦЕНА 1 */
    await playScene(scene1, CONFIG.duration.scene1a, null);

    /* СЦЕНА 2 */
    await playScene(scene2, CONFIG.duration.scene2, scene1);

    /* КОРОТКИЙ ВОЗВРАТ К СЦЕНЕ 1 */
    await playScene(scene1, CONFIG.duration.scene1b, scene2);

    /* СЦЕНА 3 */
    await playScene(scene3, CONFIG.duration.scene3, scene1);

    /* ЕЩЁ ОДИН ВОЗВРАТ К СЦЕНЕ 1 */
    await playScene(scene1, CONFIG.duration.scene1c, scene3);

    /* СЦЕНА 4 — ФИНАЛ */
    await playScene(scene4, CONFIG.duration.scene4, scene1);

    /* фиксируем финальный кадр */
    hold(scene4);
    safePause(scene4);
  }


  /* =========================================================
     🚀 АВТОСТАРТ ВИДЕО
     Видео идёт само, без кнопки
  ========================================================= */

  function boot() {
    playSequence();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
