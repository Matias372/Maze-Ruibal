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
                console.error("No se recibieron datos válidos.");
            }
        })
        .catch((error) => {
            console.error("Error al obtener el ranking:", error);
        });
}

function populateRankingTable(data) {
    const tableBody = document.getElementById("ranking-table-body");
    tableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

    // Itera sobre los datos y crea filas de tabla
    data.forEach((player, index) => {
        const row = document.createElement("tr");
        row.className = "ranking__row";
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
        emptyRow.className = "ranking__row";
        emptyRow.innerHTML = `
            <td class="ranking__cell">${i + 1}</td>
            <td class="ranking__cell">-</td>
            <td class="ranking__cell">-</td>
            <td class="ranking__cell">-</td>
        `;
        tableBody.appendChild(emptyRow);
    }
}
