<?php
session_start();

$response = [
    'loggedIn' => isset($_SESSION['user_id']),
    'profileImage' => isset($_SESSION['imagen']) && $_SESSION['imagen'] !== null
        ? $_SESSION['imagen']
        : '../../Assets/session/icon-perfil.svg'
];

header('Content-Type: application/json');
echo json_encode($response);
?>
