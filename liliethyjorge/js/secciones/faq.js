/**
 * faq.js
 * Acordeón simple: un solo ítem abierto a la vez, animado con max-height
 * (definido en CSS) para mantener el JS ligero.
 */

export function inicializarFaq() {
  const items = document.querySelectorAll(".faq__item");

  items.forEach((item) => {
    const boton = item.querySelector("[data-faq-toggle]");
    const respuesta = item.querySelector(".faq__respuesta");

    boton.addEventListener("click", () => {
      const estabaAbierto = item.classList.contains("is-open");

      items.forEach((otro) => {
        otro.classList.remove("is-open");
        otro.querySelector(".faq__respuesta").style.maxHeight = null;
      });

      if (!estabaAbierto) {
        item.classList.add("is-open");
        respuesta.style.maxHeight = respuesta.scrollHeight + "px";
      }
    });
  });
}
