/**
 * hoteles.js
 *
 * Popup informativo de hoteles.
 */

const DATOS_HOTELES = {

  "gran-plaza": {

    nombre: "Gran Plaza Durango",

    imagen:
      "assets/images/hotel-gran-plaza.webp",

    direccion:
      "Blvd. Francisco Villa 555, Durango, Dgo.",

    descripcion:
      "A 10 minutos del lugar de la recepción. Cuenta con tarifa preferencial para invitados de la boda mencionando el código LILIJORGE."

  },


  "hacienda-suites": {

    nombre: "Hacienda Suites",

    imagen:
      "assets/images/hotel-hacienda-suites.webp",

    direccion:
      "Camino Real 210, Durango, Dgo.",

    descripcion:
      "Habitaciones amplias tipo suite, ideales para familias. A 15 minutos de la recepción."

  },


  "posada-real": {

    nombre: "Posada Real",

    imagen:
      "assets/images/hotel-posada-real.webp",

    direccion:
      "Av. 20 de Noviembre 88, Durango, Dgo.",

    descripcion:
      "Opción económica y céntrica, a 20 minutos de la recepción con servicio de transporte disponible."

  }

};


export function inicializarHoteles() {

  const overlay =
    document.getElementById("popup-overlay");

  const popup =
    document.getElementById("popup-hotel");

  const triggers =
    document.querySelectorAll(".hotel-trigger");

const hotelesToggle =
  document.getElementById("hoteles-toggle");

const hotelesLista =
  document.getElementById("hoteles-lista");

  if (hotelesToggle && hotelesLista) {

  hotelesToggle.addEventListener("click", () => {

    const estaAbierto =
      hotelesToggle.getAttribute("aria-expanded") === "true";

    if (estaAbierto) {

      // Ocultar
      hotelesLista.hidden = true;

      hotelesToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      hotelesToggle.classList.remove("is-open");

      hotelesToggle.querySelector(
        "span:first-child"
      ).textContent = "Ver más";

    } else {

      // Mostrar
      hotelesLista.hidden = false;

      hotelesToggle.setAttribute(
        "aria-expanded",
        "true"
      );

      hotelesToggle.classList.add("is-open");

      hotelesToggle.querySelector(
        "span:first-child"
      ).textContent = "Ver menos";

    }

  });

}

  const cerrarBtns =
    document.querySelectorAll("[data-popup-close]");


  if (!overlay || !popup) {

    console.warn(
      "hoteles.js: no se encontró el popup."
    );

    return;

  }


  const imagen =
    document.getElementById("popup-imagen");

  const nombre =
    document.getElementById("popup-nombre");

  const direccion =
    document.getElementById("popup-direccion");

  const descripcion =
    document.getElementById("popup-descripcion");


  // ==========================================================
  // ABRIR POPUP
  // ==========================================================

  function abrirPopup(idHotel) {

    const hotel =
      DATOS_HOTELES[idHotel];

    if (!hotel) {

      console.warn(
        "Hotel no encontrado:",
        idHotel
      );

      return;

    }


    if (imagen) {

      imagen.src =
        hotel.imagen;

      imagen.alt =
        hotel.nombre;

    }


    if (nombre) {

      nombre.textContent =
        hotel.nombre;

    }


    if (direccion) {

      direccion.textContent =
        hotel.direccion;

    }


    if (descripcion) {

      descripcion.textContent =
        hotel.descripcion;

    }


    // Mostrar

    overlay.classList.add(
      "is-open"
    );

    popup.classList.add(
      "is-open"
    );


    // Bloquear scroll de la página

    document.body.style.overflow =
      "hidden";

  }


  // ==========================================================
  // CERRAR POPUP
  // ==========================================================

  function cerrarPopup() {

    overlay.classList.remove(
      "is-open"
    );

    popup.classList.remove(
      "is-open"
    );


    document.body.style.overflow =
      "";

  }


  // ==========================================================
  // BOTONES DE HOTEL
  // ==========================================================

  triggers.forEach(trigger => {

    trigger.addEventListener(
      "click",
      () => {

        abrirPopup(
          trigger.dataset.hotel
        );

      }
    );

  });


  // ==========================================================
  // CERRAR
  // ==========================================================

  cerrarBtns.forEach(btn => {

    btn.addEventListener(
      "click",
      cerrarPopup
    );

  });


  // ==========================================================
  // ESC
  // ==========================================================

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        popup.classList.contains("is-open")
      ) {

        cerrarPopup();

      }

    }
  );

}