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

var keyboard = new KeyboardListener();
var main = new Main(keyboard);

function iniciar() {
 main.mainLoop = window.requestAnimationFrame(iniciar);
 main.actualizar();
}

