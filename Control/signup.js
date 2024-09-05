document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Generar UUID manualmente
        const uuid = generateUUID();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const isUnique = await checkUUID(uuid);

            if (isUnique) {
                await registerUser(uuid, username, email, password);
            } else {
                alert("Error: UUID already exists. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    });

    const generateUUID = () => {
        // Genera un UUID v4
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    };

    const checkUUID = async (uuid) => {
        try {
            const response = await fetch("../../Module/check_uuid.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ uuid: uuid }),
            });

            const result = await response.text();
            return result.trim() === "unique";
        } catch (error) {
            console.error("Error checking UUID:", error);
            return false;
        }
    };

    const registerUser = async (uuid, username, email, password) => {
        try {
            const response = await fetch("../../Module/Register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    uuid: uuid,
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            const result = await response.text();
            alert(result); // Mostrar mensaje de éxito o error
            window.location.href = "Home.html";
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
});
