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

// CLASE cámara.
function Camara(imagenes, pelota) {
// PROPIEDADES.    --------//

	// Activa o desactiva modo debug.
	this.debugMode = true;

	// Referencia al almacen de imágenes.
	this.img = imagenes;

	// Referencia al objeto de clase pelota.
	this.pelota = pelota

	// Frame de la pelota que se muetra.
	this.cuadroPelota = 0;

	// Número de frame en cada segundo.
	this.frame = 0;

	// Medidas de gráficos.
	this.ancho = 320; this.alto = 240;

	// Referencia al elemento gráfico canvas.
	this.gameScreen = document.getElementById('gameScreen');

	// Objeto que efectúa operaciones de dibujo 2d en canvas.
	this.screen = this.gameScreen.getContext('2d');

	// Buffer para técnica de double buffering.
	this.buffer = document.createElement('canvas');

	// Objeto que efectúa operaciones de dibujo 2d en el buffer.
	this.bufferContext = this.buffer.getContext('2d');

	// Resolución del elemento canvas.
	this.gameScreen.width = this.ancho;
	this.gameScreen.height = this.alto;

	// Resolución del buffer.
	this.buffer.width = this.gameScreen.width;
	this.buffer.height = this.gameScreen.height;


// MÉTODOS.    --------//

	// Actualiza el gráfico canvas.
	this.actualizar = function() {
	// FONDO.    --------//

		// Dibuja la imagen de fondo en el buffer.
		this.bufferContext.drawImage(this.img['fondo'], 0, 0);


	// PELOTA.    --------//

		// Cuento el frame en el segundo actual (60 fps).
		this.frame++;
		if (this.frame > 1)
			this.frame = 0;

		// Si se está moviendo horizontalmente...
		if (this.pelota.vel_x != 0) {
			// Cambia el frame a mostrar según el contador.
			if (this.frame == 0)
				this.cuadroPelota = 1;
			else
				this.cuadroPelota = 0;
		}

		// Dibuja la pelota en la pantalla.
		this.bufferContext.drawImage(
			this.img['pelota'][this.cuadroPelota],
			this.pelota.x,
			this.pelota.y
		);

		// Depuración de pelota.
		if (this.debugMode == true) {
			// Posición de la caja.
			var x = this.pelota.x + 19;
			var y = this.pelota.y + 19;

			// Alto del texto en medida pt.
			var height = 10;

			// Datos a mostrar.
			var x_pos = Math.round(this.pelota.x * 100) / 100;
			var y_pos = Math.round(this.pelota.y * 100) / 100;
			var vel_x = Math.round(this.pelota.vel_x * 100) / 100;
			var vel_y = Math.round(this.pelota.vel_y * 100) / 100;

			// Lineas de información.
			var lines = Array();
			lines[0] = "x=" + x_pos + ",y=" + y_pos;
			lines[1] = "vel_x=" + vel_x + "";
			lines[2] = "vel_y=" + vel_y + "";
			lines[3] = "cuadro=" + this.cuadroPelota;

			// Tamaño y fuente.
			this.bufferContext.font = height + "pt Calibri";

			// Obtiene el ancho de la primera línea.
			var metrics = this.bufferContext.measureText("x=000.00,y=000.00");
			var width = metrics.width;

			// Dibuja la caja.
			this.bufferContext.beginPath();
			this.bufferContext.fillStyle = "#d0efff";
			this.bufferContext.fillRect(
				x - 2,
				y - height - 2,
				width + 4,
				lines.length*height + 4
			);

			// Dibuja el texto.
			this.bufferContext.fillStyle = "#555555";
			for(var i = 0; i < lines.length; i++)
				this.bufferContext.fillText(lines[i], x, y + i*height);
		}


	// BORDE PANTALLA.
		this.bufferContext.beginPath();
        this.bufferContext.rect(0.5, 0.5, this.ancho - 1.5, this.alto - 1.5);
		this.bufferContext.lineWidth = 1;
		this.bufferContext.strokeStyle = "white";
		this.bufferContext.stroke();


	// VOLCADO DEL BUFFER AL CANVAS VISIBLE.    --------//

		// Pasa el contenido del buffer al canvas.
		this.screen.drawImage(this.buffer, 0, 0);
	};

	// Ajusta el tamaño del canvas a cualquier resolución de pantalla.
	this.ajustarGameScreen = function() {
		// Proporción de ancho / alto deseada.
		var widthToHeight = this.ancho / this.alto; // 320px*240px

		// Ancho y alto actuales de la ventana.
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		// Proporción de ancho / alto actual.
		var newWidthToHeight = newWidth / newHeight;

		// Si hay mas ancho del deseado...
		if (newWidthToHeight > widthToHeight) {
			// Se ajusta al alto.
			newWidth = newHeight * widthToHeight;
			this.gameScreen.style.height = newHeight + 'px';
			this.gameScreen.style.width = newWidth + 'px';
		} else {
		// Si hay mas alto del deseado...
			// Se ajusta al ancho.
			newHeight = newWidth / widthToHeight;
			this.gameScreen.style.width = newWidth + 'px';
			this.gameScreen.style.height = newHeight + 'px';
		}

		// Según las medidas actuales, se centra el canvas.
		this.gameScreen.style.marginTop = (-newHeight / 2) + 'px';
		this.gameScreen.style.marginLeft = (-newWidth / 2) + 'px';
	};

	// Información en consola javascript del navegador.
	console.info("Creado objeto de clase Camara.");
}

// Información en consola javascript del navegador.
console.info("Incluído camara.js");
