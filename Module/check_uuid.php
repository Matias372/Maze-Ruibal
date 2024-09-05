<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root"; // Cambia esto si es necesario
$password = ""; // Cambia esto si es necesario
$dbname = "maze_db"; // Cambia esto por tu nombre de base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener UUID enviado
$uuid = $_POST['uuid'];

// Verificar que el UUID no exista en la base de datos
$sql = "SELECT COUNT(*) FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $uuid);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

if ($count > 0) {
    echo "duplicate";
} else {
    echo "unique";
}

// Cerrar conexión
$conn->close();
?>
