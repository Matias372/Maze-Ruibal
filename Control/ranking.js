document.addEventListener("DOMContentLoaded", () => {
    fetchRankingData();
});

async function fetchRankingData() {
    try {
        const response = await fetch("../../Module/getRanking.php");
        if (!response.ok)
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            populateRankingTable(data);
        } else {
            console.error("No se recibieron datos válidos.");
        }
    } catch (error) {
        console.error("Error al obtener el ranking:", error);
    }
}

function populateRankingTable(data) {
    const tableBody = document.getElementById("ranking-table-body");
    tableBody.innerHTML = ""; // Limpia la tabla antes de llenarla

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

    // Completar con filas vacías si hay menos de 10 jugadores
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
