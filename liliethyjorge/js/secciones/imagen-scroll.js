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


const galleryCards = document.querySelectorAll(".gallery-card");

function updateGallery() {

    galleryCards.forEach((card, index) => {

        const nextCard = galleryCards[index + 1];

        if (!nextCard) return;

        const nextRect =
            nextCard.getBoundingClientRect();

        /*
         * Qué tan cerca está la siguiente
         * tarjeta de la posición sticky.
         */

        const stickyPosition = 60;

        let progress =
            1 -
            ((nextRect.top - stickyPosition) /
            window.innerHeight);

        progress = Math.max(
            0,
            Math.min(1, progress)
        );

        /*
         * Efecto MUY sutil.
         *
         * La tarjeta sigue teniendo
         * prácticamente el mismo tamaño.
         */

        const scale =
            1 - (progress * 0.015);

        card.style.transform =
            `scale(${scale})`;
    });
}


window.addEventListener(
    "scroll",
    updateGallery,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateGallery
);

updateGallery();

