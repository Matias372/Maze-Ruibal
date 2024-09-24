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
    await enviarDatosMuerte(piso, tiempo);
}

// Función para enviar datos al servidor
async function enviarDatosMuerte(floor, timeInSeconds) {
    const formattedTime = formatTime(timeInSeconds);

    console.log(`Enviando datos: Floor: ${floor}, Time: ${formattedTime}`);
    try {
        const responseRanking = await fetch(
            "../../Module/user_record_verifier.php"
        );

        if (!responseRanking.ok) {
            throw new Error(
                `Error al obtener el ranking: ${responseRanking.status} - ${responseRanking.statusText}`
            );
        }

        const ranking = await responseRanking.json();

        if (!Array.isArray(ranking) || ranking.length === 0) {
            console.error(
                "La respuesta no es un array válido o está vacía:",
                ranking
            );
            return;
        }

        const currentRecord = ranking.find(
            (record) => record.floor === floor.toString() // Asegúrate de que estés buscando en el formato correcto
        );

        // Si no se encuentra el registro, imprimir el ranking completo para depuración
        if (!currentRecord) {
            console.error("No se encontró un registro para el piso:", floor);
            console.log("Ranking completo:", ranking);
            return; // O asignar un registro por defecto si lo deseas
        }

        const newFloor = floor;
        const currentFloor = parseInt(currentRecord.floor, 10); // Convertir a número para la comparación
        const currentTimeInSeconds = timeToSeconds(currentRecord.time);

        // Comprobar si el nuevo piso es mayor o si es igual y el tiempo es menor
        if (
            newFloor > currentFloor ||
            (newFloor === currentFloor && timeInSeconds < currentTimeInSeconds)
        ) {
            await guardarDatos(newFloor, formattedTime);
        } else {
            console.log(
                "No se requiere actualización, los datos son iguales o peores."
            );
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
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
