/**
 * galeria.js
 * La galería reutiliza revelarConMascara (definida en utils/animaciones.js)
 * a través del atributo [data-reveal="mask"] en el HTML, pero aquí se
 * agrega el efecto de profundidad: las imágenes de la fila ancha (cada
 * tercer elemento) se mueven a menor velocidad que el resto al hacer scroll,
 * dando una sensación de parallax discreto.
 */

import { gsap } from "../utils/animaciones.js";

export function inicializarGaleria() {
  const grid = document.querySelector(".galeria__grid");
  if (!grid) return;

  const anchas = grid.querySelectorAll(".media-frame:nth-child(3n) img");

  anchas.forEach((img) => {
    gsap.to(img, {
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: img.closest(".media-frame"),
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });
}
