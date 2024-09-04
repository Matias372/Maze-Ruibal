// Declara las variables
var subsuelo = 1;
var escenario = "Inicio";
var evento = "Neutro";
var bifurcacion = " ";
var obstaculo = " ";
var vida = 100;
var escudo = false; // Puedes cambiar a true si el personaje tiene un escudo
var botas = false;

// Obtén referencia a los botones
var botonIzquierda = document.querySelector('.options-Izquierda');
var botonFrente = document.querySelector('.options-Frente');
var botonDerecha = document.querySelector('.options-Derecha');
var botonVolver = document.querySelector('.options-Volver');
var botonUsar = document.querySelector('.options-Usar');
var botonExplorar = document.querySelector('.options-Explorar');
var botonContinuar = document.querySelector('.options-Continuar');

// Asigna el manejador de eventos a cada botón
botonIzquierda.addEventListener('click', function() {
    // Agrega aquí cualquier lógica adicional que desees ejecutar al hacer clic en el botón Izquierda
    generarEventoAleatorio();
});

botonFrente.addEventListener('click', function() {
    // Agrega aquí cualquier lógica adicional que desees ejecutar al hacer clic en el botón Frente
    generarEventoAleatorio();
});

botonDerecha.addEventListener('click', function() {
    // Agrega aquí cualquier lógica adicional que desees ejecutar al hacer clic en el botón Derecha
    generarEventoAleatorio();
});

botonVolver.addEventListener('click', function() {
    // Agrega aquí cualquier lógica adicional que desees ejecutar al hacer clic en el botón Volver
    generarEventoAleatorio();
});

botonUsar.addEventListener('click', function() {
    switch (escenario) {
        case "Tesoro":
            AbrirCofre();
            break;
        case "Fuente":
            vida += 25;
            modificarDescripcionEvento("Tomaste agua de la fuente y recuperaste algo de vida.");
            ocultarTodosLosBotones();
            mostrarBotonContinuar();
            break;
        case "Escaleras hacia Abajo":
            subsuelo ++;
            generarEventoAleatorio();
            break;
        // Otros casos si es necesario
        default:
            // Lógica para otros escenarios no especificados
            break;
    }
});

botonExplorar.addEventListener('click', function() {
    // Agrega aquí cualquier lógica adicional que desees ejecutar al hacer clic en el botón Explorar
    generarEventoAleatorio();
});

botonContinuar.addEventListener('click', function() {
    // Verifica si el escenario actual no es "death"
    if (escenario !== "Death") {
        // Agrega aquí cualquier lógica adicional que desees ejecutar al hacer clic en el botón Continuar
        VerificarVida();
    } else if (escenario == "Death") {
        // Si el escenario es "death", reinicia el juego
        iniciarJuego();
    }
});

// Función de inicio
function iniciarJuego() {

    subsuelo = 1;
    escenario = "Inicio";
    evento = "Neutro";
    bifurcacion = " ";
    obstaculo = " ";
    vida = 100;
    escudo = false; // Puedes cambiar a true si el personaje tiene un escudo
    botas = false;
    // Oculta todos los botones
    ocultarTodosLosBotones();
    // Muestra el botón de Explorar
    mostrarBotonExplorar();
    // Cambia el fondo de pantalla a color marrón
    cambiarFondoPantalla("#8B4513"); // Color marrón
    // Modifica el contenido del div 'event-description'
    modificarDescripcionEvento("Ten cuidado, las sombras esconden criaturas hostiles y trampas mortales. Los pasillos cambian misteriosamente, un camino que tomes podría transformarse en algo completamente distinto cuando vuelvas.");
    
}
//-funcion death
function VerificarVida() {
    if (vida <= 0) {
        escenario = "Death";
        modificarDescripcionEvento("¡Has perdido! Tu aventura ha llegado a su fin.");
        cambiarFondoPantalla("#000000"); // Cambia el fondo a negro
        ocultarTodosLosBotones();
        mostrarBotonContinuar();
    } else {
        // Si la vida es mayor que 0, el juego continúa
        generarEventoAleatorio();
    }
}

