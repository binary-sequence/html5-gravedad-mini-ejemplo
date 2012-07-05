// En el evento de página cargada.
window.onload = function() {
	// Objeto de clase KeyboardListener (ver /scripts/keyboardListener.js).
	var keyboard = new KeyboardListener();

	// Objeto de clase Main (ver /scripts/main.js).
	var main = new Main(keyboard);

	// Ejecuto el método actualizar del objeto de clase Main.
	main.actualizar();
};

