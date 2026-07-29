/**
 * lenis-setup.js
 * Inicializa Lenis para smooth scroll y lo sincroniza con GSAP ScrollTrigger,
 * que es quien controla la mayoría de las animaciones de la invitación.
 */

import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.1.13/+esm";
import { gsap, ScrollTrigger } from "./utils/animaciones.js";

let lenis;

export function inicializarLenis() {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/**
 * Desplaza suavemente hasta un elemento del DOM (usado por el menú fijo).
 */
export function irASeccion(idSeccion) {
  const destino = document.getElementById(idSeccion);
  if (!destino || !lenis) return;
  lenis.scrollTo(destino, { offset: 0, duration: 1.2 });
}

export function obtenerLenis() {
  return lenis;
}
