
/* ROYAL ROSE GOLD - BILINGUAL INVITATION */

const translations = {
    en: {
        welcome: "You Are Cordially Invited",
        chooseLanguage: "Language: English",
        open: "Open Invitation",
        celebration: "A Royal Celebration",
        invitationMessage:
            "You are cordially invited to celebrate this special day.",
        dateHeading: "Date & Time",
        datePlaceholder: "Date and time coming soon",
        locationHeading: "Location",
        locationPlaceholder: "Venue details coming soon",
        rsvpHeading: "RSVP",
        rsvpPlaceholder: "RSVP details coming soon"
    },

    es: {
        welcome: "Estás Cordialmente Invitado",
        chooseLanguage: "Idioma: Español",
        open: "Abrir Invitación",
        celebration: "Una Celebración Real",
        invitationMessage:
            "Te invitamos cordialmente a celebrar este día tan especial.",
        dateHeading: "Fecha y Hora",
        datePlaceholder: "Fecha y hora próximamente",
        locationHeading: "Ubicación",
        locationPlaceholder: "Detalles del lugar próximamente",
        rsvpHeading: "Confirmar Asistencia",
        rsvpPlaceholder:
            "Detalles para confirmar asistencia próximamente"
    }
};

let currentLanguage = null;

const languageButtons =
    document.querySelectorAll(".language-btn");

const openButton =
    document.getElementById("openInvitation");

const details =
    document.getElementById("invitationDetails");

const switchButton =
    document.getElementById("switchLanguage");

function setLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]")
        .forEach(element => {
            const key = element.dataset.i18n;
            const translation = translations[language][key];

            if (translation !== undefined) {
                element.textContent = translation;
            }
        });

    openButton.hidden = false;

    languageButtons.forEach(button => {
        const selected =
            button.dataset.lang === language;

        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", selected);
    });
}

languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});

openButton.addEventListener("click", () => {
    if (!currentLanguage) return;

    details.hidden = false;
    details.scrollIntoView({
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
    });
});

switchButton.addEventListener("click", () => {
    const nextLanguage =
        currentLanguage === "en" ? "es" : "en";

    setLanguage(nextLanguage);
});
