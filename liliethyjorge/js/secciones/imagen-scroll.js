/**
 * imagen-scroll.js
 * Efecto de imagen tipo fixed/parallax.
 */

export function inicializarImagenScroll() {

  const seccion = document.getElementById("imagen-scroll");

  if (!seccion) return;

  const imagen = seccion.querySelector(".imagen-scroll__imagen");

  if (!imagen) return;


  function actualizar() {

    const rect = seccion.getBoundingClientRect();

    const ventana = window.innerHeight;

    /*
     * La sección está entrando/saliendo
     * del viewport.
     */

    const progreso =
      (ventana - rect.top) /
      (ventana + rect.height);


    /*
     * Limitamos el valor entre 0 y 1.
     */

    const p = Math.max(
      0,
      Math.min(1, progreso)
    );


    /*
     * Movimiento bastante visible.
     */

    const movimiento =
      (p - 0.5) * 400;


    imagen.style.transform =
      `translate3d(0, ${movimiento}px, 0)`;
  }


  window.addEventListener(
    "scroll",
    actualizar,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    actualizar,
    { passive: true }
  );


  actualizar();
}