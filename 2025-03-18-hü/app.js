// Initialer Zustand
const state = {
    guthaben: 0,
    einnahmen: 0,
    ziel: null,
    anzahlPersonen: 1,
    fahrpreis: 0,
    ausgabe: "Bitte wählen Sie ein Ziel",
};

// Preise für die Ziele
const zieleUndPreise = {
    Bregenz: 90,
    Eisenstadt: 13,
    Graz: 40,
    Innsbruck: 80,
    Klagenfurt: 60,
    Linz: 40,
    Salzburg: 60,
    "St. Pölten": 15,
};

// UI-Elemente
const einwerfenInput = document.getElementById("einwerfenBetrag");
const einwerfenButton = document.getElementById("einwerfenButton");
const zielSelect = document.getElementById("ziel");
const anzahlPersonenInput = document.getElementById("anzahlPersonen");
const fahrpreisSpan = document.getElementById("fahrpreis");
const guthabenSpan = document.getElementById("guthaben");
const ticketAusgabeTextarea = document.getElementById("ticketAusgabe");
const einnahmenSpan = document.getElementById("einnahmen");
const ticketKaufenButton = document.getElementById("ticketKaufen");
const resetBtn = document.getElementById("reset");

// Funktion zum Berechnen des Fahrpreises
const updateFahrpreis = () => {
    state.fahrpreis = state.ziel ? zieleUndPreise[state.ziel] * state.anzahlPersonen : 0;
};

// Funktion zum Aktualisieren der UI
const render = () => {
    ticketAusgabeTextarea.innerText = state.ausgabe;
    guthabenSpan.innerText = `${state.guthaben} €`;
    fahrpreisSpan.innerText = `${state.fahrpreis} €`;
    einnahmenSpan.innerText = `${state.einnahmen} €`;
};

// Event-Handler: Geld einwerfen
const onEinwurf = () => {
    const geld = parseFloat(einwerfenInput.value);
    if (isNaN(geld) || geld <= 0) {
        state.ausgabe = "Bitte einen gültigen Betrag eingeben!";
    } else {
        state.guthaben += geld;
        state.ausgabe = "Geld eingeworfen!";
    }
    einwerfenInput.value = "";
    render();
};

// Event-Handler: Ziel auswählen
const onZielSelect = () => {
    state.ziel = zielSelect.value;
    updateFahrpreis();
    state.ausgabe = `Ziel gesetzt: ${state.ziel}`;
    render();
};

// Event-Handler: Anzahl der Personen ändern
const onAnzahlChange = () => {
    state.anzahlPersonen = anzahlPersonenInput.valueAsNumber || 1;
    updateFahrpreis();
    render();
};

// Event-Handler: Ticket kaufen
const onTicketKaufen = () => {
    if (!state.ziel) {
        state.ausgabe = "Bitte wählen Sie ein Ziel!";
    } else if (state.guthaben < state.fahrpreis) {
        state.ausgabe = "Nicht genug Guthaben!";
    } else {
        const restgeld = state.guthaben - state.fahrpreis;
        state.einnahmen += state.fahrpreis;
        state.guthaben = 0;
        state.ausgabe = `=== Fahrkarte nach ${state.ziel} ===\n` +
                        `Einzelpreis: ${zieleUndPreise[state.ziel]} €\n` +
                        `Anzahl der Fahrgäste: ${state.anzahlPersonen}\n` +
                        `Summe: ${state.fahrpreis} €\n` +
                        `Gegeben: ${state.fahrpreis + restgeld} €\n` +
                        `Restgeld: ${restgeld} €\n` +
                        `============================`;
    }
    render();
};

// Event-Handler: Neuer Kunde (Reset)
const onReset = () => {
    Object.assign(state, {
        guthaben: 0,
        anzahlPersonen: 1,
        ziel: null,
        fahrpreis: 0,
        ausgabe: "Bitte wählen Sie ein Ziel",
    });
    anzahlPersonenInput.value = 1;
    render();
};

// Event-Listener hinzufügen
einwerfenButton.addEventListener("click", onEinwurf);
zielSelect.addEventListener("change", onZielSelect);
anzahlPersonenInput.addEventListener("change", onAnzahlChange);
ticketKaufenButton.addEventListener("click", onTicketKaufen);
resetBtn.addEventListener("click", onReset);

// Ziele in Dropdown einfügen
zielSelect.innerHTML = Object.keys(zieleUndPreise)
    .map((ziel) => `<option value="${ziel}">${ziel}</option>`)
    .join("\n");

// UI initialisieren
render();
