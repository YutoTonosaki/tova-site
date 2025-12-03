// YouTube IFrame API
let player;
let isPlaying = false;
const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk"; // Lofi Girl - lofi hip hop radio

// 1. Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      'playsinline': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'rel': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  const btn = document.getElementById("music-toggle-btn");
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-play"></i> Play Music';
  }
}

// 4. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
  // You can handle state changes here if needed
}

// 5. Toggle Music Function (Exposed to Global)
window.toggleMusic = function () {
  const btn = document.getElementById("music-toggle-btn");
  if (!player || !btn) return;

  if (isPlaying) {
    player.pauseVideo();
    isPlaying = false;
    btn.innerHTML = '<i class="fa-solid fa-play"></i> Play Music';
    btn.classList.remove("playing");
  } else {
    player.playVideo();
    isPlaying = true;
    btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Music';
    btn.classList.add("playing");
  }
};
