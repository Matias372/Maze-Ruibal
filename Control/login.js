document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const messageBox = document.getElementById("messageBox");
    const spinner = document.getElementById("spinner");

    function showMessage(message, isError = false) {
        messageBox.textContent = message;
        messageBox.style.color = isError ? "red" : "green";
    }

    function validateForm(email, password) {
        if (!email || !password) {
            showMessage(
                "Por favor, complete ambos campos: email y contraseña.",
                true
            );
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage(
                "Por favor, ingrese un correo electrónico válido.",
                true
            );
            return false;
        }
        return true;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!validateForm(email, password)) return;

        spinner.style.display = "block";

        try {
            const response = await fetch("../../Module/Login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email: encodeURIComponent(email),
                    password: encodeURIComponent(password),
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const text = await response.text();
            try {
                const result = JSON.parse(text);
                if (result.status === "success") {
                    window.location.href = "Home.html";
                } else {
                    showMessage(result.message, true);
                }
            } catch (jsonError) {
                console.error("Error al analizar JSON:", jsonError);
                showMessage("Error en la respuesta del servidor.", true);
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            showMessage("Error en la conexión con el servidor.", true);
        } finally {
            spinner.style.display = "none";
        }
    });
});
