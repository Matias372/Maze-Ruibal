<?php
require 'db_connection.php';

// Obtener datos del formulario
$uuid = $_POST['uuid'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Encriptar contraseña

// Valores predeterminados para los campos no ingresados
$imagen = null; // Imagen no proporcionada
$floor = 0; // Valor por defecto para el piso
$time = '00:00:00'; // Tiempo por defecto
$ultimo_acceso = null; // Fecha del último acceso no proporcionada

// Preparar y ejecutar la consulta SQL para insertar el nuevo usuario
$sql = "INSERT INTO usuarios (id, user, mail, password, imagen, floor, time, ultimo_acceso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssis", $uuid, $username, $email, $password, $imagen, $floor, $time, $ultimo_acceso);

if ($stmt->execute()) {
    echo "Registro exitoso.";
} else {
    echo "Error: " . $stmt->error;
}

// Cerrar conexión
$stmt->close();
$conn->close();
?>