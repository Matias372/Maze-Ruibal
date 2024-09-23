// Función para actualizar el DOM
export function actualizarDOM(subsuelo, vida, stress, escudo, botas, torch) {
    document.getElementById("player-floor").innerText = subsuelo;

    actualizarSalud(vida);
    actualizarEstrés(stress);
    actualizarEscudo(escudo);
    actualizarBotas(botas);
    actualizarAntorcha(torch);
}

// Función para actualizar la salud del jugador
function actualizarSalud(vida) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`player-health-${i}`).style.filter =
            i <= vida / 25 ? "none" : "grayscale(100%)";
    }
}

// Función para actualizar el estrés del jugador
function actualizarEstrés(stress) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`player-brain-${i}`).style.filter =
            i <= stress / 25 ? "none" : "grayscale(100%)";
    }
}

// Función para actualizar el escudo del jugador
function actualizarEscudo(escudo) {
    document.getElementById("player-shield").style.filter = escudo
        ? "none"
        : "grayscale(100%)";
}

// Función para actualizar las botas del jugador
function actualizarBotas(botas) {
    document.getElementById("player-boots").style.filter = botas
        ? "none"
        : "grayscale(100%)";
}

// Función para actualizar la antorcha del jugador
function actualizarAntorcha(torch) {
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`player-torch-${i}`).style.filter =
            i <= torch ? "none" : "grayscale(100%)";
    }
}
