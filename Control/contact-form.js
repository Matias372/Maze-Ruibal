// contact-form.js

document.addEventListener("DOMContentLoaded", function () {
    // Configura EmailJS
    emailjs.init({
        publicKey: "X9KKi_KEI1ovvrocR",
    }); // Reemplaza 'YOUR_USER_ID' con tu ID de usuario de EmailJS

    // Obtén el formulario y agrega un event listener para el envío
    const form = document.getElementById("contact-form");
    const responseMessage = document.getElementById("response-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previene el envío estándar del formulario

        // Obtén los valores del formulario
        const email = document.getElementById("email").value;
        const reason = document.getElementById("reason").value;
        const message = document.getElementById("message").value;

        // Enviar el formulario usando EmailJS
        emailjs
            .send("service_de7snee", "template_cm6tfik", {
                email: email,
                reason: reason,
                message: message,
            })
            .then(
                function (response) {
                    console.log("Sent successfully", response);
                    // Actualiza el mensaje y color de fondo
                    responseMessage.textContent =
                        "Your message has been sent successfully!";
                    responseMessage.style.color = "green";
                    responseMessage.style.backgroundColor = "#d4edda"; // Color de fondo para éxito
                    form.reset(); // Resetea el formulario después de enviar
                },
                function (error) {
                    console.log("Failed to send", error);
                    // Actualiza el mensaje y color de fondo
                    responseMessage.textContent =
                        "There was a problem sending your message. Please try again.";
                    responseMessage.style.color = "red";
                    responseMessage.style.backgroundColor = "#f8d7da"; // Color de fondo para error
                }
            );
    });
});
