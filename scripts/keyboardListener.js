/*
Copyright 2012 Sergio Lindo
This file is part of 'Gravedad - mini-ejemplo (Port desde C hacia JavaScript+Canvas{html5})'.

'Gravedad - mini-ejemplo' is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

'Gravedad - mini-ejemplo' is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with 'Gravedad - mini-ejemplo'.  If not, see <http://www.gnu.org/licenses/>.

*/

// Clase KeyboardListener. Encargada de recoger las pulsaciones del teclado.
function KeyboardListener() {
 // Propiedades.
 this.keychar = null; // Almacena la tecla pulsada o null si no hay tecla pulsada.

 this.getPressed = function () { // Encapsulamiento que hace de getter.
  return this.keychar;
 };

 // Métodos.
 this.listenKeydown = function (e) { // Método que debe responder al evento canvas:onkeydown para obtener la tecla pulsada.
  var keynum;

  if(window.event) keynum = e.keyCode; // IE8 and earlier.
  else if(e.which) keynum = e.which; // IE9/Firefox/Chrome/Opera/Safari.

  this.keychar = String.fromCharCode(keynum);

  return true;
 };

 this.listenKeyup = function (e) { // Método que debe responder al evento canvas:onkeyup para liberar la tecla pulsada.
  this.keychar = null;
  return true;
 };
}

