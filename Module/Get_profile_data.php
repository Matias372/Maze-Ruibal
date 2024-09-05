<?php
session_start();

$response = [
    'loggedIn' => isset($_SESSION['user_id']),
    'profileImage' => isset($_SESSION['imagen']) && $_SESSION['imagen'] !== null
        ? $_SESSION['imagen']
        : '../../Assets/session/icon-perfil.svg',
    'username' => isset($_SESSION['user']) ? $_SESSION['user'] : 'No User',
    'mail' => isset($_SESSION['mail']) ? $_SESSION['mail'] : 'No Mail',
    'floor' => isset($_SESSION['floor']) ? $_SESSION['floor'] : '0',
    'time' => isset($_SESSION['time']) ? $_SESSION['time'] : '00:00:00',
];

header('Content-Type: application/json');
echo json_encode($response);
?>
