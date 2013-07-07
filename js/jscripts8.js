var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	ball : null,
	mouse : null,
	touch : null,
	log : null,
	_vx : 0,
	_vy : 0,
	_ax : 0,
	_ay : 0,
	_gravity : 0,
	_bounce : 0,
	_friction : 0,
	_tmpx : null,
	_isMouseDown : false,
	_oldX : 0,
	_oldY : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.mouse = utils.captureMouse(js.lienzo);
		js.ball = new Ball();
		js._vx = Math.random() * 10 -5;
		js._vy = -10;
		js._bounce = -0.7;
		js._gravity = 0.2;
		js._isMouseDown = false;
		
		js.ball.x = js.lienzo.width/2;
		js.ball.y = js.lienzo.height/2;
		
		js.lienzo.addEventListener('mousedown', js.onMouseDown);
		
		
		js.drawFrame();
	},
	
	onMouseDown : function() {
		if(utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js._isMouseDown = true;
			js._oldX = js.ball.x;
			js._oldY = js.ball.y;
			
			js.lienzo.style.cursor = 'pointer';
			
			js.lienzo.addEventListener('mouseup', js.onMouseUp);
			js.lienzo.addEventListener('mousemove', js.onMouseMove);
		}
	},
	
	onMouseUp : function() {
		js._isMouseDown = false;
		
		js.lienzo.style.cursor = 'default';
		
		js.lienzo.removeEventListener('mouseup', js.onMouseUp);
		js.lienzo.removeEventListener('mousemove', js.onMouseMove);
	},
	
	onMouseMove : function() {
		js.lienzo.style.cursor = 'pointer';
		js.ball.x = js.mouse.x;
		js.ball.y = js.mouse.y;
	},
	
	trackVelocity : function() {
		js._vx = js.ball.x - js._oldX;
		js._vy = js.ball.y - js._oldY;
		js._oldX = js.ball.x;
		js._oldY = js.ball.y;
	},
	
	checkBoundaries : function() {
		var left = 0,
			right = js.lienzo.width,
			top = 0,
			bottom = js.lienzo.height;
			
		js._vy += js._gravity;
		js.ball.x += js._vx;
		js.ball.y += js._vy;
		
		//limites de desplazamiento horizontal
		if(js.ball.x + js.ball.radius > right) {
			js.ball.x = right - js.ball.radius;
			js._vx *= js._bounce;
		} else if(js.ball.x - js.ball.radius < left) {
			js.ball.x = left + js.ball.radius;
			js._vx *= js._bounce;
		}
		
		//limites de desplazamiento vertical
		if(js.ball.y + js.ball.radius > bottom) {
			js.ball.y = bottom - js.ball.radius;
			js._vy *= js._bounce;
		} else if(js.ball.y - js.ball.radius < top) {
			js.ball.y = top + js.ball.radius;
			js._vy *= js._bounce;
		}
	},
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		if(js._isMouseDown) {
			js.trackVelocity();
			
		} else {
			js.checkBoundaries();
			
		}
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
