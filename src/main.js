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

// Clase main.
function Main() {
 var gameScreen = document.getElementById('gameScreen'); gameScreen.width = 320; gameScreen.height = 240;
 var screen = gameScreen.getContext('2d');
 var bufferCanvas = document.createElement('canvas'); bufferCanvas.width = gameScreen.width; bufferCanvas.height = gameScreen.height;
 var bufferContext = bufferCanvas.getContext('2d');
 var imgPelota = new Array();
 imgPelota[0] = new Image(); imgPelota[0].src = "img/pelota0.png";
 imgPelota[1] = new Image(); imgPelota[1].src = "img/pelota1.png";
 var fondo = new Image(); fondo.src = 'img/fondo.bmp';
 var mainLoop = null;
 var pelota = new Pelota(imgPelota, bufferContext);

 this.actualizar = function() {
  bufferContext.drawImage(fondo, 0, 0);
  pelota.actualizar();
  pelota.dibujar();
  screen.drawImage(bufferCanvas, 0, 0);
  if (salir) window.cancelAnimationFrame(mainLoop);
 };
}

