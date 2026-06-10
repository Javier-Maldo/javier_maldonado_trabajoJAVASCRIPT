(function () {
  const el = id => document.getElementById(id);

  function getValores() {
    const producto = parseFloat(el('producto').value || '0');
    const meses = parseInt(el('plazo').value || '1', 10);

    let extras = 0;
    document.querySelectorAll('.extra:checked').forEach(x => {
      extras += parseFloat(x.value || '0');
    });

    return { producto, meses, extras };
  }

  function descuentoPorPlazo(meses, base) {
    if (meses >= 12) return base * 0.15;
    if (meses >= 6)  return base * 0.10;
    return 0;
  }

  function formatEuro(n) {
    return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
  }

  function actualizar() {
    const { producto, meses, extras } = getValores();
    const subtotal = producto + extras;
    const dto = descuentoPorPlazo(meses, subtotal);
    const total = Math.max(0, subtotal - dto);

    el('subtotal').textContent = formatEuro(subtotal);
    el('descuento').textContent = '-' + formatEuro(dto);
    el('total').textContent = formatEuro(total);
  }

  window.calcularPresupuesto = actualizar;

  ['producto', 'plazo'].forEach(id => el(id).addEventListener('input', actualizar));
  document.querySelectorAll('.extra').forEach(c => c.addEventListener('change', actualizar));

  window.addEventListener('DOMContentLoaded', actualizar);
})();

  