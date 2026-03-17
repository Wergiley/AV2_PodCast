const audio = document.getElementById("audio");
const cd = document.getElementById("cd");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const time = document.getElementById("time");
const wave = document.querySelectorAll(".wave span");
const iconPlay = document.getElementById("iconPlay");
const iconVolume = document.getElementById("iconVolume");

let lastVolume = 1; // guarda último volume

// ▶️ PLAY / PAUSE
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    cd.style.animationPlayState = "running";
    iconPlay.src = "img/pause.png";

    wave.forEach(bar => bar.style.animationPlayState = "running");
  } else {
    audio.pause();
    cd.style.animationPlayState = "paused";
    iconPlay.src = "img/play.png";

    wave.forEach(bar => bar.style.animationPlayState = "paused");
  }
}

// 📊 PROGRESSO AUTOMÁTICO
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  let percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;

  progress.style.background = `linear-gradient(to right, #1db954 ${percent}%, #555 ${percent}%)`;

  time.innerText = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

// 🎯 ARRASTAR PROGRESSO
progress.addEventListener("input", () => {
  let percent = progress.value;
  audio.currentTime = (percent / 100) * audio.duration;

  progress.style.background = `linear-gradient(to right, #00dcde ${percent}%, #555 ${percent}%)`;
});

// 🔊 CONTROLE DE VOLUME
volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);

  let percent = volume.value * 100;

  volume.style.background = `linear-gradient(to right, #00dcde ${percent}%, #555 ${percent}%)`;

  // troca ícone automaticamente
  if (audio.volume <= 0.01) {
    iconVolume.src = "img/mute.png";
  } else {
    iconVolume.src = "img/volume.png";
  }
});

// 🔇 CLICK NO ÍCONE (MUTE / UNMUTE)
iconVolume.addEventListener("click", () => {

  if (audio.volume > 0.01) {
    lastVolume = audio.volume;

    audio.volume = 0;
    volume.value = 0;

    iconVolume.src = "img/mute.png";
  } else {
    audio.volume = lastVolume || 1;
    volume.value = audio.volume;

    iconVolume.src = "img/volume.png";
  }

  // atualiza cor da barra
  let percent = volume.value * 100;
  volume.style.background = `linear-gradient(to right, #00dcde ${percent}%, #555 ${percent}%)`;
});

// ⏱️ FORMATAR TEMPO
function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";

  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}