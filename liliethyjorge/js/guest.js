/**
 * guest.js
 *
 * Invitado desde JSON + RSVP + WhatsApp
 * + contador regresivo + timeline
 */

// ============================================================
// INVITADO POR DEFECTO
// ============================================================

const INVITADO_POR_DEFECTO = {
  nombre: "Estimado invitado",
  personas: 1
};


// ============================================================
// OBTENER LISTA DE INVITADOS
// ============================================================

async function obtenerListaInvitados() {

  try {

    const respuesta = await fetch(
      "https://raw.githubusercontent.com/mdl-inv/data-updates/main/naylayale/invitados.json"
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo leer invitados.json");
    }

    return await respuesta.json();

  } catch (error) {

    console.warn(
      "guest.js: usando datos por defecto —",
      error.message
    );

    return [];
  }
}


// ============================================================
// LEER ID DE LA URL
// ============================================================

function leerIdDeUrl() {

  const parametros = new URLSearchParams(
    window.location.search
  );

  return parametros.get("id");
}


// ============================================================
// OBTENER INVITADO ACTUAL
// ============================================================

export async function obtenerInvitadoActual() {

  const id = leerIdDeUrl();

  if (!id) {
    return { ...INVITADO_POR_DEFECTO };
  }

  const invitados = await obtenerListaInvitados();

  const invitado = invitados.find(
    item => String(item.id) === String(id)
  );

  if (!invitado) {
    return { ...INVITADO_POR_DEFECTO };
  }

  return {
    nombre:
      invitado.nombre ||
      INVITADO_POR_DEFECTO.nombre,

    personas:
      Number(invitado.personas) || 1
  };
}


// ============================================================
// APLICAR DATOS DEL INVITADO AL HTML
// ============================================================

export function aplicarInvitadoAlDOM(invitado) {

  // ----------------------------------------------------------
  // NOMBRE EN BIENVENIDA
  // ----------------------------------------------------------

  const nombreBienvenida =
    document.getElementById("bienvenida-nombre");

  if (nombreBienvenida) {
    nombreBienvenida.textContent = invitado.nombre;
  }


  // ----------------------------------------------------------
  // NOMBRE EN PASES ASIGNADOS
  // ----------------------------------------------------------

  const nombrePases =
    document.getElementById("pases-nombre");

  if (nombrePases) {
    nombrePases.textContent = invitado.nombre;
  }


  // ----------------------------------------------------------
  // NÚMERO DE PASES ASIGNADOS
  // ----------------------------------------------------------

  const pasesNumero =
    document.getElementById("pases-numero");

  if (pasesNumero) {
    pasesNumero.textContent = invitado.personas;
  }


  // ----------------------------------------------------------
  // NOMBRE DEL FORMULARIO
  // ----------------------------------------------------------

  const nombreInput =
    document.getElementById("rsvp-nombre");

  if (
    nombreInput &&
    invitado.nombre !== INVITADO_POR_DEFECTO.nombre
  ) {

    nombreInput.value = invitado.nombre;

  }


  // ----------------------------------------------------------
  // SELECT DE PERSONAS
  // ----------------------------------------------------------

  const selectPersonas =
    document.getElementById("rsvp-personas");

  if (selectPersonas) {

    selectPersonas.innerHTML = "";

    for (
      let i = 1;
      i <= invitado.personas;
      i++
    ) {

      const option =
        document.createElement("option");

      option.value = String(i);

      option.textContent =
        i === 1
          ? "1 persona"
          : `${i} personas`;

      selectPersonas.appendChild(option);
    }
  }
}


// ============================================================
// RSVP
// ============================================================

const rsvpForm =
  document.getElementById("rsvp-form");

const rsvpNombre =
  document.getElementById("rsvp-nombre");

const rsvpPersonas =
  document.getElementById("rsvp-personas");

const rsvpAsistencia =
  document.getElementById("rsvp-asistencia");

const rsvpMensaje =
  document.getElementById("rsvp-mensaje");

let asistenciaSeleccionada = null;


// ============================================================
// BOTONES DE ASISTENCIA
// ============================================================

if (rsvpAsistencia) {

  const botones =
    rsvpAsistencia.querySelectorAll(".rsvp__opcion");

  botones.forEach(boton => {

    boton.addEventListener("click", () => {

      asistenciaSeleccionada =
        boton.dataset.valor;

      // Quitar selección anterior
      botones.forEach(b => {
        b.classList.remove("activo");
      });

      // Marcar seleccionado
      boton.classList.add("activo");

    });

  });
}


