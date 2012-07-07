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
	var debugMode = true;

	// Referencia al almacen de imágenes.
	this.img = imagenes;

	// Referencia al objeto de clase pelota.
	this.pelota = pelota

	// Frame de la pelota que se muetra.
	this.cuadro = 0;

	// Número de frame en cada segundo.
	this.frame = 0;


// MÉTODOS.    --------//

	// Actualiza el gráfico canvas.
	this.actualizar = function() {
	// FONDO.    --------//

		// Dibuja la imagen de fondo en el buffer.
		bufferContext.drawImage(this.img['fondo'], 0, 0);


	// PELOTA.    --------//

		// Cuento el frame en el segundo actual (60 fps).
		this.frame++;
		if (this.frame > 1)
			this.frame = 0;

		// Si se está moviendo horizontalmente...
		if (this.pelota.vel_x != 0) {
			// Cambia el frame a mostrar según el contador.
			if (this.frame == 0)
				this.cuadro = 1;
			else
				this.cuadro = 0;
		}

	// VOLCADO DEL BUFFER AL CANVAS VISIBLE.    --------//

		// Dibuja la pelota en la pantalla.
		bufferContext.drawImage(this.img['pelota'][this.cuadro], this.pelota.x, this.pelota.y);

		// Pasa el contenido del buffer al canvas.
		screen.drawImage(bufferCanvas, 0, 0);
	};
}

