const btnPlay = document.querySelector('.playButton');
const player = document.querySelector('.videoPlayer');

btnPlay.onclick = function () {
    player.play();
    btnPlay.style.display = "none";
    player.controls = "control";
};
player.onclick = function () {
    player.pause()
    btnPlay.style.display = "block";
    player.controls = "";
};
