(function () {
  const f = document.getElementById('formPresupuesto');
  const el = id => document.getElementById(id);
  const setErr = (id, msg) => { el(id).textContent = msg || ''; };
  const reNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{1,15}$/;
  const reApellidos = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{1,40}$/;
  const reTelefono = /^\d{9}$/;
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validaNombre() {
    const v = el('nombre').value.trim();
    const ok = reNombre.test(v);
    setErr('err-nombre', ok ? '' : 'Solo letras, máx. 15 caracteres.');
    return ok;
  }
  function validaApellidos() {
    const v = el('apellidos').value.trim();
    const ok = reApellidos.test(v);
    setErr('err-apellidos', ok ? '' : 'Solo letras/espacios, máx. 40 caracteres.');
    return ok;
  }
  function validaTelefono() {
    const v = el('telefono').value.trim();
    const ok = reTelefono.test(v);
    setErr('err-telefono', ok ? '' : '9 dígitos numéricos.');
    return ok;
  }
  function validaEmail() {
    const v = el('email').value.trim();
    const ok = reEmail.test(v);
    setErr('err-email', ok ? '' : 'Formato de correo no válido.');
    return ok;
  }
  function validaCondiciones() {
    const ok = el('condiciones').checked;
    setErr('err-condiciones', ok ? '' : 'Debes aceptar las condiciones.');
    return ok;
  }
  // Validación en vivo
  ['nombre','apellidos','telefono','email'].forEach(id => {
    el(id).addEventListener('input', () => {
      switch (id) {
        case 'nombre': validaNombre(); break;
        case 'apellidos': validaApellidos(); break;
        case 'telefono': validaTelefono(); break;
        case 'email': validaEmail(); break;
      }
    });
  });
  el('condiciones').addEventListener('change', validaCondiciones);
  f.addEventListener('submit', (e) => {
    const ok =
      validaNombre() &
      validaApellidos() &
      validaTelefono() &
      validaEmail() &
      validaCondiciones();
    if (!ok) {
      e.preventDefault();
      el('estado-envio').textContent = '';
      return;
    }
    e.preventDefault();
    el('estado-envio').textContent = 'Formulario enviado correctamente.';
    f.reset();
    if (window.calcularPresupuesto) window.calcularPresupuesto();
  });
})();