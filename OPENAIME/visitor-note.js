/* Le brouillon reste dans la page jusqu'au clic volontaire. Ni compte, ni stockage, ni envoi automatique. */
(() => {
  'use strict';
  const button = document.getElementById('visitorNoteToggle');
  const dialog = document.getElementById('visitorNote');
  const text = document.getElementById('visitorNoteText');
  const next = document.getElementById('visitorNoteContinue');
  // Raccord entre les deux previews ; la version publique utilise le domaine public AIME.
  const previewHost = 'openaime-git-feat-windo-1bf9ec-matthieulecointre-9534s-projects.vercel.app';
  const destination = window.location.hostname === previewHost
    ? 'https://aimestudio-git-feat-ope-8d3e13-matthieulecointre-9534s-projects.vercel.app/contact/openaime/'
    : next.href;
  next.href = destination;
  button.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('close', () => button.focus());
  // Construction au dernier moment ; seul un fragment du lien reçoit le texte.
  next.addEventListener('click', () => {
    next.href = destination + '#mot=' + encodeURIComponent(text.value.slice(0, 3000));
  });
})();
