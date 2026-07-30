/**
 * mapa.js
 * El iframe del mapa ya usa loading="lazy" nativo. Aquí solo se agrega
 * el efecto de entrada del marco para que no aparezca de golpe.
 */

import { gsap, EASE_SOFT } from "../utils/animaciones.js";

export function inicializarMapa() {
  const marco = document.querySelector(".mapa__frame");
  if (!marco) return;

  gsap.set(marco, { opacity: 0, y: 20 });

  gsap.to(marco, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: EASE_SOFT,
    scrollTrigger: {
      trigger: marco,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    },
  });
}
