var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	ball : null,
	_vx : 0,
	_vy : 0,
	_ax : 0,
	_ay : 0,
	_gravity : 0,
	_bounce : 0,
	_friction : 0,
	_tmpx : null,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.ball = new Ball();
		js._vx = Math.random() * 20;
		js._vy = Math.random() * 10;
		js._bounce = -0.7;
		js._gravity = 0.1;
		js._friction = 0.98;
		
		js.ball.x = js.lienzo.width / 2;
		js.ball.y = js.lienzo.height / 2;
		
		js.drawFrame();
	},
	
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		var left = 0,
			right = lienzo.width,
			top = 0,
			bottom = lienzo.height;
			
			js._vy += js._gravity;
			//js._vx += js._gravity;
			js.ball.x += js._vx;
			js.ball.y += js._vy;
			
			if (js.ball.x + js.ball.radius > right) { // límite ancho der
				js.ball.x = right - js.ball.radius;
				js._vx *= js._bounce;
			} else if (js.ball.x - js.ball.radius < left) { // límite ancho izq
				js.ball.x = left + js.ball.radius;
				js._vx *= js._bounce;
			} else if (js.ball.y + js.ball.radius > bottom) { // límite ancho top
				js.ball.y = bottom - js.ball.radius;
				js._vy *= js._bounce;
			} else if (js.ball.y - js.ball.radius < top) { // límite ancho bottom
				js.ball.y = top + js.ball.radius;
				js._vy *= js._bounce;
			};
			 
			if (js.ball.y + js.ball.radius == bottom) {
				js._vx *= js._friction;
				js._vy *= js._friction;
				if (js._tmpx.toFixed(3) == js.ball.x.toFixed(3)) {
					window.cancelAnimationFrame(js.globalId);
					console.log('stoped');
				}
			}
			//~ console.log('vy',js._vy);
			js._tmpx = js.ball.x;
			js.ball.draw(js.contexto);
			
			var arr = ["_vx", "_vy", "_ax", "_ay", "_gravity", "_bounce", "_friction"];
			for (var i in arr) {
				$(arr[i].replace('_','.')).html(js[arr[i]]);
			}
	}
	
	
	
	
};

$(js.init);