// ============================================================
// ENVIAR RSVP POR WHATSAPP
// ============================================================

if (rsvpForm) {

  rsvpForm.addEventListener("submit", function (event) {

    // Evita el submit normal
    // y evita que la página se recargue.
    event.preventDefault();
    event.stopPropagation();


    // --------------------------------------------------------
    // VALIDAR ASISTENCIA
    // --------------------------------------------------------

    if (!asistenciaSeleccionada) {

      alert(
        "Por favor selecciona si asistirás."
      );

      return;
    }


    // --------------------------------------------------------
    // OBTENER DATOS
    // --------------------------------------------------------

    const nombre =
      rsvpNombre?.value.trim() || "";

    const personas =
      parseInt(
        rsvpPersonas?.value || "1",
        10
      );

    const mensajeExtra =
      rsvpMensaje?.value.trim() || "";


    // --------------------------------------------------------
    // CONSTRUIR MENSAJE
    // --------------------------------------------------------

    let mensaje = "";


    // --------------------------------------------------------
    // ASISTIRÁ
    // --------------------------------------------------------

    if (asistenciaSeleccionada === "si") {

      mensaje =
        `Hola, confirmo mi asistencia.\n` +
        `Nombre: ${nombre}.\n` +
        `Asistiremos ${personas} ` +
        `${personas === 1 ? "persona" : "personas"}.`;

    }


    // --------------------------------------------------------
    // NO ASISTIRÁ
    // --------------------------------------------------------

    else {

      mensaje =
        `Hola, no podré acompañarlos.\n` +
        `Nombre: ${nombre}.`;

    }


    // --------------------------------------------------------
    // MENSAJE OPCIONAL
    // --------------------------------------------------------

    if (mensajeExtra) {

      mensaje +=
        `\n\nMensaje: ${mensajeExtra}`;

    }


    // --------------------------------------------------------
    // NÚMERO DE WHATSAPP
    // --------------------------------------------------------

    const telefono =
      "5218662384758";


    // --------------------------------------------------------
    // URL DE WHATSAPP
    // --------------------------------------------------------

    const url =
      "https://wa.me/" +
      telefono +
      "?text=" +
      encodeURIComponent(mensaje);


    // --------------------------------------------------------
    // ABRIR WHATSAPP
    // --------------------------------------------------------

    window.open(url, "_blank");

    // IMPORTANTE:
    // NO ocultamos el formulario.
    // NO mostramos mensaje de confirmación.
    // NO cambiamos de sección.
    // NO recargamos la página.

  });

}


// ============================================================
// CONTADOR REGRESIVO
// ============================================================

const DATE_TARGET =
  new Date("2025-12-13T18:00:00");

const daysEl =
  document.getElementById("days");

const hoursEl =
  document.getElementById("hours");

const minutesEl =
  document.getElementById("minutes");

const secondsEl =
  document.getElementById("seconds");


function updateCountdown() {

  if (
    !daysEl ||
    !hoursEl ||
    !minutesEl ||
    !secondsEl
  ) {
    return;
  }

  const duration =
    DATE_TARGET - new Date();


  if (duration <= 0) {

    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    return;
  }


  const d =
    Math.floor(
      duration /
      (1000 * 60 * 60 * 24)
    );

  const h =
    Math.floor(
      (duration /
        (1000 * 60 * 60)) % 24
    );

  const m =
    Math.floor(
      (duration /
        (1000 * 60)) % 60
    );

  const s =
    Math.floor(
      (duration / 1000) % 60
    );


  daysEl.textContent = d;

  hoursEl.textContent =
    h.toString().padStart(2, "0");

  minutesEl.textContent =
    m.toString().padStart(2, "0");

  secondsEl.textContent =
    s.toString().padStart(2, "0");
}


setInterval(
  updateCountdown,
  1000
);

updateCountdown();


// ============================================================
// TIMELINE
// ============================================================

const timelineItems =
  document.querySelectorAll(
    ".timeline-item"
  );


function checkTimeline() {

  const trigger =
    window.innerHeight * 0.85;


  timelineItems.forEach(item => {

    if (
      item.getBoundingClientRect().top <
      trigger
    ) {

      item.classList.add("active");

    }

  });
}


window.addEventListener(
  "scroll",
  checkTimeline
);

window.addEventListener(
  "load",
  checkTimeline
);