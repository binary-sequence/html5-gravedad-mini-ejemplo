// CLASE KeyboardListener. Recoge pulsaciones del teclado.
function KeyboardListener() {
// PROPIEDADES.    --------//

	// Almacena la tecla pulsada o null si no hay tecla pulsada.
	this.keychar = null;

// MÉTODOS.    --------//

	// Se ejecuta en el evento canvas:onkeydown.
	this.listenKeydown = function (e) {
		var keynum;

		// IE8 y anteriores.
		if (window.event)
			keynum = e.keyCode;
		// IE9/Firefox/Chrome/Opera/Safari.
		else if (e.which)
			keynum = e.which;

		// Desde ASCII(keynum) a carácter(keychar).
		this.keychar = String.fromCharCode(keynum);

		// El evento continúa normalmente.
		return true;
	};

	// Se ejecuta en el evento canvas:onkeyup.
	this.listenKeyup = function (e) {
		// null -> No hay tecla pulsada.
		this.keychar = null;

		// El evento continúa normalmente.
		return true;
	};
}

