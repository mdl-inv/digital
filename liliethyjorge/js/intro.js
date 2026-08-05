/**
 * intro.js
 * Pantalla inicial en blanco, totalmente tocable (sin botón "comenzar").
 * Apenas carga, el logotipo real se dibuja a sí mismo (trazo + relleno)
 * y luego aparece el texto "toca para continuar". Al tocar, el logo y el
 * hint se desvanecen mientras los paneles se separan hacia los costados
 * revelando el contenido. Toda la secuencia de cierre dura ~2 segundos.
 */

import { gsap, EASE_SIGNATURE, EASE_SOFT, dibujarLogo } from "./utils/animaciones.js";

const DURACION_CIERRE = 2; // segundos, según el brief

export function inicializarIntro({ onFinalizar, onPrimerToque } = {}) {
  const intro = document.getElementById("intro");
  const paneles = intro.querySelectorAll("[data-panel]");
  const hint = intro.querySelector(".intro__hint");
  const monogram = intro.querySelector(".intro__monogram");
  const trazos = intro.querySelectorAll(".intro__logo-trazo");
  const pathRelleno = document.getElementById("intro-logo-relleno");

  let yaActivado = false;

  // 1. El logo se va "escribiendo" trazo por trazo apenas se muestra la pantalla.
  dibujarLogo(trazos, pathRelleno, {
    onComplete: () => {
      gsap.to(hint, { opacity: 1, duration: 0.8, ease: EASE_SOFT });
    },
  });

  function reproducirCierre(evento) {
    if (yaActivado) return;
    yaActivado = true;

    // Evita que el navegador interprete el toque/arrastre inicial como un
    // gesto nativo de "pull-to-refresh", que recargaba la página.
    if (evento && evento.cancelable) evento.preventDefault();

    intro.classList.add("is-closing");
    intro.classList.add("is-splitting");
    if (typeof onPrimerToque === "function") onPrimerToque();

    const tl = gsap.timeline({
      defaults: { ease: EASE_SIGNATURE },
      onComplete: () => {
        intro.remove();
        document.body.classList.remove("intro-active");
        if (typeof onFinalizar === "function") onFinalizar();
      },
    });

    tl.to(hint, { opacity: 0, duration: 0.3 }, 0);

    // El logo ya formado se retira con un desvanecimiento y un leve
    // escalado, como si terminara de "cobrar vida" y diera paso al resto.
    tl.to(
      monogram,
      { opacity: 0, scale: 0.94, duration: 0.7 },
      0.05
    );

    // Los paneles se separan hacia los costados, revelando el contenido detrás.
    tl.to(paneles[0], { xPercent: -100, duration: 1.1 }, 0.15).to(
      paneles[1],
      { xPercent: 100, duration: 1.1 },
      0.15
    );

    tl.to(intro, { opacity: 0, duration: 0.4 }, ">-0.3");

    // Aseguramos que la duración total ronde los 2 segundos del brief.
    tl.duration(DURACION_CIERRE);
  }

  intro.addEventListener("pointerdown", reproducirCierre, { once: true });
}
