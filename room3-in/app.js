const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');
const video3 = document.getElementById('video3');
const soundTrigger = document.getElementById('soundTrigger');

const videos = [video1, video2, video3];

const CROSSFADE_MS = 180;
const PRE_END_BUFFER = 0.22;

let soundUnlocked = false;

function tryPlay(video) {
  if (!video) return Promise.reject('No video element');

  video.muted = !soundUnlocked;

  return video.play().catch((error) => {
    console.log('Play failed:', error);

    video.muted = true;
    return video.play();
  });
}

function activateVideo(currentVideo, nextVideo) {
  if (!currentVideo || !nextVideo) return;

  nextVideo.currentTime = 0;

  tryPlay(nextVideo)
    .then(() => {
      nextVideo.classList.add('active');

      setTimeout(() => {
        currentVideo.pause();
        currentVideo.classList.remove('active');
      }, CROSSFADE_MS);
    })
    .catch((error) => {
      console.log('Next video failed to play:', error);
    });
}

function watchTransition(currentVideo, nextVideo, isLast = false) {
  if (!currentVideo) return;

  let switched = false;

  currentVideo.addEventListener('timeupdate', () => {
    if (switched) return;

    const remaining = currentVideo.duration - currentVideo.currentTime;

    if (!isNaN(remaining) && remaining <= PRE_END_BUFFER) {
      switched = true;

      if (isLast) return;

      activateVideo(currentVideo, nextVideo);
    }
  });

  currentVideo.addEventListener('ended', () => {
    if (isLast) {
      window.location.href = '../room4/index.html';
    }
  });
}

function unlockSound() {
  soundUnlocked = true;

  const activeVideo = videos.find((video) => video.classList.contains('active'));

  if (!activeVideo) return;

  activeVideo.muted = false;

  activeVideo.play()
    .then(() => {
      if (soundTrigger) {
        soundTrigger.classList.add('hidden');
      }
    })
    .catch((error) => {
      console.log('Sound unlock failed:', error);
    });
}

// Предзагрузка
videos.forEach((video) => {
  if (video) {
    video.load();
  }
});

// Переходы
watchTransition(video1, video2, false);
watchTransition(video2, video3, false);
watchTransition(video3, null, true);

// Кнопка звука
if (soundTrigger) {
  soundTrigger.addEventListener('click', unlockSound);
}

// Старт первого видео
if (video1) {
  tryPlay(video1).catch((error) => {
    console.log('First video failed to play:', error);
  });
}
