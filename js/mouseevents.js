var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	ball : null,
	mouse : null,
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
		
		js.ball = new Ball();
		
		js.mouse = utils.captureMouse(js.lienzo);
		js.log = document.getElementById('log');
		
		js.ball.x = js.lienzo.width/2;
		js.ball.y = js.lienzo.height/2;
		
		js.ball.draw(js.contexto);
		
		js.lienzo.addEventListener('mousedown', js.fMouseDown);
		js.lienzo.addEventListener('mouseup', js.fMouseUp);
		js.lienzo.addEventListener('mousemove', js.fMouseMove);
		js.lienzo.addEventListener('touchstart', js.fTouchStart);
		js.lienzo.addEventListener('touchend', js.fTouchEnd);
		js.lienzo.addEventListener('touchmove', js.fTouchMove);
		
		//js.drawFrame();
	},
	
	fMouseDown : function(event) {
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.log.value = "Mouse down en Ball";
		} else {
			js.log.value = "Mouse down en Canvas";
		}
	},
	
	fMouseUp : function(event) {
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.log.value = "Mouse up en Ball";
		} else {
			js.log.value = "Mouse up en Canvas";
		}
	},
	
	fMouseMove : function(event) {
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.log.value = "Mouse move en Ball";
		} else {
			js.log.value = "Mouse move en Canvas";
		}
	},
	
	fTouchStart : function(event) {
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.log.value = "Touch start en Ball";
		} else {
			js.log.value = "Touch start en Canvas";
		}
	},
	
	fTouchEnd : function(event) {
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.log.value = "Touch end en Ball";
		} else {
			js.log.value = "Touch end en Canvas";
		}
	},
	
	fTouchMove : function(event) {
		if (utils.containsPoint(js.ball.getBounds(), js.mouse.x, js.mouse.y)) {
			js.log.value = "Touch move en Ball";
		} else {
			js.log.value = "Touch move en Canvas";
		}
	},
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		
		js.ball.draw(js.contexto);
		
		var arr = ["_vx", "_vy", "_ax", "_ay", "_gravity", "_bounce", "_friction"];
		for (var i in arr) {
			$(arr[i].replace('_','.')).html(js[arr[i]]);
		}
	}
	
	
	
	
};

$(js.init);
