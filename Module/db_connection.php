<?php
// Incluye el archivo de conexión a la base de datos
// Configuración de la conexión a la base de datos
$servername = "localhost"; // Cambia localhost por la dirección del servidor de tu base de datos si es diferente
$username = "root"; // Cambia "tu_usuario" por el nombre de usuario de tu base de datos
$password = ""; // Cambia "tu_contraseña" por la contraseña de tu base de datos
$database = "maze_db"; // Cambia "nombre_de_tu_base_de_datos" por el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}
?>
