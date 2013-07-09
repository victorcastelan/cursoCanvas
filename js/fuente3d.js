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
	_balls : [],
	_numBalls : 0,
	_floor : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		js.mouse = utils.captureMouse(js.lienzo);
		
		js._balls = [];
		js._numBalls = 500;
		js._fl = 250;
		js._vpx = js.lienzo.width/2;
		js._vpy = js.lienzo.height/2;
		js._gravity = 0.2;
		js._floor = 200;
		js._bounce = -0.6;
		
		for (var ball, i = 0; i < js._numBalls; i++) {
			var radio = Math.ceil(Math.random() * 12);
			ball = new Ball3d(radio, Math.random() * 0xffffff);
			ball.ypos = -100;
			ball.vx = Math.random() * 6 -3;
			ball.vy = Math.random() * 6 -3;
			ball.vz = Math.random() * 6 -3;
			
			js._balls.push(ball);
		}
		
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
		
		js._balls.forEach(js.move);
		js._balls.sort(js.zSort);
		js._balls.forEach(js.draw);
		
	},
	
	move : function(ball) {
		ball.vy += js._gravity;
		ball.xpos += ball.vx;
		ball.ypos += ball.vy;
		ball.zpos += ball.vz;
		
		if(ball.ypos > js._floor) {
			ball.ypos = js._floor;
			ball.vy *= js._bounce;
		}
		
		if(ball.zpos > -js._fl) {
			var scale = js._fl / (js._fl + ball.zpos);
			ball.scalex = ball.scaleY = scale;
			ball.x = js._vpx + ball.xpos * scale;
			ball.y = js._vpy + ball.ypos * scale;
			ball.visible = true;
		} else {
			ball.visible = false;
		}
	},
	
	zSort : function(a,b) {
		return (b.zpos - a.zpos);
	},
	
	draw : function(ball) {
		if(ball.visible) {
			ball.draw(js.contexto);
		}
	}
	
	
	
	
};

$(js.init);
