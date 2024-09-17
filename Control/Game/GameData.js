// Datos del juego organizados por tipo de escenario
export const gameData = {
    scenarios: {
        Positivo: [
            {
                id: 7,
                name: "Corridor-Stairs",
                description:
                    "You stand before a staircase leading to the upper floor. The structure looks solid and well-preserved. Perhaps it leads to a safer level.",
                options: [
                    {
                        text: "Go up",
                        clase: "options-Usar",
                        effect: { floor: +1 },
                        nextScenario: null,
                    },
                ],
            },
            {
                id: 8,
                name: "Corridor-Fountain",
                description:
                    "A fountain with crystal-clear water stands in the center of the corridor. The water looks fresh and revitalizing. Maybe you can take a sip to regain strength.",
                options: [
                    {
                        text: "Drink",
                        clase: "options-Usar",
                        effect: { health: +25 },
                        nextScenario: null,
                    },
                    {
                        text: "Continue",
                        clase: "options-Continuar",
                        nextScenario: null,
                    },
                ],
            },
            {
                id: 9,
                name: "Corridor-Fountain (w/ torch)",
                description:
                    "A fountain with crystal-clear water stands in the center of the corridor. Nearby, you find a discarded torch.",
                options: [
                    {
                        text: "Drink",
                        clase: "options-Usar",
                        effect: { health: +25 },
                        nextScenario: null,
                    },
                    {
                        text: "Continue",
                        clase: "options-Continuar",
                        nextScenario: null,
                    },
                ],
            },
            {
                id: 10,
                name: "Corridor-Fountain (panic)",
                description: {
                    default:
                        "In a frantic dash through the dark corridors, you suddenly find yourself at a familiar spot—the fountain where you last rested. The soothing sound of water offers a brief moment of solace amidst your fear. Will drinking calm you down, or is it too late to regain control?",
                    withItem:
                        "In your panic, you stumble upon a new, unexpected fountain. The sight of the crystal-clear water is a rare comfort in your state of distress. Will this newfound source help you regain your composure, or will the fear prove too overwhelming?",
                },
                options: [
                    {
                        text: "Drink",
                        clase: "options-Usar",
                        effect: { health: +25 },
                        nextScenario: null,
                    },
                    {
                        text: "Continue",
                        clase: "options-Continuar",
                        nextScenario: null,
                    },
                ],
            },

            {
                id: 11,
                name: "Corridor-Chest",
                description:
                    "An ancient chest rests in a corner of the corridor. It appears intact and seems to promise hidden treasures within.",
                options: [
                    {
                        text: "Open Chest",
                        clase: "options-Usar",
                        effect: { item: "random" },
                        nextScenario: null,
                    },
                    {
                        text: "Continue",
                        clase: "options-Seguir",
                        nextScenario: null,
                    },
                ],
            },
        ],

        Neutro: [
            {
                id: 2,
                name: "Corridor-3Ways",
                description:
                    "The corridor splits into three directions. You can go left, right, or continue straight. The choice is yours.",
                options: [
                    { text: "Left", clase: "options-Izquierda" },
                    { text: "Forward", clase: "options-Frente" },
                    { text: "Right", clase: "options-Derecha" },
                ],
            },
            {
                id: 3,
                name: "Corridor-LF",
                description:
                    "A narrow passage extends ahead and to the left. The walls are covered in moss, and the air feels damp.",
                options: [
                    { text: "Left", clase: "options-Izquierda" },
                    { text: "Forward", clase: "options-Frente" },
                ],
            },
            {
                id: 4,
                name: "Corridor-RF",
                description:
                    "The corridor branches to the right and forward. Your torchlight reveals strange markings on the walls.",
                options: [
                    { text: "Right", clase: "options-Derecha" },
                    { text: "Forward", clase: "options-Frente" },
                ],
            },
            {
                id: 5,
                name: "Corridor-RL",
                description:
                    "The path splits into two: right and left. A slight breeze carries a faint, unsettling whisper.",
                options: [
                    { text: "Right", clase: "options-Derecha" },
                    { text: "Left", clase: "options-Izquierda" },
                ],
            },
            {
                id: 6,
                name: "Corridor-DeadEnd",
                description:
                    "You've reached a dead end. You have no choice but to go back.",
                options: [{ text: "Go back", clase: "options-Volver" }],
            },
        ],
        Negativo: [
            {
                id: 12,
                name: "Corridor-Trap",
                description: {
                    default:
                        "A hidden mechanism triggers as you step on a floor tile. Sharp spikes shoot up from the ground. You must be careful to avoid getting hurt.",
                    withItem:
                        "You use your reflexes to avoid the traps, but your boots got damaged in the process. You'll need to be more cautious from now on.",
                },
                options: [{ text: "Continue", clase: "options-Continuar" }],
            },
            {
                id: 13,
                name: "Corridor-TrapHole",
                description:
                    "A hole suddenly opens beneath your feet. It is deep and dark, seemingly designed to trap the unwary.",
                options: [{ text: "Continue", clase: "options-Continuar" }],
            },
            {
                id: 14,
                name: "Corridor-Monster",
                description: {
                    default:
                        "A terrifying creature appears before you. It attacks, but you manage to escape after taking some damage.",
                    withItem:
                        "A terrifying creature appears before you. It attacks, but you block the strike with your shield. However, the shield gets stuck in the creature's jaws, so you drop it and run.",
                },
                options: [{ text: "Continue", clase: "options-Continuar" }],
            },
        ],
    },
    items: {
        torch: {
            name: "Torch",
            description: "A basic torch. It helps you see in the dark.",
            effect: { torch: +5 },
        },
        boots: {
            name: "Boots",
            description: "Sturdy boots that allow you to move faster.",
            effect: { Boots: true },
        },
        shield: {
            name: "Shield",
            description:
                "A wooden shield. It offers some protection in battle.",
            effect: { Shield: true },
        },
        trap: {
            name: "Trap",
            description: "A small trap you can set for enemies.",
            effect: { Damage: 25 },
        },
    },
};

// Exporting the game data for use in GameLogic.js
export default gameData;
