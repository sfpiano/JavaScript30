let tPlaying = false;
const tPlayer = document.querySelector('.player');
const tVideo = document.querySelector('.player__video.viewer');
const tPlay = document.querySelector('.player__button.toggle');
const tVolume = document.querySelectorAll('.player__slider')[0];
const tSpeed = document.querySelectorAll('.player__slider')[1];

//---------------------------------------------------------------
tPlay.addEventListener('click', e => {
  tPlaying = !tPlaying;
  if (tPlaying) {
    tVideo.play();
    tPlay.textContent = '||';
  }
  else {
    tVideo.pause();
    tPlay.textContent = '►';
  }
});

//---------------------------------------------------------------
function updateVolume() {
  tVideo.volume = tVolume.value;
}

let tVolDrag = false;
tVolume.addEventListener('mousedown', () => { tVolDrag = true; });
tVolume.addEventListener('mouseup', () => { tVolDrag = false; });
tVolume.addEventListener('change', updateVolume);
tVolume.addEventListener('mousemove', () => {if (tVolDrag) updateVolume(); });

//---------------------------------------------------------------
function updateSpeed() {
  tVideo.playbackRate = tSpeed.value;
}

let tSpeedDrag = false;
tSpeed.addEventListener('mousedown', () => { tSpeedDrag = true; });
tSpeed.addEventListener('mouseup', () => { tSpeedDrag = false; });
tSpeed.addEventListener('change', updateSpeed);
tSpeed.addEventListener('mousemove', () => {if (tSpeedDrag) updateSpeed(); });

//---------------------------------------------------------------
function skip() {
  tVideo.currentTime += parseFloat(this.dataset.skip);
}
const tSeeks = tPlayer.querySelectorAll('[data-skip]');
tSeeks.forEach(seek => seek.addEventListener('click', skip));

//---------------------------------------------------------------
const tProgressBar = tPlayer.querySelector('.progress__filled');
function updateBar() {
  const tProgress = tVideo.currentTime / tVideo.duration;
  tProgressBar.style.flexBasis = parseFloat(tProgress*100) + '%';
}

window.setInterval(updateBar, 500);

//---------------------------------------------------------------
const tBar = tPlayer.querySelector('.progress');
let tDragBar = false;
tBar.addEventListener('mousedown', () => tDragBar = true);
tBar.addEventListener('mouseup', () => tDragBar = false);
tBar.addEventListener('mousemove', e => {
  if (tDragBar) {
    var tDelta = (e.layerX / tBar.offsetWidth);
    tVideo.currentTime = tDelta * tVideo.duration;
  }
});
