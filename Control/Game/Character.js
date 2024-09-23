// Character.js

// Función para cargar los datos del personaje
export function cargarDatosPersonaje(estado) {
    fetch("../../Control/JSON/Personaje.json")
        .then((response) => response.json())
        .then((personaje) => {
            estado.vida = personaje.vida || estado.vida; // Asigna o usa el valor existente
            estado.stress = personaje.stress || estado.stress;
            estado.subsuelo = personaje.subsuelo || estado.subsuelo;
            estado.evento = personaje.evento || estado.evento;
            estado.escenario = personaje.escenario || estado.escenario;
            estado.escudo = personaje.escudo || estado.escudo;
            estado.botas = personaje.botas || estado.botas;
            estado.torch = personaje.torch || estado.torch;

            actualizarDOM(
                estado.subsuelo,
                estado.vida,
                estado.stress,
                estado.escudo,
                estado.botas,
                estado.torch
            );
        })
        .catch((error) => console.error("Error al cargar los datos:", error));
}

// Función para actualizar el DOM (puedes personalizarla según tus necesidades)
export function actualizarDOM(subsuelo, vida, stress, escudo, botas, torch) {
    const playerFloor = document.getElementById("player-floor");
    if (playerFloor) {
        playerFloor.innerText = subsuelo;
    } else {
        console.error("Elemento 'player-floor' no encontrado");
    }

    // Actualizar vida
    for (let i = 1; i <= 4; i++) {
        const healthElement = document.getElementById(`player-health-${i}`);
        if (healthElement) {
            healthElement.style.filter =
                i <= vida / 25 ? "none" : "grayscale(100%)";
        } else {
            console.error(`Elemento 'player-health-${i}' no encontrado`);
        }
    }

    // Actualizar stress
    for (let i = 1; i <= 4; i++) {
        const brainElement = document.getElementById(`player-brain-${i}`);
        if (brainElement) {
            brainElement.style.filter =
                i <= stress / 25 ? "none" : "grayscale(100%)";
        } else {
            console.error(`Elemento 'player-brain-${i}' no encontrado`);
        }
    }

    // Actualizar escudo
    const shieldElement = document.getElementById("player-shield");
    if (shieldElement) {
        shieldElement.style.filter = escudo ? "none" : "grayscale(100%)";
    } else {
        console.error("Elemento 'player-shield' no encontrado");
    }

    // Actualizar botas
    const bootsElement = document.getElementById("player-boots");
    if (bootsElement) {
        bootsElement.style.filter = botas ? "none" : "grayscale(100%)";
    } else {
        console.error("Elemento 'player-boots' no encontrado");
    }

    // Actualizar antorcha
    for (let i = 1; i <= 10; i++) {
        const torchElement = document.getElementById(`player-torch-${i}`);
        if (torchElement) {
            torchElement.style.filter = i <= torch ? "none" : "grayscale(100%)";
        } else {
            console.error(`Elemento 'player-torch-${i}' no encontrado`);
        }
    }
}
