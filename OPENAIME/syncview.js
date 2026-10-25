/* Layout prototype only. Never simulates server permission decisions or claims authenticated roles. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const name = $('logo'), menu = $('identityMenu'), view = $('syncView'), grid = $('syncGrid');
  const labels = ['Public', 'Contact', 'Participant', 'Propriétaire', 'Collaborateur', 'Non connecté'];
  function closeMenu() { menu.hidden = true; name.setAttribute('aria-expanded', 'false'); }
  function render(count) {
    grid.replaceChildren(); grid.classList.toggle('six', count === 6);
    labels.slice(0, count).forEach(label => {
      const pane = document.createElement('article'); pane.className = 'sync-pane';
      const heading = document.createElement('h2'); heading.textContent = label + ' · aperçu proposé';
      const detail = document.createElement('p'); detail.textContent = 'Vue réelle non raccordée';
      pane.append(heading, detail); grid.append(pane);
    });
    $('syncFour').setAttribute('aria-pressed', String(count === 4));
    $('syncSix').setAttribute('aria-pressed', String(count === 6));
  }
  function show(open) {
    closeMenu(); view.hidden = !open; $('syncControls').hidden = !open;
    document.body.classList.toggle('syncing', open);
    if (open) {
      if ($('musicBtn').getAttribute('aria-pressed') === 'true') $('musicBtn').click();
      $('syncHeight').value = $('handle').getAttribute('aria-valuenow');
      $('syncAngle').value = $('wand').getAttribute('aria-valuenow');
      render(4); $('syncExit').focus(); }
    else name.focus();
  }
  for (const [id, key] of [['syncHeight', 'height'], ['syncAngle', 'angle']]) {
    $(id).addEventListener('input', () => document.dispatchEvent(new CustomEvent('openaime:blind-preview', { detail: { [key]: Number($(id).value) } })));
  }
  name.addEventListener('click', () => { const open = menu.hidden; closeMenu(); menu.hidden = !open; name.setAttribute('aria-expanded', String(open)); if (open) $('identityHome').focus(); });
  $('identitySync').addEventListener('click', () => show(true));
  $('identityHome').addEventListener('click', () => show(false));
  $('syncExit').addEventListener('click', () => show(false));
  $('syncFour').addEventListener('click', () => render(4));
  $('syncSix').addEventListener('click', () => render(6));
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!menu.hidden) { closeMenu(); name.focus(); }
    else if (!view.hidden) show(false);
  });
  document.addEventListener('pointerdown', e => { if (!menu.contains(e.target) && !name.contains(e.target)) closeMenu(); });
})();
