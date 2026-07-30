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
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
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
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
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
      end: "bottom 15%",
      toggleActions: "play reverse play reverse",
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
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    },
    ...opciones,
  });
}

/**
 * Anima el logotipo real como si una pluma lo estuviera escribiendo:
 * varios trazos delgados (extraídos del esqueleto del logo, no del contorno
 * exterior) se dibujan en secuencia, uno tras otro, y al terminar el
 * relleno final (el logo pulido, con su peso y forma originales) aparece
 * por encima mientras los trazos se desvanecen.
 *
 * @param {SVGPathElement[]|NodeList} trazos - trazos finos, en el orden en que se "escriben"
 * @param {SVGPathElement} pathRelleno - el logo final, ya con relleno correcto
 */
export function dibujarLogo(trazos, pathRelleno, opciones = {}) {
  const listaTrazos = Array.from(trazos);
  const longitudes = listaTrazos.map((p) => p.getTotalLength());
  const longitudTotal = longitudes.reduce((a, b) => a + b, 0);

  listaTrazos.forEach((path, i) => {
    gsap.set(path, {
      strokeDasharray: longitudes[i],
      strokeDashoffset: longitudes[i],
    });
  });
  gsap.set(pathRelleno, { opacity: 0 });

  const DURACION_ESCRITURA = 2.6; // segundos totales repartidos entre trazos

  const tl = gsap.timeline(opciones);

  listaTrazos.forEach((path, i) => {
    const duracion = Math.max(
      0.09,
      (longitudes[i] / longitudTotal) * DURACION_ESCRITURA
    );
    tl.to(
      path,
      { strokeDashoffset: 0, duration: duracion, ease: "power1.inOut" },
      i === 0 ? 0 : ">-0.015" // ligera superposición, como no levantar del todo la pluma
    );
  });

  tl.to(listaTrazos, { opacity: 0, duration: 0.45, ease: EASE_SOFT }, "-=0.1")
    .to(pathRelleno, { opacity: 1, duration: 0.55, ease: EASE_SOFT }, "<");

  return tl;
}

/**
 * Aplica revelarFadeUp y revelarConMascara automáticamente a todos los
 * elementos con [data-reveal] dentro de un contenedor dado.
 */
export function inicializarRevelados(contenedor = document) {
  contenedor.querySelectorAll('[data-reveal="fade-up"]').forEach((el) => revelarFadeUp(el));
  contenedor.querySelectorAll('[data-reveal="mask"]').forEach((el) => revelarConMascara(el));
  contenedor.querySelectorAll('[data-split="chars"]').forEach((el) => animarTextoLetraPorLetra(el));

  // Línea azul que se dibuja bajo cada título de sección — mismo motivo
  // visual que la cuenta regresiva, repetido como firma de toda la
  // invitación (ver .escena__header .titulo-linea en el HTML).
  contenedor.querySelectorAll(".titulo-linea path").forEach((path) => dibujarLinea(path));
}

export { gsap, ScrollTrigger };
