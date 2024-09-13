<?php
// Configuración de la conexión a la base de datos
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'maze_db');

// Crear conexión
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

// Verificar la conexión
if ($conn->connect_error) {
    error_log("La conexión falló: " . $conn->connect_error);
    die("No se pudo conectar a la base de datos. Por favor, inténtelo más tarde.");
}

// Configuración adicional de la conexión (opcional)
$conn->set_charset('utf8mb4'); // Configura el juego de caracteres para manejar caracteres Unicode
?>
