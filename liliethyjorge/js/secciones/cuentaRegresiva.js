/**
 * cuentaRegresiva.js
 * Cuenta regresiva hacia la boda: 10 de octubre de 2026, 8:30 PM.
 * También dispara la animación del trazo SVG (dibujarLinea) la primera
 * vez que la sección entra en viewport.
 */

import { dibujarLinea } from "../utils/animaciones.js";

const FECHA_BODA = new Date("2026-10-10T20:30:00");

function calcularRestante() {
  const ahora = new Date();
  const diferencia = Math.max(0, FECHA_BODA - ahora);

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  return { dias, horas, minutos, segundos };
}

function formatear(numero) {
  return String(numero).padStart(2, "0");
}

export function inicializarCuentaRegresiva() {
  const contenedor = document.getElementById("contador");
  if (!contenedor) return;

  const campos = {
    dias: contenedor.querySelector('[data-unidad="dias"]'),
    horas: contenedor.querySelector('[data-unidad="horas"]'),
    minutos: contenedor.querySelector('[data-unidad="minutos"]'),
    segundos: contenedor.querySelector('[data-unidad="segundos"]'),
  };

  function actualizar() {
    const restante = calcularRestante();
    campos.dias.textContent = formatear(restante.dias);
    campos.horas.textContent = formatear(restante.horas);
    campos.minutos.textContent = formatear(restante.minutos);
    campos.segundos.textContent = formatear(restante.segundos);
  }

  actualizar();
  setInterval(actualizar, 1000);

  const linea = document.getElementById("linea-regresiva");
  if (linea) dibujarLinea(linea);
}
