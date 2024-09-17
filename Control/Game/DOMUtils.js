// Función para actualizar el DOM
export function actualizarDOM(subsuelo, vida, stress, escudo, botas, torch) {
    document.getElementById("player-floor").innerText = subsuelo;

    // Actualizar vida
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`player-health-${i}`).style.filter =
            i <= vida / 25 ? "none" : "grayscale(100%)";
    }

    // Actualizar stress
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`player-brain-${i}`).style.filter =
            i <= stress / 25 ? "none" : "grayscale(100%)";
    }

    // Actualizar escudo
    document.getElementById("player-shield").style.filter = escudo
        ? "none"
        : "grayscale(100%)";

    // Actualizar botas
    document.getElementById("player-boots").style.filter = botas
        ? "none"
        : "grayscale(100%)";

    // Actualizar antorcha
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`player-torch-${i}`).style.filter =
            i <= torch ? "none" : "grayscale(100%)";
    }
}
