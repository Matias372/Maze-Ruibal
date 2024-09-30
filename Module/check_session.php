<?php
session_start();

// Asegúrate de que no haya salida antes de esto
header('Content-Type: application/json');

// Inicializa la respuesta
$response = [
    'loggedIn' => false,
    'profileImage' => '../../Assets/session/icon-perfil.svg' // Valor por defecto
];

// Verifica si hay una sesión activa
if (isset($_SESSION['user_id'])) {
    $response['loggedIn'] = true; // El usuario está conectado
    $response['profileImage'] = $_SESSION['imagen'] ?? $response['profileImage']; // Usa la imagen de perfil si está disponible
}

// Envía la respuesta como JSON
echo json_encode($response);
exit; // Asegúrate de salir después de enviar la respuesta
?>
