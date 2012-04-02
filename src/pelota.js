/*
Copyright 2012 Sergio Lindo
This file is part of Gravedad - mini-ejemplo (Port desde C hacia JavaScript+Canvas(html5).

Gravedad - mini-ejemplo is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Gravedad - mini-ejemplo is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Gravedad - mini-ejemplo.  If not, see <http://www.gnu.org/licenses/>.

*/

// Clase pelota.
function pelota(imagenes, screen) {
 // Propiedades.
 this.x = 150; this.y = 50;
 this.dx = 2;
 this.vel_y = 0;
 this.cuadro = 0;
 this.imagenes = imagenes;
 this.screen = screen;

 // Métodos.
 this.actualizar = function () {
  this.x += this.dx;

  this.vel_y += 0.1;

  if (this.y + this.vel_y >= 176) {
   this.vel_y -= 0.1; // pierde fuerza al tocar el suelo
   this.vel_y *= -1;
   this.y = 176;
  } else {
   this.y += this.vel_y;
  }

  if (this.x >= 302)
   this.dx = -2;

  if (this.x < 0)
   this.dx = 2;
 };
 this.dibujar = function () {
  if (this.cuadro == 1) {
   screen.drawImage(this.imagenes[1], this.x, this.y);
   this.cuadro = 0;
  } else {
   this.cuadro = 1;
   screen.drawImage(this.imagenes[0], this.x, this.y);
  }
 };
}

