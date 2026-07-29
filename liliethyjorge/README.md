# Invitación de boda — Lilieth & Jorge

Sitio estático, listo para GitHub Pages. Sin frameworks, sin paso de compilación.

## Cómo verla localmente

Como usa ES Modules (`type="module"`), el navegador bloqueará `fetch` e imports si
abres `index.html` directo con doble clic (protocolo `file://`). Levanta un servidor
simple desde la carpeta del proyecto, por ejemplo:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000` en el navegador de tu celular (o en modo responsive
del navegador de escritorio, simulando 390–430px de ancho).

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz de un repositorio.
2. En **Settings → Pages**, selecciona la rama y la carpeta raíz (`/`).
3. Espera unos minutos y tu invitación estará en `https://usuario.github.io/repositorio/`.

## Qué reemplazar antes de enviarla

| Elemento | Ubicación | Notas |
|---|---|---|
| Logotipo | `index.html`, bloque `.hero__logo-slot` | Reemplaza el SVG de ejemplo por tu logo (SVG o `<img>`) |
| Foto principal | `assets/images/hero.webp` | Usa el mismo nombre de archivo o actualiza la ruta en `index.html` |
| Fotos de "Nuestra historia" | `assets/images/historia-1.webp`, `-2`, `-3` | |
| Fotos de galería | `assets/images/galeria-1.webp` … `-6.webp` | |
| Fotos de hoteles | `assets/images/hotel-*.webp` | También edita nombre, dirección, teléfono y links en `js/secciones/hoteles.js` |
| Música de fondo | `assets/music/pista.mp3` | El archivo actual es un silencio de 30s de marcador de posición |
| Textos (fechas, direcciones, cronograma, FAQ) | directamente en `index.html` | Todo el contenido de ejemplo está ahí, sin Lorem Ipsum |
| Lista de invitados / RSVP | `data/guests.json` | Formato: `"id-en-la-url": { "nombre": "...", "personas": N }` |
| Conexión real del formulario RSVP | `js/secciones/rsvp.js`, función `enviarConfirmacion()` | Ahora mismo solo hace `console.info`; conéctalo a tu backend, Google Sheets o servicio de formularios |
| Mapa embebido | `index.html`, sección `#mapa` (`<iframe>`) y botón "Abrir en Google Maps" | Reemplaza por la URL real del lugar |

## Cómo funciona el link personalizado por invitado

`https://tu-dominio/?id=carlos-hernandez` — el `id` debe existir como llave en
`data/guests.json`. Si no hay `id` en la URL o no coincide con ninguno, se
muestra un saludo genérico y el RSVP permite 1 persona por defecto.

## Estructura

```
index.html
css/       variables, reset, tipografía, layout, menú, intro, secciones, popup, rsvp
js/        main.js orquesta todo; cada sección tiene su propio módulo en js/secciones
data/      guests.json — datos de ejemplo de invitados
assets/    images, fonts, music
```
