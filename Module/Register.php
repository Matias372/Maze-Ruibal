<?php
require 'db_connection.php';
session_start(); // Inicia la sesión para acceder al token CSRF

// Verificar el token CSRF
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    http_response_code(403); // Código de estado HTTP 403 Forbidden
    echo "CSRF token validation failed.";
    exit;
}

// Obtener datos del formulario y sanitizarlos
$uuid = filter_input(INPUT_POST, 'uuid', FILTER_SANITIZE_STRING);
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Validar la entrada
if (!$uuid || !$username || !$email || !$password) {
    http_response_code(400); // Código de estado HTTP 400 Bad Request
    echo "Invalid input.";
    exit;
}

// Verificar si el correo electrónico es válido
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Código de estado HTTP 400 Bad Request
    echo "Invalid email format.";
    exit;
}

// Encriptar contraseña
$passwordHash = password_hash($password, PASSWORD_BCRYPT);

// Valores predeterminados para los campos no ingresados
$imagen = null;
$floor = 0;
$time = '00:00:00';
$ultimo_acceso = null;

// Preparar y ejecutar la consulta SQL para insertar el nuevo usuario
$sql = "INSERT INTO usuarios (id, user, mail, password, imagen, floor, time, ultimo_acceso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ssssssis", $uuid, $username, $email, $passwordHash, $imagen, $floor, $time, $ultimo_acceso);
    
    if ($stmt->execute()) {
        echo "Registration successful.";
    } else {
        http_response_code(500); // Código de estado HTTP 500 Internal Server Error
        echo "Error: " . $stmt->error;
    }
    
    $stmt->close();
} else {
    http_response_code(500); // Código de estado HTTP 500 Internal Server Error
    echo "Error preparing statement: " . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
