// English and Spanish invitation text
const translations = {
  en: {
    welcome: 'Welcome • Bienvenidos', open: 'Open Invitation', back: '← Back',
    special: 'A special invitation awaits', celebration: 'A Royal Celebration',
    letterNote: 'You are cordially invited', tapSeal: 'Open the Royal Envelope',
    continue: 'View Celebration Details', hint: 'A royal celebration begins here',
    invitationMessage: 'You are cordially invited to celebrate this special day.',
    dateHeading: 'Date & Time', datePlaceholder: 'Date and time coming soon',
    locationHeading: 'Location', locationPlaceholder: 'Venue details coming soon',
    rsvpHeading: 'RSVP', rsvpPlaceholder: 'RSVP details coming soon'
  },
  es: {
    welcome: 'Bienvenidos • Welcome', open: 'Abrir Invitación', back: '← Volver',
    special: 'Una invitación especial te espera', celebration: 'Una Celebración Real',
    letterNote: 'Estás cordialmente invitado', tapSeal: 'Abrir el Sobre Real',
    continue: 'Ver Detalles de la Celebración', hint: 'Una celebración real comienza aquí',
    invitationMessage: 'Te invitamos cordialmente a celebrar este día tan especial.',
    dateHeading: 'Fecha y Hora', datePlaceholder: 'Fecha y hora próximamente',
    locationHeading: 'Lugar', locationPlaceholder: 'Detalles del lugar próximamente',
    rsvpHeading: 'Confirmación de Asistencia', rsvpPlaceholder: 'Información para confirmar próximamente'
  }
};

let currentLanguage = 'en';
const hero = document.querySelector('#home');
const envelopeSection = document.querySelector('#envelopeSection');
const envelopeScene = document.querySelector('#envelopeScene');
const details = document.querySelector('#invitationDetails');
const openButton = document.querySelector('#openInvitation');
const unsealButton = document.querySelector('#unsealEnvelope');
const continueButton = document.querySelector('#continueInvitation');
const hint = document.querySelector('#envelopeHint');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setLanguage(language) {
  currentLanguage = language === 'es' ? 'es' : 'en';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) element.textContent = translations[currentLanguage][key];
  });
  document.querySelectorAll('.language-btn').forEach(button => {
    const selected = button.dataset.lang === currentLanguage;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  openButton.hidden = false;
}

// Stage 1: reveal the sealed envelope
function showEnvelope() {
  hero.hidden = true;
  details.hidden = true;
  envelopeSection.hidden = false;
  envelopeScene.classList.remove('is-opening', 'is-open');
  unsealButton.hidden = false;
  unsealButton.disabled = false;
  continueButton.hidden = true;
  hint.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  unsealButton.focus({ preventScroll: true });
}

// Stage 2: open the flap and lift the letter
function unsealEnvelope() {
  if (envelopeScene.classList.contains('is-opening')) return;
  envelopeScene.classList.add('is-opening');
  unsealButton.disabled = true;
  unsealButton.hidden = true;
  hint.hidden = true;
  const delay = reduceMotion.matches ? 0 : 1900;
  window.setTimeout(() => {
    envelopeScene.classList.add('is-open');
    continueButton.hidden = false;
    continueButton.focus({ preventScroll: true });
  }, delay);
}

// Stage 3: reveal the invitation details
function revealInvitation() {
  envelopeSection.hidden = true;
  details.hidden = false;
  details.classList.remove('details-revealed');
  void details.offsetWidth;
  details.classList.add('details-revealed');
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.querySelector('#switchLanguage').focus({ preventScroll: true });
}

document.querySelectorAll('.language-btn').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});
openButton.addEventListener('click', showEnvelope);
unsealButton.addEventListener('click', unsealEnvelope);
continueButton.addEventListener('click', revealInvitation);
document.querySelector('#backToWelcome').addEventListener('click', () => {
  envelopeSection.hidden = true;
  hero.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  openButton.focus({ preventScroll: true });
});
document.querySelector('#switchLanguage').addEventListener('click', () => {
  setLanguage(currentLanguage === 'en' ? 'es' : 'en');
});
