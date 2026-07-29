/**
 * musica.js
 * Música de fondo. Nunca se reproduce sola: solo arranca tras el primer
 * toque del usuario (requisito del brief y también de las políticas de
 * autoplay de los navegadores móviles). Botón fijo, discreto, esquina
 * inferior derecha.
 */

let audio;
let boton;

export function inicializarMusica() {
  audio = document.getElementById("bg-music");
  boton = document.getElementById("music-toggle");

  boton.addEventListener("click", alternarReproduccion);
}

/**
 * Se llama desde intro.js en el primer toque: intenta reproducir la
 * música automáticamente y revela el botón de control.
 */
export function activarMusicaTrasPrimerToque() {
  boton.classList.add("is-visible");

  audio.volume = 0.55;
  audio.play().then(marcarComoReproduciendo).catch(() => {
    // Algunos navegadores igual bloquean el autoplay incluso tras un toque
    // si el audio no se originó exactamente en el mismo gesto; el botón
    // queda visible para que el usuario lo active manualmente.
    marcarComoPausado();
  });
}

function alternarReproduccion() {
  if (audio.paused) {
    audio.play().then(marcarComoReproduciendo);
  } else {
    audio.pause();
    marcarComoPausado();
  }
}

function marcarComoReproduciendo() {
  boton.classList.add("is-playing");
  boton.setAttribute("aria-pressed", "true");
  boton.setAttribute("aria-label", "Pausar música");
}

function marcarComoPausado() {
  boton.classList.remove("is-playing");
  boton.setAttribute("aria-pressed", "false");
  boton.setAttribute("aria-label", "Reproducir música");
}
