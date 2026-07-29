/**
 * guest.js
 * Lee el parámetro ?id= de la URL y resuelve los datos del invitado
 * (nombre, número de personas asignadas) contra data/guests.json.
 *
 * Esta capa está aislada a propósito: para conectar tu propia fuente de
 * datos (Google Sheets, un backend, etc.) solo necesitas reemplazar la
 * función `obtenerListaInvitados()` — el resto de la app consume siempre
 * el mismo objeto { nombre, personas }.
 */

const INVITADO_POR_DEFECTO = {
  nombre: "Estimado invitado",
  personas: 1,
};

async function obtenerListaInvitados() {
  try {
    const respuesta = await fetch("data/guests.json");
    if (!respuesta.ok) throw new Error("No se pudo leer guests.json");
    return await respuesta.json();
  } catch (error) {
    console.warn("guest.js: usando datos por defecto —", error.message);
    return {};
  }
}

function leerIdDeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get("id");
}

/**
 * Resuelve el invitado actual. Devuelve siempre un objeto { nombre, personas },
 * incluso si no hay id en la URL o no se encuentra coincidencia.
 */
export async function obtenerInvitadoActual() {
  const id = leerIdDeUrl();
  if (!id) return { ...INVITADO_POR_DEFECTO };

  const invitados = await obtenerListaInvitados();
  const invitado = invitados[id];

  if (!invitado) return { ...INVITADO_POR_DEFECTO };

  return {
    nombre: invitado.nombre || INVITADO_POR_DEFECTO.nombre,
    personas: invitado.personas || 1,
  };
}

/**
 * Pinta el nombre del invitado en el bloque de bienvenida y prepara
 * el select de "número de personas" del formulario RSVP.
 */
export function aplicarInvitadoAlDOM(invitado) {
  const nombreEl = document.getElementById("bienvenida-nombre");
  if (nombreEl) nombreEl.textContent = invitado.nombre;

  const selectPersonas = document.getElementById("rsvp-personas");
  if (selectPersonas) {
    selectPersonas.innerHTML = "";
    for (let i = 1; i <= invitado.personas; i++) {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = i === 1 ? "1 persona" : `${i} personas`;
      selectPersonas.appendChild(option);
    }
  }

  const nombreInput = document.getElementById("rsvp-nombre");
  if (nombreInput && invitado.nombre !== INVITADO_POR_DEFECTO.nombre) {
    nombreInput.value = invitado.nombre;
  }
}
