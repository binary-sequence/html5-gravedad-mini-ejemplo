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

// Clase main.
function Main(keyboard) {
 // Variables privadas.
 var keyboard = keyboard;
 var gameScreen = document.getElementById('gameScreen'); gameScreen.width = 320; gameScreen.height = 240;
 var screen = gameScreen.getContext('2d');
 var bufferCanvas = document.createElement('canvas'); bufferCanvas.width = gameScreen.width; bufferCanvas.height = gameScreen.height;
 var bufferContext = bufferCanvas.getContext('2d');
 var imgPelota = new Array();
 imgPelota[0] = new Image(); imgPelota[0].src = "img/pelota0.png";
 imgPelota[1] = new Image(); imgPelota[1].src = "img/pelota1.png";
 var fondo = new Image(); fondo.src = 'img/fondo.bmp';
 var pelota = new Pelota(imgPelota, bufferContext);

 // Propiedades.
 this.mainLoop = null;

 // Métodos.
 this.actualizar = function() {
  bufferContext.drawImage(fondo, 0, 0);
  pelota.actualizar();
//  pelota.dibujar();
  screen.drawImage(bufferCanvas, 0, 0);
  if (keyboard.keychar != null) window.cancelAnimationFrame(this.mainLoop);
 };
}

