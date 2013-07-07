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
	_handles : null,
	_numHandles : 0,
	_movingHandle : null,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.mouse = utils.captureMouse(js.lienzo);
		js.ball = new Ball(20);
		js._handles = [];
		js._numHandles = 10;
		js._spring = 0.03;
		js._friction = 0.9;
		js._movingHandle = null;
		
		for(var handle, i=0; i<js._numHandles; i++) {
			handle = new Ball(10, '#0000ff');
			handle.x = Math.random() * js.lienzo.width;
			handle.y = Math.random() * js.lienzo.height;
			js._handles.push(handle);
		}
		
		js.lienzo.addEventListener('mousedown', js.onMouseDown);
		js.lienzo.addEventListener('mouseup', js.onMouseUp);
		js.lienzo.addEventListener('mousemove', js.onMouseMove);
		
		js.drawFrame();
	},
	
	onMouseDown : function() {
		js._handles.forEach(function(handle){
			if(utils.containsPoint(handle.getBounds(), js.mouse.x, js.mouse.y)) {
				js._movingHandle = handle;
			}
		});
	},
	
	onMouseUp : function() {
		if (js._movingHandle) {
			js._movingHandle = null;
		}
	},
	
	onMouseMove : function() {
		if(js._movingHandle){
			js._movingHandle.x = js.mouse.x;
			js._movingHandle.y = js.mouse.y;
		}
	},
	
	applyHandle : function(handle) {
		var dx = handle.x - js.ball.x,
			dy = handle.y - js.ball.y;
			
		js.ball.vx += dx * js._spring;
		js.ball.vy += dy * js._spring;
	},
	
	drawHandle : function(handle) {
		js.contexto.moveTo(js.ball.x, js.ball.y);
		js.contexto.lineTo(handle.x, handle.y);
		js.contexto.stroke();
		handle.draw(js.contexto);
		js.contexto.closePath();
	},
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js._handles.forEach(js.applyHandle);
		js.ball.vx *= js._friction;
		js.ball.vy *= js._friction;
		
		js.ball.x += js.ball.vx;
		js.ball.y += js.ball.vy;
		
		js.contexto.beginPath();
		js._handles.forEach(js.drawHandle);
		
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
