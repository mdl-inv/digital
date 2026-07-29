/**
 * historia.js
 * "Nuestra historia" es la sección más narrativa: nada aparece de golpe,
 * cada bloque (año, fotografía, texto) entra en su propio momento.
 */

import { gsap, EASE_SOFT } from "../utils/animaciones.js";

export function inicializarHistoria() {
  const items = document.querySelectorAll("#historia-timeline .historia__item");

  items.forEach((item) => {
    const year = item.querySelector(".historia__year");
    const texto = item.querySelector(".text-body");

    gsap.set(year, { opacity: 0, x: -16 });
    gsap.set(texto, { opacity: 0, y: 16 });

    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 75%",
        once: true,
      },
    })
      .to(year, { opacity: 1, x: 0, duration: 0.6, ease: EASE_SOFT })
      .to(texto, { opacity: 1, y: 0, duration: 0.7, ease: EASE_SOFT }, "-=0.2");
  });
}
