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

// CLASE main.
function Main(keyboard) {
// VARIABLES PRIVADAS.    --------//

	// Referencia al objeto de clase keyboardListener.
	var keyboard = keyboard;

	// Referencia al elemento gráfico canvas.
	var gameScreen = document.getElementById('gameScreen');

	// Resolución del elemento canvas.
	gameScreen.width = 320; gameScreen.height = 240;

	// Objeto que efectúa operaciones de dibujo 2d en canvas.
	var screen = gameScreen.getContext('2d');

	// Buffer para técnica de double buffering.
	var bufferCanvas = document.createElement('canvas');

	// Resolución del buffer.
	bufferCanvas.width = gameScreen.width;
	bufferCanvas.height = gameScreen.height;

	// Objeto que efectúa operaciones de dibujo 2d en el buffer.
	var bufferContext = bufferCanvas.getContext('2d');

	// Array de objetos Image para almacenar los frames de la pelota.
	var imgPelota = new Array();
	imgPelota[0] = new Image(); imgPelota[0].src = "img/pelota0.png";
	imgPelota[1] = new Image(); imgPelota[1].src = "img/pelota1.png";

	// Objeto Image para almacenar la imagen de fondo.
	var fondo = new Image(); fondo.src = 'img/fondo.bmp';

	// Objeto de clase pelota (ver /scripts/pelota.js).
	var pelota = new Pelota(imgPelota, bufferContext);


// PROPIEDADES.    --------//

	// Referencia al hilo de ejecución del bucle principal.
	this.mainLoop = null;

// MÉTODOS.

	// Actualiza los datos necesarios en cada 'fps'.
	this.actualizar = function() {
		// Dibuja la imagen de fondo en el buffer.
		bufferContext.drawImage(fondo, 0, 0);

		// Ejecuta el método actualizar del objeto de clase pelota.
		pelota.actualizar();

		// Pasa el contenido del buffer al canvas.
		screen.drawImage(bufferCanvas, 0, 0);

		// Si se pulsa alguna tecla...
		if (keyboard.keychar != null)
			// Se para el bucle de animación.
			window.cancelAnimationFrame(this.mainLoop);

		this.mainLoop = window.requestAnimationFrame(this.actualizar());
	};
}

