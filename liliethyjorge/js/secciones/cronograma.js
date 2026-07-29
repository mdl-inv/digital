/**
 * cronograma.js
 * Revela cada renglón del cronograma en cascada, con la hora apareciendo
 * ligeramente antes que la actividad para que se lea como una lista viva.
 */

import { gsap, EASE_SOFT } from "../utils/animaciones.js";

export function inicializarCronograma() {
  const lista = document.getElementById("cronograma-lista");
  if (!lista) return;

  const items = lista.querySelectorAll(".cronograma__item");

  gsap.set(items, { opacity: 0, x: -18 });

  gsap.to(items, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: EASE_SOFT,
    scrollTrigger: {
      trigger: lista,
      start: "top 80%",
      once: true,
    },
  });
}