// Función para ocultar todos los botones excepto el de Explorar
function ocultarTodosLosBotones() {
    var botones = document.querySelectorAll('#options-container button');
    botones.forEach(function (boton) {
        boton.style.display = 'none';
    });
}
// Funciones para mostrar botones específicos
function mostrarBotonIzquierda() {
    var botonIzquierda = document.querySelector('.options-Izquierda');
    botonIzquierda.style.display = 'block';
}

function mostrarBotonFrente() {
    var botonFrente = document.querySelector('.options-Frente');
    botonFrente.style.display = 'block';
}

function mostrarBotonDerecha() {
    var botonDerecha = document.querySelector('.options-Derecha');
    botonDerecha.style.display = 'block';
}

function mostrarBotonVolver() {
    var botonVolver = document.querySelector('.options-Volver');
    botonVolver.style.display = 'block';
}

function mostrarBotonUsar() {
    var botonUsar = document.querySelector('.options-Usar');
    botonUsar.style.display = 'block';
}

function mostrarBotonExplorar() {
    var botonExplorar = document.querySelector('.options-Explorar');
    botonExplorar.style.display = 'block';
}

function mostrarBotonContinuar() {
    var botonContinuar = document.querySelector('.options-Continuar');
    botonContinuar.style.display = 'block';
}

// Función para cambiar el fondo de pantalla
function cambiarFondoPantalla(color) {
    document.getElementById('game-container').style.backgroundColor = color;
}

// Función para modificar el contenido del div 'event-description'
function modificarDescripcionEvento(texto) {
    var descripcionEvento = document.getElementById('event-description');
    descripcionEvento.textContent = texto;
}

//==========================================CAMBIO DE EVENTO Y ESCENARIO==========================================
function generarEventoAleatorio() {
    var randomNumber = Math.random() * 100; // Genera un número aleatorio entre 0 y 100

    if (randomNumber < 60) {
        evento = "Neutro";
        generarNeutroAleatorio();
    } else if (randomNumber < 80) {
        evento = "Positivo";
        generarPositivoAleatorio();
    } else {
        evento = "Negativo";
        generarNegativoAleatorio();
    }
}

// Nueva función para generar escenario neutro aleatorio
function generarNeutroAleatorio() {
    var randomNumber = Math.random() * 100; // Genera un número aleatorio entre 0 y 100

    if (randomNumber < 60) {
        escenario = "Bifurcación";
    } else if (randomNumber < 90) {
        escenario = "Encuentra un Obstáculo";
    } else {
        escenario = "Escaleras hacia Abajo";
    }
    SwitchControl()
}

// Nueva función para generar escenario positivo aleatorio
function generarPositivoAleatorio() {
    var randomNumber = Math.random() * 100; // Genera un número aleatorio entre 0 y 100

    if (randomNumber < 50) {
        escenario = "Tesoro";
    } else {
        escenario = "Fuente";
    }
    SwitchControl()
}

