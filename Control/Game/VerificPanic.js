export function VerificPanic(stress) {
    console.log(`Valor de stress: ${stress}`); // Agrega esta línea para verificar el valor de stress

    // Cálculo de la probabilidad de pánico en función del estrés
    const panicProbability = Math.max(5, 50 - stress / 2); // 50% cuando stress = 0, 0% cuando stress = 100

    // Genera un número aleatorio entre 0 y 100
    const randomValue = Math.random() * 100;

    // Si el valor aleatorio es menor o igual a la probabilidad, ocurre pánico
    const panicOccurs = randomValue <= panicProbability;

    console.log(
        `Probabilidad de pánico: ${panicProbability}%, Valor generado: ${randomValue}, Ocurre pánico: ${panicOccurs}`
    );

    return panicOccurs; // Devuelve true si ocurre pánico, false si no
}
