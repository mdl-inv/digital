/**
 * ceremonia.js
 * Anima las tarjetas de Ceremonia y Recepción: el ícono se dibuja primero,
 * después el texto entra con un fade suave. Ambas secciones comparten
 * la misma clase .evento-card, así que un solo módulo cubre las dos.
 */

import { gsap, EASE_SOFT } from "../utils/animaciones.js";

export function inicializarCeremonia() {
  document.querySelectorAll(".evento-card").forEach((tarjeta) => {
    const icono = tarjeta.querySelector(".evento-card__icono path, .evento-card__icono circle");
    const resto = tarjeta.querySelectorAll(".eyebrow, h2, p");

    gsap.set(resto, { opacity: 0, y: 14 });
    if (icono) gsap.set(icono, { opacity: 0, scale: 0.7, transformOrigin: "center" });

    gsap.timeline({
      scrollTrigger: {
        trigger: tarjeta,
        start: "top 75%",
        once: true,
      },
    })
      .to(icono, { opacity: 1, scale: 1, duration: 0.6, ease: EASE_SOFT })
      .to(resto, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: EASE_SOFT }, "-=0.3");
  });
}
