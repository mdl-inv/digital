/**
 * ==========================================================================
 * carrusel.js
 * Carrusel de galería
 * ==========================================================================
 */

export function inicializarCarrusel() {

  const slides = Array.from(
    document.querySelectorAll(".carousel-slide")
  );

  const indicatorsContainer =
    document.querySelector(".carousel-indicators");


  // Si no existe el carrusel, no hacer nada
  if (!slides.length || !indicatorsContainer) {
    return;
  }


  let index = 0;
  let autoplayInterval = null;

  let startX = 0;
  let isDragging = false;

  const threshold = 40;


  // ==========================================================================
  // INDICADORES
  // ==========================================================================

  slides.forEach((_, i) => {

    const button = document.createElement("button");

    button.type = "button";

    if (i === 0) {
      button.classList.add("active");
    }

    indicatorsContainer.appendChild(button);

    button.addEventListener("click", () => {
      irASlide(i, true);
    });

  });


  const indicators =
    Array.from(indicatorsContainer.children);


  // ==========================================================================
  // ACTUALIZAR
  // ==========================================================================

  function actualizarSlides() {

    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === index
      );

    });


    indicators.forEach((indicator, i) => {

      indicator.classList.toggle(
        "active",
        i === index
      );

    });

  }


  // ==========================================================================
  // CAMBIAR SLIDE
  // ==========================================================================

  function irASlide(nuevoIndex, reiniciar = false) {

    index = nuevoIndex;

    actualizarSlides();

    if (reiniciar) {
      reiniciarAutoplay();
    }

  }


  function siguiente() {

    index =
      (index + 1) % slides.length;

    actualizarSlides();

  }


  function anterior() {

    index =
      (index - 1 + slides.length) % slides.length;

    actualizarSlides();

  }


  // ==========================================================================
  // AUTOPLAY
  // ==========================================================================

  function iniciarAutoplay() {

    clearInterval(autoplayInterval);

    autoplayInterval =
      setInterval(siguiente, 4000);

  }


  function reiniciarAutoplay() {

    iniciarAutoplay();

  }


  // ==========================================================================
  // TOUCH / MOUSE
  // ==========================================================================

  function obtenerX(event) {

    if (
      event.touches &&
      event.touches.length
    ) {

      return event.touches[0].pageX;

    }

    return event.pageX;

  }


  function iniciarDrag(event) {

    isDragging = true;

    startX = obtenerX(event);

    clearInterval(autoplayInterval);

  }


  function moverDrag(event) {

    if (!isDragging) {
      return;
    }

    const currentX = obtenerX(event);

    const diferencia =
      currentX - startX;


    // Deslizar hacia la izquierda
    if (diferencia < -threshold) {

      siguiente();

      isDragging = false;

      reiniciarAutoplay();

      return;
    }


    // Deslizar hacia la derecha
    if (diferencia > threshold) {

      anterior();

      isDragging = false;

      reiniciarAutoplay();

    }

  }


  function terminarDrag() {

    isDragging = false;

  }


  // ==========================================================================
  // EVENTOS
  // ==========================================================================

  slides.forEach(slide => {

    // Mouse
    slide.addEventListener(
      "mousedown",
      iniciarDrag
    );

    slide.addEventListener(
      "mousemove",
      moverDrag
    );

    slide.addEventListener(
      "mouseup",
      terminarDrag
    );

    slide.addEventListener(
      "mouseleave",
      terminarDrag
    );


    // Touch
    slide.addEventListener(
      "touchstart",
      iniciarDrag,
      { passive: true }
    );

    slide.addEventListener(
      "touchmove",
      moverDrag,
      { passive: true }
    );

    slide.addEventListener(
      "touchend",
      terminarDrag
    );

  });


  // ==========================================================================
  // INICIAR
  // ==========================================================================

  actualizarSlides();

  iniciarAutoplay();

}