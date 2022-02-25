const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreen = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

// Global Initialization of timeout
let controlsTimeOut = null;
let controlsMovementTimeOut = null;
// Synchronizing volume value with pug file
let previousVolumeValue = 0.5;
video.volume = previousVolumeValue;

const handlePlayBtnClick = (event) => {
  // if hte video is playing, pause it Else play the video
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "▶️" : "⏸";
};

const handleMute = (event) => {
  video.muted = video.muted ? false : true;
  muteBtn.innerText = video.muted ? "🔇" : "🔊";
  volumeRange.value = video.muted ? 0 : previousVolumeValue;
  video.volume = video.muted ? 0 : previousVolumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  video.muted = value == 0 ? true : false;
  video.volume = value;
  previousVolumeValue = value == 0 ? 0.5 : value;
  muteBtn.innerText = video.muted ? "🔇" : "🔊";
};

const formatTime = (time) =>
  new Date(Math.floor(time) * 1000).toISOString().substring(14, 19);

const handleLoadedData = (event) => {
  totalTime.innerText = formatTime(video.duration);
  timeline.max = video.duration;
};

const handleTimeUpdate = (event) => {
  currentTime.innerText = formatTime(video.currentTime);
  timeline.value = video.currentTime;
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = event.target.value;
};

const handleFullScreen = (event) => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreen.innerText = "⎚";
  } else {
    videoContainer.requestFullscreen();
    fullScreen.innerText = "❌";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMousemove = (event) => {
  if (controlsTimeOut) {
    clearTimeout(controlsTimeOut);
    controlsTimeOut = null;
  }
  if (controlsMovementTimeOut) {
    clearTimeout(controlsMovementTimeOut);
    controlsMovementTimeOut = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeOut = setTimeout(hideControls, 3000);
};

const handleMouseleave = (event) => {
  controlsTimeOut = setTimeout(hideControls, 3000);
};

const handleVideoEnded = (event) => {
  const { videoid } = videoContainer.dataset;
  fetch(`/api/videos/${videoid}/view`, {
    method: "POST",
  });
  playBtn.innerText = "▶️";
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayBtnClick);
timeline.addEventListener("input", handleTimelineChange);
fullScreen.addEventListener("click", handleFullScreen);
video.addEventListener("mousemove", handleMousemove);
video.addEventListener("mouseleave", handleMouseleave);
video.addEventListener("ended", handleVideoEnded);
