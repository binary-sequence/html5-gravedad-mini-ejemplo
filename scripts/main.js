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

// VARIABLES.    --------//

	// Array que almacena todas las imagenes.
	var img = new Object();

	// Objeto Image para almacenar la imagen de fondo.
	img['fondo'] = new Image();
	img['fondo'].src = 'img/fondo.jpg';

	// Array de objetos Image para almacenar los frames de la pelota.
	img['pelota'] = new Array();
	img['pelota'][0] = new Image();
	img['pelota'][0].src = "img/pelota0.png";
	img['pelota'][1] = new Image();
	img['pelota'][1].src = "img/pelota1.png";

	// Información en consola javascript del navegador.
	console.info("Creado almacén de imágenes.");

	// Objeto de clase pelota (ver /scripts/pelota.js).
	var pelota = new Pelota();

	// Referencia al objeto de clase camara.
	var camara = null;

	// Estadísticas.
	var stats_fps = new Stats(), stats_ms = new Stats();
	stats_fps.setMode(0); stats_ms.setMode(1); // 0: fps, 1: ms
	// Align top-left
	stats_fps.domElement.style.position = 'absolute';
	stats_fps.domElement.style.left = '0px';
	stats_fps.domElement.style.top = '0px';
	// Align top-left
	stats_ms.domElement.style.position = 'absolute';
	stats_ms.domElement.style.left = '100px';
	stats_ms.domElement.style.top = '0px';

	// Referencia al hilo de ejecución del bucle principal.
	var mainLoop = null;


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function buclePrincipal() {
		stats_fps.begin();
		stats_ms.begin();

		// Ejecuta el método actualizar del objeto de clase pelota.
		pelota.actualizar();

		// Actualiza los gráficos del canvas.
		camara.actualizar();

		setTimeout(function() {
			// Crea un hilo de ejecución para el siguiente frame.
			mainLoop = window.requestAnimationFrame(buclePrincipal);
		}, 10);

		stats_fps.end();
		stats_ms.end();
	};


// EVENTOS.    --------//

	// Evento de página cargada.
	window.onload = function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.onload");

		// Estadísticas.
		document.body.appendChild( stats_fps.domElement );
		document.body.appendChild( stats_ms.domElement );

		// Objeto de clase camara (ver /scripts/camara.js).
		camara = new Camara(img, pelota);

		// Ajuste del canvas a la resolución de pantalla.
		camara.ajustarGameScreen();

		// Evento de cambio del tamaño de la ventana.
		window.addEventListener('resize', function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.resize");

			// Ajuste del canvas a la resolución de pantalla.
			camara.ajustarGameScreen();
		}, false);

		// Evento cambio orientación de ventana (Móviles).
		window.addEventListener('orientationchange', function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.orientationchange");

			// Ajuste del canvas a la resolución de pantalla.
			camara.ajustarGameScreen();
		}, false);

		// Evento de menú contextual.
		window.oncontextmenu = function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.oncontextmenu");

			// Desactivar menú contextual.
			return false;
		};

		// Evento de tecla pulsada.
		window.onkeydown = function (e) {
			// Información en consola javascript del navegador.
			console.info("Evento window.onkeydown (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");

			// Almacena código numérico del caracter pulsado.
			var keycode = null;

			// Almacena el caracter pulsado.
			var keychar = null;

			// IE8 y anteriores.
			if (window.event)
				keycode = e.keyCode;
			// IE9/Firefox/Chrome/Opera/Safari.
			else if (e.which)
				keycode = e.which;

			// De código numérico(keycode) a carácter(keychar).
			keychar = String.fromCharCode(keycode);

			// Si pulsa alguna tecla...
			switch (keychar) {
			// Si pulsa la tecla 'q'.
				case 'q': case 'Q':
					// Información en consola javascript del navegador.
					console.info("Bucle principal finalizado por el usuario.");

					// Se para el bucle principal.
					window.cancelAnimationFrame(mainLoop);
				break;
			// Si no es un caracter imprimible.
				default:
					// Si pulsa la tecla control (izquierda o derecha).
					if (keycode == 17) {
						// Activa / desactiva el modo depuración.
						camara.debugMode = !(camara.debugMode);

						// Información en consola javascript del navegador.
						console.info("Debug mode: " + camara.debugMode + ".");
					}
					// Si no ha pulsado ninguna tecla.
					//if (keycode == null)
			}

			// El evento continúa normalmente.
			return true;
		};

		// Ejecuta el bucle principal.
		buclePrincipal();
	};

// Información en consola javascript del navegador.
console.info("Incluído main.js");
