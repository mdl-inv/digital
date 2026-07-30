/**
 * historia.js
 * "Nuestra historia" es la sección más narrativa: nada aparece de golpe,
 * cada bloque (año, fotografía, texto) entra en su propio momento.
 */

import { gsap, EASE_SOFT } from "../utils/animaciones.js";

export function inicializarHistoria() {
  const contenedor = document.getElementById("historia-timeline");
  const items = document.querySelectorAll("#historia-timeline .historia__item");

  // La línea azul vertical se dibuja progresivamente junto con el scroll,
  // como un hilo que va conectando cada momento de la historia.
  const lineaPath = document.querySelector(".historia__linea path");
  if (lineaPath && contenedor) {
    const longitud = lineaPath.getTotalLength();
    gsap.set(lineaPath, {
      strokeDasharray: longitud,
      strokeDashoffset: longitud,
    });
    gsap.to(lineaPath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: contenedor,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    });
  }

  items.forEach((item) => {
    const year = item.querySelector(".historia__year");
    const texto = item.querySelector(".text-body");

    gsap.set(year, { opacity: 0, x: -16 });
    gsap.set(texto, { opacity: 0, y: 16 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play reverse play reverse",
      },
    })
      .to(year, { opacity: 1, x: 0, duration: 0.6, ease: EASE_SOFT })
      .to(texto, { opacity: 1, y: 0, duration: 0.7, ease: EASE_SOFT }, "-=0.2");
  });
}
