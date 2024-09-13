document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const messageDiv = document.createElement("div");
    form.appendChild(messageDiv);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const csrfToken = form.querySelector('input[name="csrf_token"]').value;
        const uuid = generateUUID();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !email || !password) {
            showMessage("Please fill in all fields.", "danger");
            return;
        }

        if (!validateEmail(email)) {
            showMessage("Please enter a valid email address.", "danger");
            return;
        }

        try {
            const isUnique = await checkUUID(uuid);

            if (isUnique) {
                await registerUser(uuid, username, email, password, csrfToken);
            } else {
                showMessage(
                    "Error: UUID already exists. Please try again.",
                    "danger"
                );
            }
        } catch (error) {
            showMessage(
                "An unexpected error occurred. Please try again later.",
                "danger"
            );
        }
    });

    const generateUUID = () => {
        // Genera un UUID v4
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    const checkUUID = async (uuid) => {
        try {
            const response = await fetch("../../Module/check_uuid.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ uuid }),
            });

            const result = await response.text();
            return result.trim() === "unique";
        } catch (error) {
            console.error("Error checking UUID:", error);
            return false;
        }
    };

    const registerUser = async (uuid, username, email, password, csrfToken) => {
        try {
            const response = await fetch("../../Module/Register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    uuid,
                    username,
                    email,
                    password,
                    csrf_token: csrfToken,
                }),
            });

            const result = await response.text();
            showMessage(result, response.ok ? "success" : "danger");
            if (response.ok) {
                setTimeout(() => (window.location.href = "Home.html"), 2000);
            }
        } catch (error) {
            console.error("Error registering user:", error);
            showMessage(
                "An unexpected error occurred. Please try again later.",
                "danger"
            );
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const showMessage = (message, type) => {
        messageDiv.textContent = message;
        messageDiv.className = `alert alert-${type}`;
        messageDiv.style.display = "block";
    };
});
