<?php
session_start();

// Generar un nuevo token CSRF si no existe uno en la sesión
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Register</title>
        <!-- Metadatos -->
        <meta name="author" content="Matias Ruibal" />
        <meta name="github" content="https://github.com/Matias372" />
        
        <!-- Modificar el Content Security Policy para permitir los recursos necesarios -->
        <meta
    http-equiv="Content-Security-Policy"
    content="
        default-src 'self';
        script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://stackpath.bootstrapcdn.com;
        style-src 'self' https://fonts.googleapis.com https://stackpath.bootstrapcdn.com 'unsafe-inline';
        font-src https://fonts.gstatic.com;
    "
/>
        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="../CSS/General_Style.css" />
        <script src="../../Control/signup.js" defer></script>
    </head>
    <body>
        <div id="Header">
            <!-- Contenido del encabezado se incluirá aquí -->
        </div>

        <main id="Main" class="signup-main container">
            <h1 class="signup-main__title">Sign Up</h1>
            <form
                id="signupForm"
                class="signup-main__form"
                method="POST"
                action="../../Module/Register.php"
            >
                <!-- Campo CSRF Token -->
                <input
                    type="hidden"
                    name="csrf_token"
                    value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>"
                />

                <div class="form-group">
                    <label for="username" class="form-label">User:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        class="form-control"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        required
                    />
                </div>

                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
        </main>

        <div id="Footer">
            <!-- Contenido del pie de página se incluirá aquí -->
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.9/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <!-- Script para incluir Header y Footer -->
        <script src="../../Control/IncludeHeaderFooter.js"></script>
    </body>
</html>
