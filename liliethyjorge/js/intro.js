/**
 * intro.js
 * Pantalla inicial en blanco, totalmente tocable (sin botón "comenzar").
 * Al primer toque, los fragmentos del monograma y los paneles laterales
 * se separan/reacomodan como si la experiencia estuviera ensamblándose,
 * y de ahí pasa automáticamente al contenido. Dura ~2 segundos.
 */

import { gsap, EASE_SIGNATURE } from "./utils/animaciones.js";

const DURACION_TOTAL = 2; // segundos, según el brief

export function inicializarIntro({ onFinalizar, onPrimerToque } = {}) {
  const intro = document.getElementById("intro");
  const fragmentos = intro.querySelectorAll("[data-fragment]");
  const paneles = intro.querySelectorAll("[data-panel]");
  const hint = intro.querySelector(".intro__hint");

  let yaActivado = false;

  function reproducirCierre() {
    if (yaActivado) return;
    yaActivado = true;

    intro.classList.add("is-closing");

    if (typeof onPrimerToque === "function") onPrimerToque();

    const tl = gsap.timeline({
      defaults: { ease: EASE_SIGNATURE },
      onComplete: () => {
        intro.remove();
        document.body.classList.remove("intro-active");
        if (typeof onFinalizar === "function") onFinalizar();
      },
    });

    tl.to(hint, { opacity: 0, duration: 0.25 }, 0);

    // Los fragmentos del monograma se separan levemente antes de disolverse,
    // dando la sensación de piezas que se sueltan (no un sobre que se abre).
    fragmentos.forEach((fragmento, i) => {
      const anguloX = (Math.random() - 0.5) * 220;
      const anguloY = (Math.random() - 0.5) * 220;
      tl.to(
        fragmento,
        {
          x: anguloX,
          y: anguloY,
          rotate: (Math.random() - 0.5) * 60,
          opacity: 0,
          duration: 0.9,
        },
        i * 0.04
      );
    });

    // Los paneles se separan hacia los costados, revelando el contenido detrás.
    tl.to(
      paneles[0],
      { xPercent: -100, duration: 1.1 },
      0.15
    ).to(
      paneles[1],
      { xPercent: 100, duration: 1.1 },
      0.15
    );

    tl.to(intro, { opacity: 0, duration: 0.4 }, ">-0.3");

    // Aseguramos que la duración total ronde los 2 segundos del brief.
    tl.duration(DURACION_TOTAL);
  }

  intro.addEventListener("pointerdown", reproducirCierre, { once: true });
}
