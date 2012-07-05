/*
                                ESPAÑOL

  Este archivo es parte de 'Gravedad-mini-ejemplo'.

  Copyright 2012 Sergio Lindo

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

  Copyright 2012 Sergio Lindo

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

// CLASE KeyboardListener. Recoge pulsaciones del teclado.
function KeyboardListener() {
 // PROPIEDADES.    --------//

 // Almacena la tecla pulsada o null si no hay tecla pulsada.
 this.keychar = null;

 // MÉTODOS.    --------//

 // Se ejecuta en el evento canvas:onkeydown.
 this.listenKeydown = function (e) {
  var keynum;

  if (window.event) keynum = e.keyCode; // IE8 y anteriores.
  else if (e.which) keynum = e.which; // IE9/Firefox/Chrome/Opera/Safari.

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

