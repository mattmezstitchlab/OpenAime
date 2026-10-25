/* A draft in the single capsule. No account, upload, storage or automatic send. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('visitorNote'), text = $('visitorNoteText');
  let lastFocus = null, dirty = false, pulseTimer, step = 0, statusTimer;
  const fields = [text, $('noteDate'), $('notePlace')];
  function status(message) {
    $('noteStatus').textContent = message; $('noteStatus').hidden = false;
    clearTimeout(statusTimer); statusTimer = setTimeout(() => { $('noteStatus').hidden = true; }, 6000);
  }
  function showStep(index) {
    step = index; fields.forEach((field, i) => { field.hidden = i !== step; });
    fields[step].focus();
    $('noteFields').setAttribute('aria-label', 'Changer de champ · ' + ['Message', 'Date facultative', 'Lieu facultatif'][step]);
  }
  function pulse() {
    const slat = document.querySelector('.slat:nth-child(4)');
    if (!slat) return;
    clearTimeout(pulseTimer);
    slat.classList.remove('causal-accent');
    void slat.offsetWidth;
    slat.classList.add('causal-accent');
    pulseTimer = setTimeout(() => slat.classList.remove('causal-accent'), 900);
  }
  function close() {
    form.hidden = true; document.body.classList.remove('composing');
    (lastFocus && lastFocus.isConnected ? lastFocus : $('postitBtn')).focus();
  }
  function open() {
    lastFocus = document.activeElement;
    // Do not change the underlying player or its current track.
    for (const id of ['commandModes', 'commandMore', 'sceneCatalog', 'pop', 'plPop']) $(id).hidden = true;
    for (const id of ['commandAdd', 'commandOptions', 'toolScenes', 'ambBtn', 'mList']) $(id).setAttribute('aria-expanded', 'false');
    form.hidden = false; document.body.classList.add('composing');
    showStep(step); status('Brouillon privé. → ouvre la vérification dans AIMEStudio ; rien n’est envoyé ici.'); pulse();
  }
  document.addEventListener('openaime:compose', open);
  $('noteBack').addEventListener('click', close);
  form.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } });
  $('noteFields').addEventListener('click', () => showStep((step + 1) % fields.length));
  form.addEventListener('input', () => {
    dirty = true;
  });
  // One accent after a completed edit, never per keystroke or as a success receipt.
  form.addEventListener('change', pulse);
  $('noteDiscard').addEventListener('click', () => {
    if (dirty && !window.confirm('Effacer ce brouillon ? Cette action est irréversible.')) return;
    form.reset(); dirty = false; status('Brouillon effacé.'); showStep(0);
  });
  window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const message = text.value.trim();
    if (message.length < 20) { status('Écrivez au moins 20 caractères utiles avant de continuer.'); showStep(0); return; }
    const details = [message];
    if ($('noteDate').value) details.push('Date souhaitée : ' + $('noteDate').value);
    if ($('notePlace').value.trim()) details.push('Lieu : ' + $('notePlace').value.trim());
    // Fixed destination, fragment not query string; never accept a caller-supplied target.
    const destination = 'https://aimestudio.vercel.app/contact/openaime/';
    const url = destination + '#mot=' + encodeURIComponent(details.join('\n\n'));
    dirty = false; // deliberate handoff; no automatic email and no success claim
    window.location.assign(url);
  });
})();
