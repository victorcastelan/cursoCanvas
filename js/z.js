var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	ball : null,
	mouse : null,
	touch : null,
	log : null,
	segmento : null,
	segmento0 : null,
	segmento1 : null,
	slider : null,
	slider0 : null,
	slider1 : null,
	_vx : 0,
	_vy : 0,
	_ax : 0,
	_ay : 0,
	_gravity : 0,
	_bounce : 0,
	_friction : 0,
	_isMouseDown : false,
	_spring : 0,
	_targetX : 0,
	_targetY : 0,
	_xpos : 0,
	_ypos : 0,
	_zpos : 0,
	_fl : 0,
	_vpx : 0,
	_vpy : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		js.mouse = utils.captureMouse(js.lienzo);
		js.ball = new Ball();
		js._xpos = 0;
		js._ypos = 0;
		js._zpos = 0;
		js._fl = 250;
		js._vpx = js.lienzo.width/2;
		js._vpy = js.lienzo.height/2;
		
		window.addEventListener('keydown', js.onKeyDown);
		
		js.drawFrame();
	},
	
	onKeyDown : function(event) {
		if(event.keyCode === 38){
			js._zpos += 5;
		} else if(event.keyCode === 40) {
			js._zpos -= 5;
		}
	},
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		var scale = js._fl / (js._fl+js._zpos);
		js._xpos = js.mouse.x - js._vpx;
		js._ypos = js.mouse.y - js._vpy;
		
		js.ball.scaleX = js.ball.scaleY = scale;
		js.ball.x = js._vpx + js._xpos * scale;
		js.ball.y = js._vpy + js._ypos * scale;
		
		js.ball.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
