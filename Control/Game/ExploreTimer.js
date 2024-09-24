// ExploreTimer.js

let timer; // Variable para el cronómetro
let isExploring = false; // Estado de exploración
let startTime; // Tiempo de inicio global

// Función para iniciar el cronómetro
function startTimer() {
    isExploring = true;
    startTime = Date.now(); // Asigna el tiempo de inicio aquí

    timer = setInterval(() => {
        if (isExploring) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Tiempo en segundos

            //console.log(`Tiempo transcurrido: ${elapsedTime} segundos`); // Ejemplo de uso
        }
    }, 1000);
}

// Función para detener el cronómetro
function stopTimer() {
    isExploring = false;
    clearInterval(timer);
}

// Función para verificar la vida del personaje
function checkCharacterLife(vida) {
    if (typeof vida !== "number") {
        console.error("La vida debe ser un número.");
        return null; // Manejo de error si 'vida' no es un número
    }

    if (vida <= 0) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Tiempo transcurrido en segundos
        stopTimer();
        return elapsedTime; // Devuelve el tiempo que pasó hasta ahora
    }
    return null; // Devuelve null si la vida es mayor a 0
}

// Exportar las funciones
export { startTimer, stopTimer, checkCharacterLife };
