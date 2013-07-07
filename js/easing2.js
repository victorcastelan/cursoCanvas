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
	_easing : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.mouse = utils.captureMouse(js.lienzo);
		js.ball = new Ball();
		js._easing = 0.05;
		//~ js._targetX = js.lienzo.width / 2;
		//~ js._targetY = js.lienzo.height / 2;
		//~ js._isMouseDown = false;
		
		//~ js.lienzo.addEventListener('mousedown', js.onMouseDown);
		
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
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		//~ if(!js._isMouseDown) {
			//~ var vx = (js._targetX - js.ball.x) * js._easing;
			//~ var vy = (js._targetY - js.ball.y) * js._easing;
			//~ js.ball.x += vx;
			//~ js.ball.y += vy;
		//~ }
		//~ if(!js._isMouseDown) {
			var vx = (js.mouse.x - js.ball.x) * js._easing;
			var vy = (js.mouse.y - js.ball.y) * js._easing;
			js.ball.x += vx;
			js.ball.y += vy;
		//~ }
		
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
