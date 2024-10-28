# Información del Proyecto

**Nota:** La rama actual es una versión optimizada para GitHub Pages. En la rama **master** se encuentra el proyecto completo con backend.

==========================================
1) SQL
==========================================

En **Assets/EXTRA** se encuentra el SQL con la tabla de la base de datos. 
Modificar **db_connection.php** si se necesita. 
Datos actuales:
- `define('DB_SERVER', 'localhost');`
- `define('DB_USERNAME', 'root');`
- `define('DB_PASSWORD', '');`
- `define('DB_DATABASE', 'maze_db');`

==========================================
2) Explicación de Proyecto
==========================================

Hola, sabiendo que el curso era de JavaScript, supuse que íbamos a concentrarnos en eso principalmente. Por ese motivo, una semana antes del curso, comencé a juntar las partes de logos, recursos, maquetado, etc. Una vez que comenzó el curso, empecé a codificar el proyecto.

El proyecto en sí es una página web donde el usuario puede registrarse y jugar un juego. Se terminó colocando backend con una base de datos, pero eso no importa. El registro se utiliza JS para tomar los datos del formulario. Iniciada la sesión, se puede ir al perfil del usuario donde se puede cambiar la imagen, el email o eliminar la cuenta. **IMPORTANTE:** en la eliminación de cuenta se agregó el confirm y alert extra para informar al usuario de la eliminación de cuenta.

El juego en sí es simple; el usuario presiona un botón y se ejecutan funciones detrás para generar un escenario nuevo. Después revisa qué tocó y cambia el texto y botones, así como la "interfaz" del juego, utilizando probabilidad básica para elegir los escenarios.

Sí, se usó ChatGPT, pero para acelerar la escritura de código y generar código específico mientras trabajaba. Se fue modificando el código a mano para que hiciera los procesos específicos y para corregir errores. (Muy bueno para escribir código rápido, malo para entender lo que se busca y muy malo para procesos relacionados).

Se puso el proyecto en un servidor de InfinityFree por dos motivos: el primero es que usa backend, y GitHub no maneja esa parte, por lo que no se podía usar por ahí; el segundo motivo es para probar mis limitaciones: si quisiera sacar algo en línea, ¿qué tan capaz sería?

==========================================
3) Elementos y Comandos Utilizados
==========================================

**Confirmación**
- `confirm()`
  - Ubicación: SetProfile.js, línea 157

**Alert**
- `alert("¡Cuenta eliminada con éxito!");`
  - Ubicación: SetProfile.js, línea 181

**Console Log**
- `console.log()`
  - Ubicación: Items.js, línea 58

- `document.addEventListener()`
  - Ubicación: contact-form.js, línea 3

**Funciones**
- `cambiarEscenario()`
  - Ubicación: ScenarioManager.js, línea 168

- `generarEvento()`
  - Ubicación: ScenarioManager.js, línea 15

**Clases**
- Clase `Personaje`
  - Ubicación: Character.js, línea 4

**Arrays**
- Ejemplo: `gameData`
  - Ubicación: ScenariosDescription.js, línea 2

- `imagenes[]`
  - Ubicación: ImageLoader.js, línea 4

**Condicionales (IF)**
- `if (random < PROB_EVENTO_POSITIVO)`
  - Ubicación: ScenarioManager.js, línea 18

- `if (torch > 0 && sceneFilter.style.backgroundImage === \`url("${darkFilterImage}")\`)`
  - Ubicación: PlayerDamageAndEffects.js, línea 61

**Bucles (FOR)**
- `for (let i = 1; i <= 4; i++)`
  - Ubicación: Character.js, línea 55

- `imagenes.forEach((imagen) => {`
  - Ubicación: ImageLoader.js, línea 63

**Bucles (WHILE)**
- `while ((restrictedScenarios.includes(lastScenario) && ...`
  - Ubicación: UserInputHandler.js, línea 45

**Cálculos**
- `Math.max(vida - 25, 0)`
  - Ubicación: PlayerDamageAndEffects.js, línea 10

- `Math.min(personaje.vida + 25, personaje.MAX_VIDA);`
  - Ubicación: Items.js, línea 53
