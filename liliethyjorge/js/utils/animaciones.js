/**
 * animaciones.js
 * Helpers de animación reutilizables sobre GSAP.
 * Centraliza los patrones de easing y timing para mantener consistencia
 * visual en toda la invitación.
 */

import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export const EASE_SIGNATURE = "cubic-bezier(0.22, 1, 0.36, 1)";
export const EASE_SOFT = "cubic-bezier(0.16, 0.84, 0.44, 1)";

/**
 * Divide un elemento de texto en spans por caracter, preservando espacios.
 * Se usa para animaciones de "texto letra por letra".
 */
export function dividirEnCaracteres(elemento) {
  const texto = elemento.textContent;
  elemento.textContent = "";
  const spans = [];

  texto.split("").forEach((caracter) => {
    const span = document.createElement("span");
    span.className = "split-char";
    span.textContent = caracter === " " ? "\u00A0" : caracter;
    elemento.appendChild(span);
    spans.push(span);
  });

  return spans;
}

/**
 * Anima un elemento de título letra por letra al entrar en viewport.
 */
export function animarTextoLetraPorLetra(elemento, opciones = {}) {
  const spans = dividirEnCaracteres(elemento);

  gsap.set(spans, { yPercent: 110, opacity: 0 });

  return gsap.to(spans, {
    yPercent: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.025,
    ease: EASE_SIGNATURE,
    scrollTrigger: {
      trigger: elemento,
      start: "top 85%",
      once: true,
    },
    ...opciones,
  });
}

/**
 * Revela un contenedor de imagen mediante una máscara (clip-path) que se abre,
 * en vez de un simple fade — sensación más editorial.
 */
export function revelarConMascara(elemento) {
  const img = elemento.querySelector("img");

  gsap.set(elemento, { clipPath: "inset(0 0 100% 0)" });
  gsap.set(img, { scale: 1.15 });

  return gsap.timeline({
    scrollTrigger: {
      trigger: elemento,
      start: "top 80%",
      once: true,
    },
  })
    .to(elemento, {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.1,
      ease: EASE_SIGNATURE,
    })
    .to(img, {
      scale: 1,
      duration: 1.4,
      ease: EASE_SOFT,
    }, "-=0.9");
}

/**
 * Fade + desplazamiento vertical sutil al entrar en viewport.
 * Uso general para párrafos, tarjetas y bloques de texto.
 */
export function revelarFadeUp(elemento, opciones = {}) {
  gsap.set(elemento, { y: 28, opacity: 0 });

  return gsap.to(elemento, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: EASE_SOFT,
    scrollTrigger: {
      trigger: elemento,
      start: "top 85%",
      once: true,
    },
    ...opciones,
  });
}

/**
 * Anima un <path> SVG como una línea que se dibuja al hacer scroll.
 */
export function dibujarLinea(path, opciones = {}) {
  const longitud = path.getTotalLength();

  gsap.set(path, {
    strokeDasharray: longitud,
    strokeDashoffset: longitud,
  });

  return gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.6,
    ease: EASE_SIGNATURE,
    scrollTrigger: {
      trigger: path,
      start: "top 80%",
      once: true,
    },
    ...opciones,
  });
}

/**
 * Aplica revelarFadeUp y revelarConMascara automáticamente a todos los
 * elementos con [data-reveal] dentro de un contenedor dado.
 */
export function inicializarRevelados(contenedor = document) {
  contenedor.querySelectorAll('[data-reveal="fade-up"]').forEach((el) => revelarFadeUp(el));
  contenedor.querySelectorAll('[data-reveal="mask"]').forEach((el) => revelarConMascara(el));
  contenedor.querySelectorAll('[data-split="chars"]').forEach((el) => animarTextoLetraPorLetra(el));
}

export { gsap, ScrollTrigger };
