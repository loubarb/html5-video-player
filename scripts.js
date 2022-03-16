// 1- Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// 2- Build out functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip() {
  // this.dataset.skip grabs whichever data-skip value corresponds to button
  // currentTime tells player to skip at whatever time video is curently at
  // += when it's a number + string = concatenation
  // parseFloat converts string into true number
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // console.log(this.value);
  // console.log(this.name);
  video[this.name] = this.value;
}

function handleProgressUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  // offsetX = pixel location of click location inside bar
  // progress.offsetWidth = pixel width of bar - X & Width divided give a percent
  // multiply by video duration to make number for time
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  // console.log(e);
}


// 3- Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgressUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
// checks mousedown variable - if true, it moves on to scrub(e)
// if mousedown variable is false, it returns or stops there
progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
