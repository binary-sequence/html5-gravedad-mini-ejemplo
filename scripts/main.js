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

// VARIABLES .    --------//

	// Referencia al elemento gráfico canvas.
	var gameScreen = null;

	// Objeto que efectúa operaciones de dibujo 2d en canvas.
	var screen = null;

	// Buffer para técnica de double buffering.
	var bufferCanvas = document.createElement('canvas');

	// Objeto que efectúa operaciones de dibujo 2d en el buffer.
	bufferContext = null;

	// Array de objetos Image para almacenar los frames de la pelota.
	var imgPelota = new Array();
	imgPelota[0] = new Image(); imgPelota[0].src = "img/pelota0.png";
	imgPelota[1] = new Image(); imgPelota[1].src = "img/pelota1.png";

	// Objeto Image para almacenar la imagen de fondo.
	var fondo = new Image(); fondo.src = 'img/fondo.jpg';

	// Objeto de clase pelota (ver /scripts/pelota.js).
	var pelota = null;

	// Almacena el código representativo del caracter pulsado o null.
	keycode = null;

	// Almacena el caracter pulsado o null si no hay tecla pulsada.
	keychar = null;

	// Referencia al hilo de ejecución del bucle principal.
	mainLoop = null;


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function actualizar() {
		// Dibuja la imagen de fondo en el buffer.
		bufferContext.drawImage(fondo, 0, 0);

		// Ejecuta el método actualizar del objeto de clase pelota.
		pelota.actualizar();

		// Pasa el contenido del buffer al canvas.
		screen.drawImage(bufferCanvas, 0, 0);

		// Creo un hilo de ejecución para el siguiente frame.
		mainLoop = window.requestAnimationFrame(actualizar);
	};


// EVENTOS.    --------//

	// Evento de página cargada.
	window.onload = function() {
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

		// Objeto de clase pelota (ver /scripts/pelota.js).
		pelota = new Pelota(imgPelota, bufferContext);

		// Ejecuto el bucle principal.
		actualizar();
	};

	// Evento de menú contextual.
	window.oncontextmenu = function() {
		// Desactivar menú contextual.
		return false;
	};

	// Evento de tecla pulsada.
	window.onkeydown = function (e) {
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

	// Evento de tecla levantada.
	window.onkeyup = function (e) {
		// null -> No hay tecla pulsada.
		keycode = null;
		keychar = null;

		// El evento continúa normalmente.
		return true;
	};

