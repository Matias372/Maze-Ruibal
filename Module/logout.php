<?php
session_start(); // Inicia la sesión

// Elimina todos los datos de la sesión
session_unset();

// Destruye la sesión
session_destroy();

// Redirige al usuario a la página de inicio de sesión
header("Location: ../Visual/HTML/Home.html");
exit();
?>
