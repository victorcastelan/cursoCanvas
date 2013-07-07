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
		
		js.ball = new Ball();
		js._spring = 0.001;
		js._targetX = js.lienzo.width / 2;
		js._vx = 0;
		
		js.ball.y = js.lienzo.height / 2;
		
		js.drawFrame();
	},
	
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		var dx = js._targetX - js.ball.x,
			ax = dx * js._spring;
			
		js._vx += ax;
		js.ball.x += js._vx;
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
