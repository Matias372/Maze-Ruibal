// Character.js

// Clase Personaje
export class Personaje {
    constructor() {
        this.subsuelo = 0;
        this.escenario = "StartingRoom";
        this.evento = "Neutro";
        this.vida = 100;
        this.stress = 0;
        this.escudo = false;
        this.botas = false;
        this.torch = 10;
        this.lastEvent = "Neutro";
        this.lastScenario = "StartingRoom";
        this.lastFountainFloor = -1;
        this.ItemUsed = false;
        this.MAX_VIDA = 100;
        this.MAX_STRESS = 100;
        this.MAX_TORCH = 10;
    }

    // Método para cargar los datos del personaje
    cargarDatos() {
        fetch("../../Control/JSON/Personaje.json")
            .then((response) => response.json())
            .then((personaje) => {
                this.vida = personaje.vida || this.vida;
                this.stress = personaje.stress || this.stress;
                this.subsuelo = personaje.subsuelo || this.subsuelo;
                this.evento = personaje.evento || this.evento;
                this.escenario = personaje.escenario || this.escenario;
                this.escudo = personaje.escudo || this.escudo;
                this.botas = personaje.botas || this.botas;
                this.torch = personaje.torch || this.torch;

                // Actualizar el DOM con los datos cargados
                this.actualizarDOM();
            })
            .catch((error) =>
                console.error("Error al cargar los datos:", error)
            );
    }

    // Método para actualizar el DOM
    actualizarDOM() {
        const playerFloor = document.getElementById("player-floor");
        if (playerFloor) {
            playerFloor.innerText = this.subsuelo;
        } else {
            console.error("Elemento 'player-floor' no encontrado");
        }

        // Actualizar vida
        for (let i = 1; i <= 4; i++) {
            const healthElement = document.getElementById(`player-health-${i}`);
            if (healthElement) {
                healthElement.style.filter =
                    i <= this.vida / 25 ? "none" : "grayscale(100%)";
            } else {
                console.error(`Elemento 'player-health-${i}' no encontrado`);
            }
        }

        // Actualizar stress
        for (let i = 1; i <= 4; i++) {
            const brainElement = document.getElementById(`player-brain-${i}`);
            if (brainElement) {
                brainElement.style.filter =
                    i <= this.stress / 25 ? "none" : "grayscale(100%)";
            } else {
                console.error(`Elemento 'player-brain-${i}' no encontrado`);
            }
        }

        // Actualizar escudo
        const shieldElement = document.getElementById("player-shield");
        if (shieldElement) {
            shieldElement.style.filter = this.escudo
                ? "none"
                : "grayscale(100%)";
        } else {
            console.error("Elemento 'player-shield' no encontrado");
        }

        // Actualizar botas
        const bootsElement = document.getElementById("player-boots");
        if (bootsElement) {
            bootsElement.style.filter = this.botas ? "none" : "grayscale(100%)";
        } else {
            console.error("Elemento 'player-boots' no encontrado");
        }

        // Actualizar antorcha
        for (let i = 1; i <= 10; i++) {
            const torchElement = document.getElementById(`player-torch-${i}`);
            if (torchElement) {
                torchElement.style.filter =
                    i <= this.torch ? "none" : "grayscale(100%)";
            } else {
                console.error(`Elemento 'player-torch-${i}' no encontrado`);
            }
        }
    }
}
