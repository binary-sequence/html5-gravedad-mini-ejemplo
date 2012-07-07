/*
                                ESPAÑOL

  Este archivo es parte de 'Gravedad-mini-ejemplo'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'Gravedad-mini-ejemplo' es software libre: usted puede redistribuirlo y/o
  modificarlo bajo los términos de la Licencia Pública General GNU publicada
  por la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,
  o (a su elección) cualquier versión posterior.

  'Gravedad-mini-ejemplo' se distribuye con la esperanza de que sea útil, pero
  SIN GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de
  APTITUD PARA UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia
  Pública General GNU para obtener una información más detallada.

  Debería haber recibido una copia de la Licencia Pública General GNU junto a
  'Gravedad-mini-ejemplo'. En caso contrario, consulte
  <http://www.gnu.org/licenses/>.


                                ENGLISH

  This file is part of 'Gravedad-mini-ejemplo'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'Gravedad-mini-ejemplo' is free software: you can redistribute it and/or
  modify it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or (at your
  option) any later version.

  'Gravedad-mini-ejemplo' is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
  Public License for more details.

  You should have received a copy of the GNU General Public License along with
  'Gravedad-mini-ejemplo'. If not, see <http://www.gnu.org/licenses/>.

*/

// VARIABLES.    --------//

	// Referencia al elemento gráfico canvas.
	var gameScreen = null;

	// Objeto que efectúa operaciones de dibujo 2d en canvas.
	var screen = null;

	// Buffer para técnica de double buffering.
	var bufferCanvas = document.createElement('canvas');

	// Objeto que efectúa operaciones de dibujo 2d en el buffer.
	var bufferContext = null;

	// Array de objetos Image para almacenar los frames de la pelota.
	var imgPelota = new Array();
	imgPelota[0] = new Image(); imgPelota[0].src = "img/pelota0.png";
	imgPelota[1] = new Image(); imgPelota[1].src = "img/pelota1.png";

	// Objeto Image para almacenar la imagen de fondo.
	var fondo = new Image(); fondo.src = 'img/fondo.jpg';

	// Objeto de clase pelota (ver /scripts/pelota.js).
	var pelota = new Pelota(imgPelota);

	// Referencia al hilo de ejecución del bucle principal.
	var mainLoop = null;


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function actualizar() {
		// Dibuja la imagen de fondo en el buffer.
		bufferContext.drawImage(fondo, 0, 0);

		// Ejecuta el método actualizar del objeto de clase pelota.
		pelota.actualizar(bufferContext);

		// Pasa el contenido del buffer al canvas.
		screen.drawImage(bufferCanvas, 0, 0);

		// Creo un hilo de ejecución para el siguiente frame.
		mainLoop = window.requestAnimationFrame(actualizar);
	};

	// Ajusta el tamaño del canvas a cualquier resolución de pantalla.
	function ajustarGameScreen() {
		// Proporción de ancho / alto deseada.
		var widthToHeight = 320 / 240; // 320px*240px

		// Ancho y alto actuales de la ventana.
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		// Proporción de ancho / alto actual.
		var newWidthToHeight = newWidth / newHeight;

		// Si hay mas ancho del deseado...
		if (newWidthToHeight > widthToHeight) {
			// Se ajusta al alto.
			newWidth = newHeight * widthToHeight;
			gameScreen.style.height = newHeight + 'px';
			gameScreen.style.width = newWidth + 'px';
		} else {
		// Si hay mas alto del deseado...
			// Se ajusta al ancho.
			newHeight = newWidth / widthToHeight;
			gameScreen.style.width = newWidth + 'px';
			gameScreen.style.height = newHeight + 'px';
		}

		// Según las medidas actuales, se centra el canvas.
		gameScreen.style.marginTop = (-newHeight / 2) + 'px';
		gameScreen.style.marginLeft = (-newWidth / 2) + 'px';
	}


// EVENTOS.    --------//

	// Evento de página cargada.
	window.onload = function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.onload");

		// Referencia al elemento gráfico canvas.
		gameScreen = document.getElementById('gameScreen');

		// Resolución del elemento canvas.
		gameScreen.width = 320; gameScreen.height = 240;

		// Objeto que efectúa operaciones de dibujo 2d en canvas.
		screen = gameScreen.getContext('2d');

		// Resolución del buffer.
		bufferCanvas.width = gameScreen.width;
		bufferCanvas.height = gameScreen.height;

		// Objeto que efectúa operaciones de dibujo 2d en el buffer.
		bufferContext = bufferCanvas.getContext('2d');

		// Ajuste del canvas a la resolución de pantalla.
		ajustarGameScreen();

		// Ejecuta el bucle principal.
		actualizar();
	};

	// Evento de cambio del tamaño de la ventana.
	window.addEventListener('resize', function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.resize");

		// Ajuste del canvas a la resolución de pantalla.
		ajustarGameScreen();
	}, false);

	// Evento de cambio de orientación de la ventana (Dispositivos móviles).
	window.addEventListener('orientationchange', function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.orientationchange");

		// Ajuste del canvas a la resolución de pantalla.
		ajustarGameScreen();
	}, false);

	// Evento de menú contextual.
	window.oncontextmenu = function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.oncontextmenu");

		// Desactivar menú contextual.
		return false;
	};

	// Evento de tecla pulsada.
	window.onkeydown = function (e) {
		// Información en consola javascript del navegador.
		console.info("Evento window.onkeydown (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");

		// Almacena el código representativo del caracter pulsado o null.
		var keycode = null;

		// Almacena el caracter pulsado o null si no hay tecla pulsada.
		var keychar = null;

		// IE8 y anteriores.
		if (window.event)
			keycode = e.keyCode;
		// IE9/Firefox/Chrome/Opera/Safari.
		else if (e.which)
			keycode = e.which;

		// De código-numérico(keycode) a carácter(keychar).
		keychar = String.fromCharCode(keycode);

		// Si pulsa alguna tecla...
		if (keychar != null)
			// Se para el bucle principal.
			window.cancelAnimationFrame(mainLoop);

		// El evento continúa normalmente.
		return true;
	};