function generarNegativoAleatorio() {
    var randomNumber = Math.random() * 100; // Genera un número aleatorio entre 0 y 100

    if (randomNumber < 14) {
        escenario = "Pozo";
    } else if (randomNumber < 57) {
        escenario = "Trampa";
    } else {
        escenario = "Criatura";
    }
    SwitchControl()
}
//=======================================ABRIR COFRE=======================================
function AbrirCofre() {
    // Verifica si ya tienes un escudo o botas
    if (escudo || botas) {
        // Si ya tienes un objeto, intenta obtener el otro objeto o encuentra una trampa
        var randomNumber = Math.random() * 100; // Genera un número aleatorio entre 0 y 100

        if ((escudo || botas) && randomNumber < 55) {
            // Obtener el otro objeto solo si ya tienes uno
            if (botas) {
                modificarDescripcionEvento("¡Encontraste un viejo escudo! Ahora estás mejor protegido.");
                escudo = true;
                ocultarTodosLosBotones();
                mostrarBotonContinuar();
            } else {
                botas = true;
                modificarDescripcionEvento("¡Encontraste unas botas! Ahora puedes reaccionar más rápido.");
                ocultarTodosLosBotones();
                mostrarBotonContinuar();
            }
        } else {
            // Obtener trampa (o cualquier otro objeto que desees)
            if (botas) {
                // Si tiene botas, evita la trampa
                modificarDescripcionEvento("¡Apareció una trampa, pero lograste esquivarla a tiempo!");
                botas = false; // Devuelve las botas a false
                ocultarTodosLosBotones();
                mostrarBotonContinuar();
            } else {
                // Si no tiene botas, sufre el impacto de la trampa
                modificarDescripcionEvento("¡Apareció una trampa! Perdiste 25 de vida.");
                vida -= 25;
                ocultarTodosLosBotones();
                mostrarBotonContinuar();
            }
        }
    } else {
        // Si no tienes ningún objeto, realiza la lógica de obtención aleatoria como antes
        var randomNumber = Math.random() * 100; // Genera un número aleatorio entre 0 y 100

        if (randomNumber < 33) {
            // Obtener escudo
            modificarDescripcionEvento("¡Encontraste un viejo escudo! Ahora estás mejor protegido.");
            escudo = true;
            botas = false;
            ocultarTodosLosBotones();
            mostrarBotonContinuar();
        } else if (randomNumber < 66) {
            // Obtener botas
            modificarDescripcionEvento("¡Encontraste unas botas! Ahora puedes reaccionar más rápido.");
            escudo = false;
            botas = true;
            ocultarTodosLosBotones();
            mostrarBotonContinuar();
        } else {
            // Obtener trampa (o cualquier otro objeto que desees)
            modificarDescripcionEvento("¡Apareció una trampa! Perdiste 25 de vida.");
            escudo = false;
            botas = false;
            vida -= 25;
            ocultarTodosLosBotones();
            mostrarBotonContinuar();
        }
    }
}


//====================================OBSTACULO====================================
function generarObstaculoAleatorio() {
    var opcionesObstaculo = ["Pared", "Puerta", "Escombro"];

    // Genera un índice aleatorio
    var indiceAleatorio = Math.floor(Math.random() * opcionesObstaculo.length);

    // Asigna el valor del obstáculo aleatorio a la variable
    obstaculo = opcionesObstaculo[indiceAleatorio];
}

