var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	ball : null,
	ball0 : null,
	ball1 : null,
	ball2 : null,
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
		
		js.ball0 = new Ball();
		js.ball1 = new Ball();
		js.ball2 = new Ball();
		
		//~ js.ball0.vx = js.ball0.vy = 0;
		//~ js.ball1.vx = js.ball1.vy = 0;
		//~ js.ball2.vx = js.ball2.vy = 0;
		
		js._spring = 0.03;
		js._friction = 0.9;
		js._gravity = 2;
		
		
		
		js.drawFrame();
	},
	
	move : function(ball, targetX, targetY) {
		
		ball.vx += (targetX - ball.x) * js._spring;
		ball.vy += (targetY - ball.y) * js._spring;
		
		ball.vy += js._gravity;
		
		ball.vx *= js._friction
		ball.vy *= js._friction;
		
		ball.x += ball.vx;
		ball.y += ball.vy;
	},
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js.move(js.ball0, js.mouse.x, js.mouse.y);
		js.move(js.ball1, js.ball0.x, js.ball0.y);
		js.move(js.ball2, js.ball1.x, js.ball1.y);
		
		js.contexto.beginPath();
		js.contexto.moveTo(js.mouse.x, js.mouse.y);
		js.contexto.lineTo(js.ball0.x, js.ball0.y);
		js.contexto.lineTo(js.ball1.x, js.ball1.y);
		js.contexto.lineTo(js.ball2.x, js.ball2.y);
		//~ js.contexto.closePath();
		js.contexto.stroke();
		
		js.ball0.draw(js.contexto);
		js.ball1.draw(js.contexto);
		js.ball2.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
