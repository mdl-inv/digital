/**
 * descuentos.js
 * Popup de descuentos para invitados.
 */

export function inicializarDescuentos() {

  const boton =
    document.getElementById("descuentos-toggle");

  const popup =
    document.getElementById("descuentos-popup");

  const overlay =
    document.getElementById("descuentos-popup-overlay");

  const cerrar =
    document.getElementById("descuentos-popup-cerrar");


  if (!boton || !popup || !overlay || !cerrar) {
    return;
  }


  function abrirPopup() {

    popup.classList.add("is-open");

    overlay.classList.add("is-open");

    document.body.style.overflow = "hidden";

  }


  function cerrarPopup() {

    popup.classList.remove("is-open");

    overlay.classList.remove("is-open");

    document.body.style.overflow = "";

  }


  boton.addEventListener(
    "click",
    abrirPopup
  );


  cerrar.addEventListener(
    "click",
    cerrarPopup
  );


  overlay.addEventListener(
    "click",
    cerrarPopup
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        popup.classList.contains("is-open")
      ) {

        cerrarPopup();

      }

    }
  );

}