document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Por favor, complete ambos campos: email y contraseña.");
            return;
        }

        try {
            const response = await fetch("../../Module/Login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: email,
                    password: password,
                }),
            });

            const text = await response.text(); // Obtén el texto en lugar del JSON directamente para depurar

            try {
                const result = JSON.parse(text); // Intenta analizar el texto como JSON
                if (result.status === "success") {
                    // Redirigir a la página principal si el inicio de sesión es exitoso
                    window.location.href = "Home.html"; // Cambia esto a la URL de tu página principal
                } else {
                    alert(result.message); // Muestra el mensaje de error recibido desde PHP
                }
            } catch (jsonError) {
                console.error("Error al analizar JSON:", jsonError);
                console.log("Respuesta no JSON:", text); // Muestra la respuesta completa en la consola para depurar
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
        }
    });
});
