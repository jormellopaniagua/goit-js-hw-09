import Notiflix from 'notiflix';

// Obtener referencia al formulario
const form = document.querySelector('.form');

// Función para manejar el envío del formulario
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario

  // Obtener los valores introducidos por el usuario
  const delay = parseInt(this.querySelector('input[name="delay"]').value);
  const step = parseInt(this.querySelector('input[name="step"]').value);
  const amount = parseInt(this.querySelector('input[name="amount"]').value);

  // Llamar a la función createPromise según la cantidad especificada
  for (let i = 0; i < amount; i++) {
    // Calcular el retraso para cada promesa teniendo en cuenta el paso
    const promiseDelay = delay + i * step;

    // Llamar a la función createPromise con la posición y el retraso calculados
    createPromise(i + 1, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

// Función createPromise completada
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; // Probabilidad de resolver la promesa

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Resolver la promesa
      } else {
        reject({ position, delay }); // Rechazar la promesa
      }
    }, delay); // Retraso en milisegundos
  });
}
