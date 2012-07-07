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

// CLASE pelota.
function Pelota() {
// PROPIEDADES.    --------//

	// Posición de la pelota en el plano.
	this.x = 150; this.y = 50;

	// Velocidad de desplazamiento horizontal.
	this.vel_x = 4;

	// Velocidad de desplazamiento vertical.
	this.vel_y = 0;


// MÉTODOS.    --------//

	// Actualiza los datos de la pelota y la redibuja.
	this.actualizar = function () { // Ejecutado en cada 'fps';
		// Aceleración vertical (gravedad).
		this.vel_y += 0.4;

		// Si choca con el suelo...
		if (this.y + this.vel_y >= 176) {
			// Pierde fuerza por la colisión.
			this.vel_y -= 0.8;

			// El sentido de la velocidad vertical se inverte.
			this.vel_y *= -1;

			// Se asegura de que no atraviesa el límite del suelo.
			this.y = 176;
		} else
		// Si no ha chocado con el suelo...
			// La pelota se desplaza verticalmente.
			this.y += this.vel_y;

		// Si se mueve horizontalmente...
		if (this.vel_x > 0 || (this.vel_x * -1 > 0))
			// Aceleración horizontal (rozamiento).
			this.vel_x -= 0.01 * this.vel_x;

		// Se asegura de que se pare...
		if (this.vel_x < 0.1 && this.vel_x > -0.1) {
			// ...para evitar cálculos decimales infinitos.
			this.vel_x = 0;
		}

		// Si choca con el borde derecho de la pantalla...
		if (this.x >= 302)
			// El sentido de la velocidad horizontal se inverte.
			this.vel_x *= -1;

		// Si choca con el borde izquierdo de la pantalla...
		if (this.x < 0)
			// El sentido de la velocidad horizontal se inverte.
			this.vel_x *= -1;

		// La pelota se desplaza horizontalmente.
		this.x += this.vel_x;
	};
}

