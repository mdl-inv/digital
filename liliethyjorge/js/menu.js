/**
 * menu.js
 * Menú fijo minimalista. Se revela después de la intro, resalta la
 * sección activa según el scroll y desplaza suavemente vía Lenis.
 */

import { observarSecciones } from "./utils/lazyload.js";
import { irASeccion } from "./lenis-setup.js";

export function inicializarMenu() {
  const menu = document.getElementById("menu");
  const items = menu.querySelectorAll("[data-menu-target]");

  items.forEach((item) => {
    item.addEventListener("click", (evento) => {
      evento.preventDefault();
      irASeccion(item.dataset.menuTarget);
    });
  });

  observarSecciones((idSeccionVisible) => {
    items.forEach((item) => {
      item.classList.toggle(
        "is-active",
        item.dataset.menuTarget === idSeccionVisible
      );
    });

    // Centra el item activo dentro del track horizontal del menú.
    const activo = menu.querySelector(".menu__item.is-active");
    if (activo) {
      const track = document.getElementById("menu-track");
      const offset =
        activo.offsetLeft - track.clientWidth / 2 + activo.clientWidth / 2;
      track.scrollTo({ left: offset, behavior: "smooth" });
    }
  });
}

export function mostrarMenu() {
  document.getElementById("menu").classList.add("is-visible");
}
