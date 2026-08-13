/**
 * imagen-scroll.js
 * Efecto de imagen tipo fixed/parallax.
 */

export function inicializarImagenScroll() {

  const secciones = document.querySelectorAll(".imagen-scroll");

  if (!secciones.length) return;


  secciones.forEach((seccion) => {

    const imagen = seccion.querySelector(".imagen-scroll__imagen");

    if (!imagen) return;


    function actualizar() {

      const rect = seccion.getBoundingClientRect();

      const ventana = window.innerHeight;


      const progreso =
        (ventana - rect.top) /
        (ventana + rect.height);


      const p = Math.max(
        0,
        Math.min(1, progreso)
      );


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

  });

}