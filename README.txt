1) SQL 
2) EXPLICACION DE PROYECTO
3) ELEMENTOS Y COMANDOS Utilizados

==========================================
1) SQL
==========================================

En Assets/EXTRA se encuentra el SQL con la tabla de base de datos.
modificar db_connection.php si se necesita. 
datos actuales:
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'maze_db');

==========================================
2) Explicacion de proyecto
==========================================

Hola, sabiendo que el curso era de Javascript, supuse que ibamos a concentrarnos en eso principalmente,
por ese motivo una semana antes del curso comence a juntar las partes de logos, recursos, maquetado, etc.
una vez que comenzo el curso empece a codificar el proyecto.

El proyecto en si es una pagina web donde el usuario puede registrarse y jugar un juego. Se termino 
colocando backend con una base de datos pero eso no importa. el registr se utiliza JS para tomar los 
datos del form. iniciada la sesion se puede ir al perfil del usuario donde se puede cambiar imagen, mail
o eliminar la cuenta, IMPORTANTE: en la eliminacion de cuenta se agrego el confirm y alert extra para 
informar al usuario de la eliminacion de cuenta.

El juego en si es simple, el usuario presiona un boton y se ejecutan funciones por detras para generar un 
escenario nuevo, despues revisa que toco y cambia el texto y botones asi como la "interfaz" del juego,
utilizando probabilidad basica para elegir los escenarios.

Si, se uso ChatGPT, pero para acelerar la escritura de codigo y generar codigo especifico mientras trabajaba.
se fue modificando codigo a mano para que hiciera los procesos especificos y para corregir errores.
(muy bueno para escribir codigo rapido, malo para entender lo que se busca y muy malo para procesos relacionados)

Se puso el proyecto en un servidor de infinityfree por 2 motivos, el primero es que usa backend,
github no maneja esa parte por lo que no se podia usar por ahi; el segundo motivo es para probar 
mis limitaciones, si quisiera sacar algo en linea que tan capas seria?


==========================================
3)  Elementos y Comandos Utilizados:
==========================================

confirmación==============
-  confirm(
   Ubicacion: SetProfile.js, linea 157

alert==============
- alert("¡Cuenta eliminada con éxito!");
  Ubicacion: SetProfile.js, linea 181

console log ==============
- console.log(): 
  Ubicación: 
   Items.js, linea 58

- document.addEventListener()
  Ubicación: contact-form.js, linea 3

Funciones==============
- cambiarEscenario()
  Ubicación: ScenarioManager.js, linea 168

- generarEvento()
  Ubicacion: ScenarioManager.js, linea 15

Clases============== 
- Clase Personaje: 
  Ubicación: Character.js, linea 4

Arrays============== 
- Ejemplo: gameData
  Ubicación: ScenariosDescription.js, linea 2

- imagenes[]
  Ubicacion: ImageLoader.js, linea 4

IF============== 
- if (random < PROB_EVENTO_POSITIVO)
  Ubicacion: ScenarioManager.js, linea 18

- if (torch > 0 && sceneFilter.style.backgroundImage === `url("${darkFilterImage}")`)
  Ubicacion: PlayerDamageAndEffects.js, linea 61

For============== 
-  for (let i = 1; i <= 4; i++)
   Ubicacion: Character.js linea 55

- imagenes.forEach((imagen) =>{
  Ubicacion: ImageLoader.js, linea 63

While============== 
- while ((restrictedScenarios.includes(lastScenario) &&...
  Ubicacion: UserInputHandler.js, linea 45

Calculos==============
- Math.max(vida - 25, 0)
  Ubicacion: PlayerDamageAndEffects.js, linea 10

- Math.min(personaje.vida + 25, personaje.MAX_VIDA);
  Ubicacion: Items.js, linea 53