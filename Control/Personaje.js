// personaje.js
class Personaje {
    constructor() {
        this.subsuelo = 0;
        this.escenario = "Inicio";
        this.evento = "Neutro";
        this.vida = 100;
        this.stress = 0;
        this.escudo = false; // true si el personaje tiene un escudo
        this.botas = false; // true si el personaje tiene botas
        this.torch = 10;
    }

    reiniciar() {
        this.subsuelo = 0;
        this.escenario = "Inicio";
        this.evento = "Neutro";
        this.vida = 100;
        this.stress = 0;
        this.escudo = false;
        this.botas = false;
        this.torch = 10;
    }

    recibirDaño() {
        this.vida -= 25;
    }

    obtenerEscudo() {
        this.escudo = true;
    }

    obtenerBotas() {
        this.botas = true;
    }

    perderEscudo() {
        this.escudo = false;
    }

    perderBotas() {
        this.botas = false;
    }

    aumentarVida() {
        this.vida = Math.min(this.vida + 25, 100); // la vida máxima es 100
    }

    cambiarEscenario(nuevoEscenario) {
        this.escenario = nuevoEscenario;
    }

    cambiarEvento(nuevoEvento) {
        this.evento = nuevoEvento;
    }

    SubirEscaleras() {
        this.subsuelo++;
    }

    TrampaHueco() {
        this.subsuelo--;
    }

    estaMuerto() {
        return this.vida <= 0;
    }
}

// Exporta la clase para usarla en otros archivos
export default Personaje;
