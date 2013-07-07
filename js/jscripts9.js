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
	_spring : 0,
	_targetX : 0,
	_targetY : 0,
	
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.mouse = utils.captureMouse(js.lienzo);
		js.ball = new Ball();
		
		js._spring = 0.03;
		js._friction = 0.95;
		js._gravity = 2;
		
		
		//~ js._targetX = js.lienzo.width/2;
		//~ js._targetY = js.lienzo.height/2;
		js._vx = 0;
		js._vy = 0;
		
		//~ js.ball.x = js.lienzo.width/2;
		//~ js.ball.y = js.lienzo.height/2;
		
		
		
		js.drawFrame();
	},
	
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		var dx = js.mouse.x - js.ball.x,
			dy = js.mouse.y - js.ball.y,
			ax = dx * js._spring,
			ay = dy * js._spring;
		
		js._vx += ax;
		js._vy += ay;
		js._vy += js._gravity;
		js._vx *= js._friction;
		js._vy *= js._friction;
		
		js.ball.x += js._vx;
		js.ball.y += js._vy;
		
		js.contexto.beginPath();
		js.contexto.moveTo(js.ball.x, js.ball.y);
		js.contexto.lineTo(js.mouse.x, js.mouse.y);
		js.contexto.closePath();
		js.contexto.stroke();
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
