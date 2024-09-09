// personaje.js
class Personaje {
    constructor() {
        this.subsuelo = 1;
        this.escenario = "Inicio";
        this.evento = "Neutro";
        this.bifurcacion = " ";
        this.obstaculo = " ";
        this.vida = 100;
        this.escudo = false; // true si el personaje tiene un escudo
        this.botas = false; // true si el personaje tiene botas
    }

    reiniciar() {
        this.subsuelo = 1;
        this.escenario = "Inicio";
        this.evento = "Neutro";
        this.bifurcacion = " ";
        this.obstaculo = " ";
        this.vida = 100;
        this.escudo = false;
        this.botas = false;
    }

    recibirDaño(cantidad) {
        this.vida -= cantidad;
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

    aumentarVida(cantidad) {
        this.vida = Math.min(this.vida + cantidad, 100); // la vida máxima es 100
    }

    cambiarEscenario(nuevoEscenario) {
        this.escenario = nuevoEscenario;
    }

    cambiarEvento(nuevoEvento) {
        this.evento = nuevoEvento;
    }

    cambiarSubsuelo(nuevoSubsuelo) {
        this.subsuelo = nuevoSubsuelo;
    }

    estaMuerto() {
        return this.vida <= 0;
    }
}

// Exporta la clase para usarla en otros archivos
export default Personaje;
