/**
 * main.js
 * Punto de entrada. Orquesta el orden de inicialización:
 * 1. Datos del invitado (para que el nombre esté listo antes de mostrar nada)
 * 2. Intro (pantalla en blanco, espera el primer toque)
 * 3. Al primer toque: música + revelado del menú
 * 4. Al terminar la intro: Lenis + animaciones de scroll de cada sección
 */

import { obtenerInvitadoActual, aplicarInvitadoAlDOM } from "./guest.js";
import { inicializarIntro } from "./intro.js";
import { inicializarMenu } from "./menu.js";
import { inicializarMusica, activarMusicaTrasPrimerToque } from "./musica.js";
import { inicializarLenis, obtenerLenis } from "./lenis-setup.js";
import { inicializarLazyLoad } from "./utils/lazyload.js";
import { inicializarRevelados, dibujarLogo } from "./utils/animaciones.js";

import { inicializarHistoria } from "./secciones/historia.js";
import { inicializarCuentaRegresiva } from "./secciones/cuentaRegresiva.js";
import { inicializarCeremonia } from "./secciones/ceremonia.js";
import { inicializarCronograma } from "./secciones/cronograma.js";
import { inicializarGaleria } from "./secciones/galeria.js";
import { inicializarHoteles } from "./secciones/hoteles.js";
import { inicializarMapa } from "./secciones/mapa.js";
import { inicializarFaq } from "./secciones/faq.js";
import { inicializarRsvp } from "./secciones/rsvp.js";

async function main() {

  // 1. Mostrar el intro inmediatamente
  inicializarMusica();

  inicializarIntro({
    onPrimerToque: () => {
      activarMusicaTrasPrimerToque();
    },

    onFinalizar: () => {
      inicializarExperiencia();
    },
  });

  // 2. Obtener invitado en segundo plano
  try {
    const invitado = await obtenerInvitadoActual();
    aplicarInvitadoAlDOM(invitado);
  } catch (error) {
    console.error("Error obteniendo invitado:", error);
  }
}

function inicializarHeroZoom() {
  const hero = document.getElementById("inicio");
  const visual = document.querySelector(".hero__visual");
  const media = visual?.querySelector(".hero__media");

  if (!hero || !visual || !media) return;

  const lenis = obtenerLenis();
  let rafId = null;

  const actualizar = () => {
    const scrollTop = lenis?.scroll || window.scrollY || 0;
    const start = hero.offsetTop + window.innerHeight * 0.05;
    const end = hero.offsetTop + hero.offsetHeight * 0.6;
    const progress = Math.min(1, Math.max(0, (scrollTop - start) / Math.max(1, end - start)));
    const scale = 1 + progress * 0.2;

    media.style.transform = `scale(${scale})`;
    rafId = null;
  };

  const onScroll = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(actualizar);
    }
  };

  onScroll();

  if (lenis) {
    lenis.on("scroll", onScroll);
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  window.addEventListener("resize", onScroll, { passive: true });
}

function inicializarExperiencia() {
  // 3. Scroll suave sincronizado con GSAP
  inicializarLenis();
  inicializarHeroZoom();

  // 4. Navegación
  inicializarMenu();

  // 5. Carga diferida general
  inicializarLazyLoad();

  // 6. Revelados genéricos declarados en el HTML ([data-reveal], [data-split])
  inicializarRevelados();

  // El logo del hero se dibuja igual que en la intro (trazo + relleno),
  // apenas comienza la experiencia — es la primera sección visible.
  const heroTrazo = document.getElementById("hero-logo-trazo");
  const heroRelleno = document.getElementById("hero-logo-relleno");
  if (heroTrazo && heroRelleno) {
    dibujarLogo(heroTrazo, heroRelleno, { delay: 0.3 });
  }

  // 7. Lógica específica de cada sección
  inicializarHistoria();
  inicializarCuentaRegresiva();
  inicializarCeremonia();
  inicializarCronograma();
  inicializarGaleria();
  inicializarHoteles();
  inicializarMapa();
  inicializarFaq();
  inicializarRsvp();
}

main();
