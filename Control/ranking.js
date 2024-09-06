// ranking.js

document.addEventListener("DOMContentLoaded", () => {
    fetchRankingData();
});

function fetchRankingData() {
    fetch("../../Module/getRanking.php")
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                populateRankingTable(data);
            } else {
                fillEmptyRanking();
            }
        })
        .catch((error) => {
            console.error("Error al obtener el ranking:", error);
            fillEmptyRanking(); // En caso de error, llena con filas vacías
        });
}

function populateRankingTable(data) {
    const tableBody = document.getElementById("ranking-table-body");
    tableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

    // Itera sobre los datos y crea filas de tabla
    data.forEach((player, index) => {
        const row = document.createElement("tr");
        row.className = "ranking__row"; // Clase para la fila
        row.innerHTML = `
        <td class="ranking__cell">${index + 1}</td>
        <td class="ranking__cell">${player.user}</td>
        <td class="ranking__cell">${player.floor}</td>
        <td class="ranking__cell">${player.time}</td>
      `;
        tableBody.appendChild(row);
    });

    // Si hay menos de 10 jugadores, completa con filas vacías
    for (let i = data.length; i < 10; i++) {
        const emptyRow = document.createElement("tr");
        emptyRow.className = "ranking__row"; // Clase para la fila vacía
        emptyRow.innerHTML = `
        <td class="ranking__cell">${i + 1}</td>
        <td class="ranking__cell">-</td>
        <td class="ranking__cell">-</td>
        <td class="ranking__cell">-</td>
      `;
        tableBody.appendChild(emptyRow);
    }
}

function fillEmptyRanking() {
    const tableBody = document.getElementById("ranking-table-body");
    tableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

    // Llena con filas vacías si no hay datos disponibles
    for (let i = 0; i < 10; i++) {
        const emptyRow = document.createElement("tr");
        emptyRow.className = "ranking__row"; // Clase para la fila vacía
        emptyRow.innerHTML = `
        <td class="ranking__cell">${i + 1}</td>
        <td class="ranking__cell">-</td>
        <td class="ranking__cell">-</td>
        <td class="ranking__cell">-</td>
      `;
        tableBody.appendChild(emptyRow);
    }
}
