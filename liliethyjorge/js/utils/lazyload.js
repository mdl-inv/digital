/**
 * lazyload.js
 * Carga diferida de imágenes usando Intersection Observer.
 * Las imágenes con loading="lazy" ya usan el lazy load nativo del navegador;
 * este observer se reserva para casos donde necesitamos disparar lógica
 * adicional (por ejemplo, precargar la siguiente sección) sin depender
 * del comportamiento nativo.
 */

export function inicializarLazyLoad() {
  if (!("IntersectionObserver" in window)) {
    return; // navegadores muy antiguos: las imágenes ya cargan por defecto
  }

  const imagenes = document.querySelectorAll("img[data-src]");

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const img = entrada.target;
        const src = img.getAttribute("data-src");
        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
        }
        obs.unobserve(img);
      });
    },
    {
      rootMargin: "200px 0px",
      threshold: 0.01,
    }
  );

  imagenes.forEach((img) => observer.observe(img));
}

/**
 * Observa secciones para activar/desactivar el menú fijo y saber
 * cuál es la sección actualmente visible (usado por menu.js).
 */
export function observarSecciones(callback) {
  const secciones = document.querySelectorAll("[data-section]");

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          callback(entrada.target.dataset.section);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  secciones.forEach((seccion) => observer.observe(seccion));

  return observer;
}
