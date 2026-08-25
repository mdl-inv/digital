/**
 * hoteles.js
 *
 * Popup informativo de hoteles.
 */

const DATOS_HOTELES = {

  "ludivina": {

    nombre: "Hotel Ludivina",

    imagen:
      "assets/images/ludivina.jpg",

    direccion:
      "Blvrd Benito Juárez 600, Los Pinos, 25720 Monclova, Coah. 8666342800",

    descripcion:
      "A 6 minutos del lugar de la recepción."

  },


  "hotel-olimpia": {

    nombre: "Hotel Olímpia",

    imagen:
      "assets/images/olimpia.jpg",

    direccion:
      "C. M. Hidalgo 203 A, Zona Centro, 25700 Monclova, Coah. 8666336211",

    descripcion:
      "A 5 minutos del lugar de la recepción."
  },


  "holiday-inn": {

    nombre: "Holiday Inn Monclova",

    imagen:
      "assets/images/holiday.jpeg",

    direccion:
      "Blvd. Harold R. Pape # 200 Col. Guadalaupe, Guadalupe, 25750 Monclova, Coah. 8666320025",

    descripcion:
      "A 6 minutos del lugar de la recepción."

  },

    "sleep-inn": {

    nombre: "Sleep Inn Monclova",

    imagen:
      "assets/images/sleep-inn.jpg",

    direccion:
      "Blvd Harold R. Pape 2008, Jardines del Valle, 25732 Monclova, Coah. 8661771900",

    descripcion:
     "A 10 minutos del lugar de la recepción."
  },

    "one-monclova": {

    nombre: "One Monclova",

    imagen:
      "assets/images/one-monclova.jpg",

    direccion:
      "Blvd Harold R. Pape 2008, Jardines del Valle, 25732 Monclova, Coah. 8661580780",

    descripcion:
     "A 6 minutos del lugar de la recepción."
  },

    "hotel-bluu": {

    nombre: "Hotel Bluu",

    imagen:
      "assets/images/bluu.jpg",

    direccion:
      "Blvd. Harold R. Pape 2008, Jardines del Valle, 25732 Monclova, Coah. 8661580780",

    descripcion:
     "A 15 minutos del lugar de la recepción, cerca de la casa de la novia."
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