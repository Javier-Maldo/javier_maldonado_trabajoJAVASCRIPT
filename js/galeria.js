const IMAGENES = [
  { src: '../images/producto1.jpg', titulo: 'Proyecto 1 — Web Corporativa' },
  { src: '../images/producto2.jpg', titulo: 'Proyecto 2 — Tienda Online' },
  { src: '../images/producto3.jpg', titulo: 'Proyecto 3 — Landing Page' },
  { src: '../images/producto4.jpg', titulo: 'Proyecto 4 — App Web' },
  { src: '../images/producto5.jpg', titulo: 'Proyecto 5 — Portfolio' },
  { src: '../images/producto6.jpg', titulo: 'Proyecto 6 — Branding Digital' },
];

const gridEl      = document.getElementById('galeria');
const modal       = document.getElementById('modal');
const modalImg    = document.getElementById('modal-img');
const modalCapt   = document.getElementById('modal-caption');
const modalCount  = document.getElementById('modal-contador');
const btnCerrar   = document.getElementById('modal-cerrar');
const btnPrev     = document.getElementById('btn-prev');
const btnNext     = document.getElementById('btn-next');

let indiceActual = 0;

IMAGENES.forEach((img, i) => {
  const item = document.createElement('div');
  item.className = 'galeria-item';
  item.tabIndex  = 0;
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', `Abrir ${img.titulo}`);

  item.innerHTML = `
    <img src="${img.src}" alt="${img.titulo}" loading="lazy">
    <div class="overlay">${img.titulo}</div>
  `;

 
  item.addEventListener('click', () => abrirModal(i));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirModal(i); }
  });

  gridEl.appendChild(item);
});

//  Lógica del modal 
function abrirModal(indice) {
  indiceActual = indice;
  actualizarModal();
  modal.classList.add('abierto');
  document.body.style.overflow = 'hidden';
  btnCerrar.focus();
}

function cerrarModal() {
  modal.classList.remove('abierto');
  document.body.style.overflow = '';
}

function actualizarModal() {
  const img = IMAGENES[indiceActual];
  modalImg.src       = img.src;
  modalImg.alt       = img.titulo;
  modalCapt.textContent  = img.titulo;
  modalCount.textContent = `${indiceActual + 1} / ${IMAGENES.length}`;
  btnPrev.style.visibility = indiceActual === 0 ? 'hidden' : 'visible';
  btnNext.style.visibility = indiceActual === IMAGENES.length - 1 ? 'hidden' : 'visible';
}

function irA(delta) {
  const nuevo = indiceActual + delta;
  if (nuevo >= 0 && nuevo < IMAGENES.length) {
    indiceActual = nuevo;
    actualizarModal();
  }
}

// Eventos del modal
btnCerrar.addEventListener('click', cerrarModal);
btnPrev.addEventListener('click', () => irA(-1));
btnNext.addEventListener('click', () => irA(+1));

// Cerrar al hacer clic en el fondo oscuro
modal.addEventListener('click', e => {
  if (e.target === modal) cerrarModal();
});

// Navegación
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('abierto')) return;
  switch (e.key) {
    case 'Escape':      cerrarModal(); break;
    case 'ArrowLeft':   irA(-1);       break;
    case 'ArrowRight':  irA(+1);       break;
  }
});
