var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	_ball : null,
	_vx : 0,
	_vy : 0,
	_ax : 0,
	_ay : 0,
	_gravity : 0,
	_numBalls : 0,
	_mouse : {},
	_vo : 16,
	_bounce : -0.7,
	_tmpx : 0,
	_friction : 0.98,
	ball : null,
	arrow : null,
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');

		js._mouse = utils.captureMouse(js.lienzo);
	
		js.arrow = new Arrow();
		js.arrow.x = 50;
		js.arrow.y = js.lienzo.height /2;
		
		js.arrow.draw(js.contexto);

		js.lienzo.addEventListener('mousedown', js.fMouseDown);
		js.lienzo.addEventListener('mousemove', js.fMouseMove);
	},

	fMouseDown : function() {

		js._balls = [];
		js._numBalls = 1;
		js._gravity = 0.033;
		
		js.ball = new Ball(22, Math.random() * 0xffffff);

		js.ball.vx = 0;
		js.ball.vy = 0;

		js.ball.x  = 0;
		js.ball.y = js.lienzo.height/2;
		
		var dx = js._mouse.x - js.ball.x,
			dy = js._mouse.y - js.ball.y;

		var angle = Math.atan2(dy, dx),
			ax = Math.cos(angle) * js._vo,
			ay = Math.sin(angle) * js._vo;

		js.ball.vx = ax;
		js.ball.vy = ay;

		js.arrow.rotation = angle;
		
		js.drawFrame();
	},

	fMouseMove : function(){
		var dx = js._mouse.x - js.arrow.x,
			dy = js._mouse.y -js.arrow.y;

		var angle = Math.atan2(dy, dx);
		js.arrow.rotation = angle;

		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		js.arrow.draw(js.contexto);
		
	},
	
	drawFrame : function() {

		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);

		var left   = 0,
			right  = js.lienzo.width,
			top    = 0,
			bottom = js.lienzo.height;

		js.ball.vy += js._gravity;
		js.ball.x += js.ball.vx;
		js.ball.y += js.ball.vy;

		if (js.ball.x + js.ball.radius > right) { // lÃ­mite ancho der
			js.ball.x = right - js.ball.radius;
			js.ball.vx *= js._bounce;
		} else if (js.ball.x - js.ball.radius < left) { // lÃ­mite ancho izq
			js.ball.x = left + js.ball.radius;
			js.ball.vx *= js._bounce;
		} else if (js.ball.y + js.ball.radius > bottom) { // lÃ­mite ancho top
			js.ball.y = bottom - js.ball.radius;
			js.ball.vy *= js._bounce;
		} else if (js.ball.y - js.ball.radius < top) { // lÃ­mite ancho bottom
			js.ball.y = top + js.ball.radius;
			js.ball.vy *= js._bounce;
		}

		if (js.ball.y + js.ball.radius == bottom) {
			js.ball.vx *= js._friction;
			js.ball.vy *= js._friction;
			if (js._tmpx.toFixed(4) == js.ball.vx.toFixed(4)) {
				window.cancelAnimationFrame(js.globalId);
				return (console.log('stoped'), js.arrow.draw(js.contexto));
			
			}
		}

		js._tmpx = js.ball.vx;
		js.ball.draw(js.contexto);

		js.arrow.draw(js.contexto);

		js.globalId = window.requestAnimationFrame(js.drawFrame);
		return true;
	}	
};

js.init();