//===================================Bifurcacion===================================
function generarBifurcacionAleatoria() {
    var opcionesBifurcacion = ["Izquierda - Derecha", "Izquierda - Frente", "Izquierda - Frente - Derecha", "Frente - Derecha"];
    
    // Genera un índice aleatorio
    var indiceAleatorio = Math.floor(Math.random() * opcionesBifurcacion.length);
    
    // Asigna el valor de bifurcacion aleatorio
    bifurcacion = opcionesBifurcacion[indiceAleatorio];
}
//=================================SWITCH CONTROL=================================
function SwitchControl() {
    switch (escenario) {
        case "Bifurcación":
            // Genera una bifurcación aleatoria
            generarBifurcacionAleatoria();

            // Modifica la descripción del evento
            modificarDescripcionEvento("Te encuentras en una bifurcación.");

            // Oculta todos los botones
            ocultarTodosLosBotones();

            // Maneja la bifurcación específica
            switch (bifurcacion) {
                case "Izquierda - Derecha":
                    // Cambia el fondo del game-container a Púrpura Oscuro
                    cambiarFondoPantalla("#800080");
                    mostrarBotonIzquierda();
                    mostrarBotonDerecha();
                    break;
                case "Izquierda - Frente":
                    // Cambia el fondo del game-container a Rojo Oscuro
                    cambiarFondoPantalla("#8B0000");
                    mostrarBotonIzquierda();
                    mostrarBotonFrente();
                    break;
                case "Izquierda - Frente - Derecha":
                    // Cambia el fondo del game-container a Azul Oscuro
                    cambiarFondoPantalla("#000080");
                    mostrarBotonIzquierda();
                    mostrarBotonFrente();
                    mostrarBotonDerecha();
                    break;
                case "Frente - Derecha":
                    // Cambia el fondo del game-container a Verde Oscuro
                    cambiarFondoPantalla("#006400");
                    mostrarBotonFrente();
                    mostrarBotonDerecha();
                    break;
                default:
                    // Lógica para manejar otras bifurcaciones no especificadas
                    break;
            }
            break;
        case "Encuentra un Obstáculo":
            // Genera un obstáculo aleatorio
            generarObstaculoAleatorio();
            // Modifica la descripción del evento general
            modificarDescripcionEvento("Te encuentras con un obstáculo.");
            // Cambia el fondo del game-container según el tipo de obstáculo
            switch (obstaculo) {
                case "Pared":
                    cambiarFondoPantalla("#696969"); // Gris oscuro
                    break;
                case "Puerta":
                    cambiarFondoPantalla("#8B4513"); // Marrón
                    break;
                case "Escombro":
                    cambiarFondoPantalla("#A52A2A"); // Marrón rojizo
                    break;
                default:
                    // Lógica para manejar otros obstáculos no especificados
                    break;
            }
            // Oculta todos los botones
            ocultarTodosLosBotones();
            // Muestra el botón Volver
            mostrarBotonVolver();
            break;
        case "Escaleras hacia Abajo":
            cambiarFondoPantalla("#696969");
            ocultarTodosLosBotones();
            mostrarBotonVolver();
            mostrarBotonUsar();
            modificarDescripcionEvento("Has encontrado  las escaleras a pisos inferiores");
            break;
        case "Tesoro":
            // Oculta todos los botones
            ocultarTodosLosBotones();
            // Cambia el fondo del game-container a Dorado
            cambiarFondoPantalla("#FFD700");
            // Modifica la descripción del evento
            modificarDescripcionEvento("¡Has encontrado un cofre!");
            // Muestra los botones Usar y Volver
            mostrarBotonUsar();
            mostrarBotonVolver();
            break;
        case "Fuente":
            // Oculta todos los botones
            ocultarTodosLosBotones();
            // Cambia el fondo del game-container a Azul Claro
            cambiarFondoPantalla("#ADD8E6");
            // Modifica la descripción del evento
            modificarDescripcionEvento("¡Has encontrado una fuente rejuvenecedora!");
            // Muestra los botones Usar y Volver
            if (vida < 100){
                mostrarBotonUsar();
            }
            mostrarBotonVolver();
            break;
        case "Pozo":
            // Cambia el fondo del game-container a Marrón Oscuro
            cambiarFondoPantalla("#8B4513");
            // Modifica la descripción del evento
            modificarDescripcionEvento("¡Te has caido en un pozo profundo!");
            // Descuenta la vida en 25 puntos
            vida -= 25;
            // Oculta todos los botones
            ocultarTodosLosBotones();
            // Muestra el botón Continuar
            mostrarBotonContinuar();
            break;

        case "Trampa":
            // Cambia el fondo del game-container a Gris Oscuro
            cambiarFondoPantalla("#696969");
            if (botas) {
                modificarDescripcionEvento("¡Activaste una trampa, pero lograste esquivarla a tiempo gracias a tus botas!");
                botas = false;
            } else {
                // No tiene botas, resta vida
                vida -= 25;
                modificarDescripcionEvento("¡Activaste una trampa y perdiste 25 puntos de vida!");
            }
            // Oculta todos los botones
            ocultarTodosLosBotones();
            // Muestra el botón Continuar
            mostrarBotonContinuar();
            break;

        case "Criatura":
            // Cambia el fondo del game-container a Rojo Oscuro
            cambiarFondoPantalla("#8B0000");
            if (escudo) {
                modificarDescripcionEvento("¡Te has encontrado con una criatura hostil, pero lograste defenderte con tu escudo antes de escapar de ella!");
                // Reinicia la variable del objeto
                escudo = false;
            } else {
                // No tiene escudo, resta vida
                vida -= 25;
                modificarDescripcionEvento("¡Te has encontrado con una criatura hostil y perdiste 25 puntos de vida mientras escapabas!");
            }
            
            // Oculta todos los botones
            ocultarTodosLosBotones();
            // Muestra el botón Continuar
            mostrarBotonContinuar();
            break;
        default:
            // Lógica para manejar otros escenarios no especificados
            break;
    }
}

// EJECUTA FUNCION AL INICIO DEL PROGRAMA
window.onload = function () {
    iniciarJuego();
};