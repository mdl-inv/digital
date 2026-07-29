/**
 * rsvp.js
 * Formulario de confirmación de asistencia. El número de personas ya
 * viene precargado por guest.js según el invitado detectado en la URL.
 * El envío queda preparado para conectarse a tu propio backend/Sheet:
 * ver el comentario en `enviarConfirmacion()`.
 */

export function inicializarRsvp() {
  const seccion = document.getElementById("rsvp");
  const form = document.getElementById("rsvp-form");
  const opciones = document.querySelectorAll(".rsvp__opcion");
  let asistencia = null;

  opciones.forEach((opcion) => {
    opcion.addEventListener("click", () => {
      opciones.forEach((o) => o.classList.remove("is-selected"));
      opcion.classList.add("is-selected");
      asistencia = opcion.dataset.valor;
    });
  });

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const datos = {
      nombre: document.getElementById("rsvp-nombre").value,
      asistencia,
      personas: document.getElementById("rsvp-personas").value,
      mensaje: document.getElementById("rsvp-mensaje").value,
    };

    await enviarConfirmacion(datos);

    seccion.classList.add("is-enviado");
  });
}

/**
 * Punto único de integración con tu fuente de datos real.
 * Por ahora solo registra en consola; reemplaza el cuerpo de esta función
 * por tu llamada real (Google Sheets API, un endpoint propio, Formspree, etc.)
 * sin tener que tocar el resto del formulario.
 */
async function enviarConfirmacion(datos) {
  console.info("RSVP recibido (pendiente de conectar backend):", datos);
  return Promise.resolve();
}
