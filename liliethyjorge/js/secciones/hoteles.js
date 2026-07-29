/**
 * hoteles.js
 * La sección Hoteles no muestra la info directamente: cada botón abre
 * un popup con foto, descripción, dirección y accesos directos a
 * Google Maps, llamada telefónica y reserva.
 */

import { gsap, EASE_SIGNATURE } from "../utils/animaciones.js";

const DATOS_HOTELES = {
  "gran-plaza": {
    nombre: "Gran Plaza Durango",
    imagen: "assets/images/hotel-gran-plaza.webp",
    direccion: "Blvd. Francisco Villa 555, Durango, Dgo.",
    descripcion:
      "A 10 minutos del lugar de la recepción. Cuenta con tarifa preferencial para invitados de la boda mencionando el código LILIJORGE.",
    telefono: "+526181234567",
    mapa: "https://maps.google.com/?q=Gran+Plaza+Durango",
    reserva: "https://ejemplo-reservas.com/gran-plaza",
  },
  "hacienda-suites": {
    nombre: "Hacienda Suites",
    imagen: "assets/images/hotel-hacienda-suites.webp",
    direccion: "Camino Real 210, Durango, Dgo.",
    descripcion:
      "Habitaciones amplias tipo suite, ideales para familias. A 15 minutos de la recepción.",
    telefono: "+526181234568",
    mapa: "https://maps.google.com/?q=Hacienda+Suites+Durango",
    reserva: "https://ejemplo-reservas.com/hacienda-suites",
  },
  "posada-real": {
    nombre: "Posada Real",
    imagen: "assets/images/hotel-posada-real.webp",
    direccion: "Av. 20 de Noviembre 88, Durango, Dgo.",
    descripcion:
      "Opción económica y céntrica, a 20 minutos de la recepción con servicio de transporte disponible.",
    telefono: "+526181234569",
    mapa: "https://maps.google.com/?q=Posada+Real+Durango",
    reserva: "https://ejemplo-reservas.com/posada-real",
  },
};

export function inicializarHoteles() {
  const overlay = document.getElementById("popup-overlay");
  const popup = document.getElementById("popup-hotel");
  const triggers = document.querySelectorAll(".hotel-trigger");
  const cerrarBtns = document.querySelectorAll("[data-popup-close]");

  const campos = {
    imagen: document.getElementById("popup-imagen"),
    nombre: document.getElementById("popup-nombre"),
    direccion: document.getElementById("popup-direccion"),
    descripcion: document.getElementById("popup-descripcion"),
    mapa: document.getElementById("popup-mapa"),
    llamar: document.getElementById("popup-llamar"),
    reservar: document.getElementById("popup-reservar"),
  };

  function abrirPopup(idHotel) {
    const datos = DATOS_HOTELES[idHotel];
    if (!datos) return;

    campos.imagen.src = datos.imagen;
    campos.imagen.alt = datos.nombre;
    campos.nombre.textContent = datos.nombre;
    campos.direccion.textContent = datos.direccion;
    campos.descripcion.textContent = datos.descripcion;
    campos.mapa.href = datos.mapa;
    campos.llamar.href = `tel:${datos.telefono}`;
    campos.reservar.href = datos.reserva;

    document.body.style.overflow = "hidden";
    overlay.classList.add("is-open");
    popup.classList.add("is-open");

    gsap.fromTo(
      popup,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.6, ease: EASE_SIGNATURE }
    );
  }

  function cerrarPopup() {
    document.body.style.overflow = "";
    overlay.classList.remove("is-open");
    popup.classList.remove("is-open");
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => abrirPopup(trigger.dataset.hotel));
  });

  cerrarBtns.forEach((btn) => btn.addEventListener("click", cerrarPopup));
}
