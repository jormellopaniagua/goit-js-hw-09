// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let countdownInterval = null;

// Configuración de flatpickr
const options = {
  enableTime: true, //Esta opción indica que se habilitará la selección de hora además de la fecha.
  time_24hr: true, // Esta opción establece el formato de hora en 24 horas, es decir, de 0 a 23 horas.
  minuteIncrement: 1, //Esta opción define el incremento en minutos al seleccionar la hora. En este caso, se ha establecido en 1 minuto, lo que significa que el usuario podrá seleccionar minutos de 1 en 1.
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  } /*Esta opción establece una función que se ejecutará cuando se cierre el selector de fecha.
   Recibe como argumento un array selectedDates que contiene las fechas seleccionadas por el usuario. 
   En este caso, la función compara la primera fecha seleccionada (selectedDates[0]) 
   con la fecha actual (new Date()). 
   Si la fecha seleccionada es anterior a la fecha actual, 
   se muestra una alerta indicando que se debe elegir una fecha en el futuro,
    y se deshabilita el botón "Start" para evitar que el usuario inicie el temporizador con una fecha pasada.
     De lo contrario, se habilita el botón "Start".*/,
};

flatpickr(datetimePicker, options);

// Función para iniciar el temporizador
function startTimer() {
  const endDate = new Date(datetimePicker.value).getTime();

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(distance);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

// Función para detener el temporizador
function stopTimer() {
  clearInterval(countdownInterval);
}

// Función para convertir milisegundos en días, horas, minutos y segundos
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Función para actualizar el temporizador en la interfaz
function updateTimer(days, hours, minutes, seconds) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

// Función para agregar un cero delante de los números menores de 10
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Event listeners para iniciar y detener el temporizador
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
