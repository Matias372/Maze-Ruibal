// Función para convertir segundos a formato HH:MM:SS
function formatTime(seconds) {
    if (typeof seconds !== "number" || isNaN(seconds)) {
        return "00:00:00"; // Retorna un formato por defecto en caso de error
    }
    const hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");

    return `${hours}:${minutes}:${secs}`;
}

// Función para mostrar el mensaje de muerte
async function mostrarMensajeMuerte(piso, tiempo) {
    const deathMessageDiv = document.getElementById("death-message");
    const formattedTime = formatTime(tiempo);

    deathMessageDiv.innerHTML = `
        <h2>You have died!</h2>
        <p>You reached floor: ${piso}</p>
        <p>Your time was: ${formattedTime}</p>
    `;

    deathMessageDiv.style.display = "flex"; // Mostrar el div
    await enviarDatosMuerte(piso, tiempo); // Enviar datos al servidor
}

// Función para enviar datos al servidor
async function enviarDatosMuerte(floor, timeInSeconds) {
    console.log(
        `Enviando datos: Piso: ${floor}, Tiempo: ${timeInSeconds} segundos`
    );
    try {
        const responseRanking = await fetch(
            "../../Module/user_record_verifier.php"
        );

        // Verifica la respuesta de la red
        if (!responseRanking.ok) {
            alert(
                `Error al obtener el ranking: ${responseRanking.status} - ${responseRanking.statusText}`
            );
            throw new Error(
                `Error al obtener el ranking: ${responseRanking.status} - ${responseRanking.statusText}`
            );
        }

        const text = await responseRanking.text(); // Obtener respuesta como texto
        console.log("Texto recibido:", text); // Para depurar
        let ranking;

        try {
            ranking = JSON.parse(text); // Intenta parsear como JSON
        } catch (jsonError) {
            console.error("Error al analizar JSON:", jsonError);
            alert(
                "Error al analizar la respuesta del servidor. Respuesta recibida: " +
                    text
            );
            return;
        }

        console.log("Datos de ranking recibidos:", ranking);

        // Verifica si es un array válido
        if (!Array.isArray(ranking) || ranking.length !== 1) {
            console.error(
                "La respuesta no es un array válido o no contiene un registro:",
                ranking
            );
            alert("La respuesta no es válida o no contiene un registro.");
            return;
        }

        const currentRecord = ranking[0];
        const currentTimeInSeconds = timeToSeconds(currentRecord.time);

        const newFloor = floor;

        if (newFloor === 0 && currentRecord.time === "00:00:00") {
            await guardarDatos(newFloor, formatTime(timeInSeconds));
            return; // Salir de la función después de guardar
        }

        // Compara y decide si actualizar
        if (
            floor > currentRecord.floor ||
            (floor === currentRecord.floor &&
                timeInSeconds < currentTimeInSeconds)
        ) {
            await guardarDatos(floor, formatTime(timeInSeconds));
        } else {
            console.log(
                "No se requiere actualización, los datos son iguales o peores."
            );
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Error en la conexión: " + error);
    }
}

async function guardarDatos(piso, tiempo) {
    console.log("Intentando guardar datos:", piso, tiempo);

    try {
        const response = await fetch("../../Module/update_user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                floor: piso,
                time: tiempo,
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }

        const result = await response.json();
        if (result.status === "success") {
            console.log("Datos actualizados correctamente.");
        } else {
            console.error("Error al actualizar datos:", result.message);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

function timeToSeconds(time) {
    const parts = time.split(":");
    return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
    );
}

// Exportar la función
export { mostrarMensajeMuerte };
