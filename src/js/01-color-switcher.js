const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startColorSwitcher() {
  intervalId = setInterval(changeBodyColor, 1000);
  startBtn.disabled = true; // Desactivamos el botón "Start" mientras se ejecuta el cambio de color
}

function stopColorSwitcher() {
  clearInterval(intervalId);
  startBtn.disabled = false; // Habilitamos el botón "Start" al detener el cambio de color
}

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);
