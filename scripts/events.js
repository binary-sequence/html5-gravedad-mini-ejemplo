// ELEMENTOS NECESARIOS.    --------//

	// Función a ejecutar en el evento window.onload.
	function onLoad() {
		// Objeto de clase KeyboardListener (ver /scripts/keyboardListener.js).
		var keyboard = new KeyboardListener();

		// Objeto de clase Main (ver /scripts/main.js).
		var main = new Main(keyboard);

		// Bucle principal.
		(function mainLoop() {
			// Ejecuto el método actualizar del objeto de clase Main.
			main.actualizar();

			// Creo un hilo de ejecución para el siguiente frame.
			main.mainLoop = window.requestAnimationFrame(mainLoop);
		})();
	}


// ASIGNACIÓN DE EVENTOS.    --------//

	// En el evento de página cargada.
	window.onload = onLoad;

