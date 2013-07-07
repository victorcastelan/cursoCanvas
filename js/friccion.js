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
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.ball = new Ball();
		js._vx = Math.random() * 10;
		js._vy = Math.random() * 10;
		js._friction = 0.95;
		
		js.ball.x = js.lienzo.width / 2;
		js.ball.y = js.lienzo.height / 2;
		
		js.drawFrame();
	},
	
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js._vx *= js._friction;
		js._vy *= js._friction;
		//~ var speed = Math.sqrt(js._vx * js._vx + js._vy * js._vy),
			//~ angle = Math.atan2(js._vy, js._vx);
		//~ 
		//~ if (speed > js._friction) {
			//~ speed -= js._friction;
		//~ } else {
			//~ speed = 0;
		//~ }
		//~ 
		//~ js._vx = Math.cos(angle) * speed;
		//~ js._vy = Math.sin(angle) * speed;
		//~ 
		js.ball.x += js._vx;
		js.ball.y += js._vy;
			
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
