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
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.mouse = utils.captureMouse(js.lienzo);
		js.touch = utils.captureTouch(js.lienzo);
		js.ball = new Ball();
		
		js.ball.x = js.lienzo.width/2;
		js.ball.y = js.lienzo.height/2;
		
		js.lienzo.addEventListener('mousedown', js.fMouseDown);
		js.lienzo.addEventListener('touchstart', js.fTouchStart);
		
		
		js.drawFrame();
	},
	
	fMouseDown : function(event) {
		event.preventDefault();
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.lienzo.addEventListener('mouseup', js.fMouseUp);
			js.lienzo.addEventListener('mousemove', js.fMouseMove);
		}
		
	},
	
	fMouseUp : function(event) {
		event.preventDefault();
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.lienzo.removeEventListener('mouseup', js.fMouseUp);
			js.lienzo.removeEventListener('mousemove', js.fMouseMove);
		}
		
	},
	
	fMouseMove : function(event) {
		event.preventDefault();
		js.ball.x = js.mouse.x;
		js.ball.y = js.mouse.y;
	},
	
	fTouchStart : function(event) {
		event.preventDefault();
		if (utils.containsPoint(js.ball.getBounds(), js.touch.x, js.touch.y)) {
			js.lienzo.addEventListener('touchend', js.fTouchEnd);
			js.lienzo.addEventListener('touchmove', js.fTouchMove);
		}
		
	},
	
	fTouchEnd : function(event) {
		event.preventDefault();
		if (utils.containsPoint(js.ball.getBounds(), js.touch.x, js.touch.y)) {
			js.lienzo.removeEventListener('touchend', js.fTouchEnd);
			js.lienzo.removeEventListener('touchmove', js.fTouchMove);
		}
	},
	
	fTouchMove : function(event) {
		event.preventDefault();
		js.ball.x = js.touch.x;
		js.ball.y = js.touch.y;
	},
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
