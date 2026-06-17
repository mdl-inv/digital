document.addEventListener('DOMContentLoaded', () => {

  // ===== Variables globales =====
  let invitado = null; // para uso global en RSVP y lectura de JSON
  const audio = document.getElementById("wedding-song");
  const pantallaInicio = document.getElementById("pantallaInicio");

  // ===== Pantalla de inicio / activar música =====
  if(pantallaInicio && audio){
    pantallaInicio.addEventListener("click", () => {
      audio.play().catch(err => console.log('⚠️ Error al reproducir música:', err));
      pantallaInicio.style.opacity = 0;
      setTimeout(() => { pantallaInicio.style.display = "none"; }, 1000);
    });
  }

  // ===== Scroll hacia detalles =====
  const scrollBtn = document.getElementById('scroll-btn');
  if(scrollBtn){
    scrollBtn.addEventListener('click', () => {
      const details = document.getElementById('details');
      if(details) details.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== RSVP botón =====
  const rsvpBtn = document.getElementById('rsvp-btn');
  if(rsvpBtn){
    rsvpBtn.addEventListener('click', () => {
      const response = document.getElementById('rsvp-response');
      if(response) response.classList.remove('hidden');
      rsvpBtn.disabled = true;
      rsvpBtn.textContent = 'Confirmado';
    });
  }

  // ===== Música flotante =====
  const floatingPlayer = document.getElementById('floating-music-player');
  const playButton = document.getElementById('play-pause-button');
  if(audio && playButton && floatingPlayer){
    const playIcon = document.createElement('i'); playIcon.classList.add('fas','fa-play');
    const pauseIcon = document.createElement('i'); pauseIcon.classList.add('fas','fa-pause');

    function updateButtonIcon(paused){
      playButton.innerHTML = '';
      playButton.appendChild(paused ? playIcon : pauseIcon);
    }

    updateButtonIcon(true);

    audio.addEventListener('play', () => {
      floatingPlayer.classList.add('pulsing');
      updateButtonIcon(false);
    });
    audio.addEventListener('pause', () => {
      floatingPlayer.classList.remove('pulsing');
      updateButtonIcon(true);
    });

    playButton.addEventListener('click', () => {
      if(audio.paused){ audio.play().catch(err => console.log(err)); }
      else audio.pause();
    });
  }

  // ===== Carrusel =====
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let index = 0, autoplayInterval;
  
  if(slides.length && indicatorsContainer){
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if(i===0) dot.classList.add('active');
      indicatorsContainer.appendChild(dot);
      dot.addEventListener('click', ()=> goToSlide(i,true));
    });
    const indicators = Array.from(indicatorsContainer.children);

    function updateSlides(){
      slides.forEach((slide,i)=>slide.classList.toggle('active', i===index));
      indicators.forEach((dot,i)=>dot.classList.toggle('active', i===index));
    }

    function goToSlide(newIndex, stopAuto=false){
      index=newIndex;
      updateSlides();
      if(stopAuto) resetAutoplay();
    }

    function nextSlide(){ index=(index+1)%slides.length; updateSlides(); }
    function prevSlide(){ index=(index-1+slides.length)%slides.length; updateSlides(); }

    function startAutoplay(){ autoplayInterval = setInterval(nextSlide,2000); }
    function resetAutoplay(){ clearInterval(autoplayInterval); startAutoplay(); }

    // Drag táctil
    let startX=0,isDragging=false,threshold=30;
    slides.forEach(slide=>{
      slide.addEventListener('mousedown', startDrag);
      slide.addEventListener('touchstart', startDrag);
      slide.addEventListener('mousemove', moveDrag);
      slide.addEventListener('touchmove', moveDrag);
      slide.addEventListener('mouseup', endDrag);
      slide.addEventListener('mouseleave', endDrag);
      slide.addEventListener('touchend', endDrag);
    });
    function startDrag(e){ isDragging=true; startX=e.pageX||e.touches[0].pageX; clearInterval(autoplayInterval); }
    function moveDrag(e){
      if(!isDragging) return;
      const diff = (e.pageX||e.touches[0].pageX) - startX;
      if(diff<-threshold){ nextSlide(); isDragging=false; resetAutoplay(); }
      else if(diff>threshold){ prevSlide(); isDragging=false; resetAutoplay(); }
    }
    function endDrag(){ isDragging=false; }

    updateSlides(); startAutoplay();
  }

  // ===== Frase boda =====
  const fraseEl = document.getElementById("fraseBoda");
  if(fraseEl){
    const texto = `Dos caminos se unen, dos almas se encuentran, y comienza una nueva historia de amor. Queremos compartir contigo este día tan especial.`;
    let i=0, escribiendo=false;
    function escribir(){
      if(i<texto.length){
        fraseEl.innerHTML += texto[i]==="\n"? "<br>":texto[i]; i++;
        setTimeout(escribir,45);
      }
    }
    const observerFrase = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && !escribiendo){ escribiendo=true; escribir(); }
      });
    },{threshold:0.2});
    observerFrase.observe(fraseEl);
  }

  // ===== Animación títulos y nombres =====
  function animacionScroll(selector, clase="visible"){ 
    const elems = document.querySelectorAll(selector);
    if(!elems.length) return;
    const obs = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add(clase); obs.unobserve(entry.target); }
      });
    },{threshold:0.2});
    elems.forEach(el=>obs.observe(el));
  }

  animacionScroll('.animate-on-scroll');
  animacionScroll('.nombres-container .nombre, .nombre-novio, .simbolo, .texto-bendicion, .padres', 'visible-scroll');
  animacionScroll('.galeria-item');

  // ===== Invitado desde JSON =====
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  fetch("https://raw.githubusercontent.com/mdl-inv/data-updates/main/naylayale/invitados.json")
    .then(res=>res.json())
    .then(data=>{
      invitado = data.find(item=>item.id==id);
      const nombreEl = document.getElementById("nombre");
      const personasEl = document.getElementById("personas");
      const idHidden = document.getElementById("idInvitadoHidden");
      const select = document.getElementById("acompanantes");
      const hiddenInput = document.getElementById("acompanantesHidden");

      if(invitado){
        if(nombreEl) nombreEl.textContent = invitado.nombre;
        if(personasEl) personasEl.textContent = invitado.personas;
        if(idHidden) idHidden.value = invitado.id;

        if(select && hiddenInput){
          const max=parseInt(invitado.personas)||1;
          select.innerHTML="";
          for(let i=1;i<=max;i++){
            const opt = document.createElement("option");
            opt.value=i; opt.textContent=i;
            select.appendChild(opt);
          }
          hiddenInput.value = select.value;
          select.addEventListener("change", ()=>hiddenInput.value=select.value);
        }
      }else{
        if(nombreEl) nombreEl.textContent="Invitado no encontrado";
        if(personasEl) personasEl.textContent="-";
      }
    })
    .catch(err=>{
      console.error(err);
      const nombreEl = document.getElementById("nombre");
      const personasEl = document.getElementById("personas");
      if(nombreEl) nombreEl.textContent="Error al cargar datos";
      if(personasEl) personasEl.textContent="-";
    });

  // ===== Contador regresivo =====
  const DATE_TARGET = new Date('2025-12-13T18:00:00');
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  function updateCountdown(){
    if(!daysEl||!hoursEl||!minutesEl||!secondsEl) return;
    const duration=DATE_TARGET-new Date();
    if(duration<=0){ daysEl.textContent="0"; hoursEl.textContent="00"; minutesEl.textContent="00"; secondsEl.textContent="00"; return; }
    const d=Math.floor(duration/(1000*60*60*24));
    const h=Math.floor((duration/(1000*60*60))%24);
    const m=Math.floor((duration/(1000*60))%60);
    const s=Math.floor((duration/1000)%60);
    daysEl.textContent=d;
    hoursEl.textContent=h.toString().padStart(2,'0');
    minutesEl.textContent=m.toString().padStart(2,'0');
    secondsEl.textContent=s.toString().padStart(2,'0');
  }
  setInterval(updateCountdown,1000); updateCountdown();

  // ===== Timeline =====
  const timelineItems = document.querySelectorAll('.timeline-item');
  function checkTimeline(){
    const trigger = window.innerHeight*0.85;
    timelineItems.forEach(item=>{
      if(item.getBoundingClientRect().top<trigger) item.classList.add('active');
    });
  }
  window.addEventListener('scroll',checkTimeline);
  window.addEventListener('load',checkTimeline);

  // ===== Formulario RSVP =====
  const form = document.getElementById("rsvpForm");
  const mensaje = document.getElementById("mensaje");
  if(form){
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const nombreInput = form.querySelector('input[name="entry.1850873592"]');
      const telefonoInput = form.querySelector('input[name="entry.1902016643"]');
      const comentariosInput = form.querySelector('textarea[name="entry.404057514"]');
      const asistenciaRadios = form.querySelectorAll('input[name="entry.207305379"]');
      const select = form.querySelector('select[name="acompanantesVisible"]');
      const hiddenInput = form.querySelector('input[name="entry.1055150468"]');
      const idHidden = document.getElementById("idInvitadoHidden");

      if(idHidden && invitado) idHidden.value=invitado.id;

      const nombre = nombreInput?.value?.trim()||"";
      const telefono = telefonoInput?.value?.trim()||"";
      const comentarios = comentariosInput?.value?.trim()||"";
      let asistencia="";
      for(let r of asistenciaRadios){ if(r.checked){asistencia=r.value; break;}}

      if(!nombre||!telefono||!asistencia||!select?.value){
        alert("Por favor llena todos los campos antes de enviar."); return;
      }
      if(!/^\d{10}$/.test(telefono)){ alert("Ingresa un número de teléfono válido de 10 dígitos."); return; }

      if(hiddenInput && select){
        hiddenInput.value=select.options[select.selectedIndex]?.text||select.value;
      }

      const url="https://docs.google.com/forms/u/0/d/1pTK1Thh87p9E6UVcsaZr_1oh3wtPdR8NwpokVdnoTSM/formResponse";
      fetch(url,{method:"POST",mode:"no-cors",body:new FormData(form)})
        .then(()=>{ if(mensaje) mensaje.textContent="¡Gracias! Tu confirmación ha sido enviada."; form.reset(); })
        .catch(()=>{ if(mensaje) mensaje.textContent="Hubo un error, por favor intenta de nuevo."; });
    });
  }

});
