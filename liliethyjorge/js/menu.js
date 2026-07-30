/**
 * menu.js
 * Barra superior fija con ícono que abre un drawer de pantalla completa.
 * La barra se oculta al hacer scroll hacia abajo y reaparece al subir.
 * El drawer se anima con GSAP (fade + stagger de los items), no solo CSS,
 * para que la apertura se sienta premium.
 */

import { gsap, EASE_SIGNATURE } from "./utils/animaciones.js";
import { observarSecciones } from "./utils/lazyload.js";
import { irASeccion, obtenerLenis } from "./lenis-setup.js";

const UMBRAL_OCULTAR = 80; // px de scroll antes de empezar a ocultar la barra

export function inicializarMenu() {
  const menu = document.getElementById("menu");
  const barra = menu.querySelector(".menu__bar");
  const toggle = document.getElementById("menu-toggle");
  const drawer = document.getElementById("menu-drawer");
  const items = menu.querySelectorAll(".menu__item");

  let abierto = false;
  let ultimoScroll = 0;

  gsap.set(drawer, { autoAlpha: 0 });
  gsap.set(items, { opacity: 0, y: 14 });

  function abrirDrawer() {
    abierto = true;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú");

    gsap.to(drawer, { autoAlpha: 1, duration: 0.5, ease: EASE_SIGNATURE });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      delay: 0.1,
      ease: EASE_SIGNATURE,
    });
  }

  function cerrarDrawer() {
    abierto = false;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");

    gsap.to(items, { opacity: 0, y: 10, duration: 0.25, ease: "power1.in" });
    gsap.to(drawer, {
      autoAlpha: 0,
      duration: 0.35,
      delay: 0.1,
      ease: EASE_SIGNATURE,
    });
  }

  toggle.addEventListener("click", () => {
    if (abierto) cerrarDrawer();
    else abrirDrawer();
  });

  items.forEach((item) => {
    item.addEventListener("click", (evento) => {
      evento.preventDefault();
      cerrarDrawer();
      irASeccion(item.dataset.menuTarget);
    });
  });

  // Tocar el fondo del drawer (fuera de los enlaces) también lo cierra.
  drawer.addEventListener("click", (evento) => {
    if (evento.target === drawer) cerrarDrawer();
  });

  // Resalta la sección visible actual dentro de la lista del drawer.
  observarSecciones((idSeccionVisible) => {
    items.forEach((item) => {
      item.classList.toggle(
        "is-active",
        item.dataset.menuTarget === idSeccionVisible
      );
    });
  });

  // Ocultar/mostrar la barra según la dirección del scroll.
  const lenis = obtenerLenis();
  if (lenis) {
    lenis.on("scroll", ({ scroll }) => {
      barra.classList.toggle("has-scrolled", scroll > 10);

      if (abierto) return; // nunca ocultar mientras el drawer está abierto

      const bajando = scroll > ultimoScroll;
      const pasoElUmbral = scroll > UMBRAL_OCULTAR;

      if (bajando && pasoElUmbral) {
        menu.classList.add("is-hidden");
      } else {
        menu.classList.remove("is-hidden");
      }

      ultimoScroll = scroll;
    });
  }

  // Cerrar con Escape por accesibilidad.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && abierto) cerrarDrawer();
  });
}

export function mostrarMenu() {
  document.getElementById("menu").classList.add("is-visible");
}
