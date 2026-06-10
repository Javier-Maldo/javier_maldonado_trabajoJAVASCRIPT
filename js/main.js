
fetch('data/noticias.json')
  .then(res => res.json())
  .then(noticias => {
    const contenedor = document.getElementById('contenedor-noticias');
    
    noticias.forEach(n => {
      const div = document.createElement('div');
      div.className = 'noticia';
      div.innerHTML = `<h3>${n.titulo}</h3><p>${n.descripcion}</p>`;
      contenedor.appendChild(div);
    });
  })
  .catch(err => console.error('Error al cargar noticias:', err));
