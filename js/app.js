import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (event) => {
  event.preventDefault();
  // obtener datos del formulario
  const artista = document.querySelector('#artista').value;
  const song = document.querySelector('#song').value;

  if (artista === '' || song === '') {
    // el usuario deja los campos vacíos, mostrar error
    UI.divMensajes.innerHTML = 'Error! Todos los campos son obligatorios';
    UI.divMensajes.classList.add('error');
    setInterval(() => {
      UI.divMensajes.innerHTML = '';
      UI.divMensajes.classList.remove('error');
    }, 3000);
  } else {
    // el formulario esta completo, realizar consulta a la API
    const api = new API(artista, song);
    api.consultarAPI()
      .then(data => {
        if (data.respuesta.lyrics) {
          // la canción existe
          const letra = data.respuesta.lyrics;
          UI.divResultado.textContent = letra;
        } else {
          // canción no encontrada
          UI.divMensajes.innerHTML = 'Canción no encontrada, prueba con otra búsqueda!';
          UI.divMensajes.classList.add('error');
          setInterval(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
            UI.formularioBuscar.reset();
          }, 4000);
        }
      });
  }
});
