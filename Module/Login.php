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

// Verifica que los datos POST estén definidos
if (isset($_POST['email']) && isset($_POST['password'])) {
    // Obtiene los datos del formulario POST
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepara la consulta para verificar si el correo electrónico existe en la tabla usuarios
    $query = "SELECT * FROM usuarios WHERE mail = ?";
    $stmt = $conn->prepare($query);
    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        // Verifica si se encontró un usuario con el correo electrónico dado
        if ($result->num_rows > 0) {
            // Obtiene los datos del usuario
            $row = $result->fetch_assoc();
            $userId = $row['id'];
            $username = $row['user'];
            $hashedPassword = $row['password'];
            $imagen = $row['imagen'];
            $floor = $row['floor'];
            $time = $row['time'];

            // Verifica si la contraseña coincide
            if (password_verify($password, $hashedPassword)) {
                // La contraseña es correcta, inicia sesión y guarda los datos en la sesión
                session_start();
                
                // Actualizar la columna "ultimo_acceso" con la fecha y hora actual
                $current_time = date("Y-m-d H:i:s");
                $update_sql = $conn->prepare("UPDATE usuarios SET ultimo_acceso = ? WHERE Id = ?");
                $update_sql->bind_param("si", $current_time, $userId);
                $update_sql->execute();
                $update_sql->close();

                // Guardar los valores en variables de sesión
                $_SESSION['user_id'] = $userId;
                $_SESSION['user'] = $username;
                $_SESSION['mail'] = $email;
                $_SESSION['imagen'] = $imagen;
                $_SESSION['floor'] = $floor;
                $_SESSION['time'] = $time;

                // Devuelve un mensaje de éxito al JavaScript
                echo json_encode(["status" => "success", "message" => "Inicio de sesión exitoso"]);
            } else {
                // La contraseña es incorrecta, devuelve un mensaje de error al JavaScript
                echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
            }
        } else {
            // No se encontró un usuario con el correo electrónico dado, devuelve un mensaje de error al JavaScript
            echo json_encode(["status" => "error", "message" => "El correo no existe"]);
        }

        // Cierra la conexión y libera los recursos
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Error en la consulta"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
}
?>
