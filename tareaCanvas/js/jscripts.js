var js = {
	lienzo 		: null,
	contexto 	: null,
	globalId 	: null,
	ball 		: null,
	mouse 		: null,
	fotos 		: [],
	pistola 	: null,

	_images 	: [
		'img/mini.png',
		'img/bala_50x11.png',
		'img/bala_100x22.png',
		'img/bala_200x44.png',
	],

	_canvasDiv 	: '#canvasDiv',
	_vx 		: 0,
	_vy 		: 0,
	_ax 		: 0,
	_ay 		: 0,
	_gravity 	: 0,
	_bounce 	: 0,
	_friction 	: 0,
	_spring 	: 0,
	_targetX 	: 0,
	_targetY 	: 0,
	_isMouseDown: false
};

var fn = {
	init : function() {
		fn.crearCanvas();
		fn.cargarFotos(js._images, 0, fn.initApp);
	},

	crearCanvas : function() {
		$('<canvas></canvas>').attr({
			'id' : 'lienzo'
		}).appendTo(js._canvasDiv);

		js.lienzo = document.getElementById('lienzo');

		$(window).resize(fn.resizeCanvas);
		fn.resizeCanvas();
	},

	resizeCanvas : function() {
		var w = $(window).innerWidth(),
			h = $(window).innerHeight();
		$(js._canvasDiv).css({width : (w-20)+'px', height : (h-20)+'px'});
		$(js.lienzo).attr({width: (w-20), height: (h-20)});
	},

	cargarFotos : function(fotos, i, callback) {
		i = i || 0;
		if (i >= fotos.length) return callback();

		var foto = new Image();
		foto.src = fotos[i++];
		$(foto).load(function(){
			js.fotos.push(foto);
			fn.cargarFotos(fotos, i, callback)
		});
	},

	initApp : function() {
		js.contexto = js.lienzo.getContext('2d');
		js.mouse = utils.captureMouse(js.lienzo);
		
		js.pistola = new Pistola();
		js._force = 0.1;
		
		fn.drawFrame();
		
		////////////////////////////////////////////
		
		js._balls = [];
		js._numBalls = 120;
		js._gravity = 0.5;
		
		for (var ball, i=0; i < js._numBalls; i++) {
			ball = new Ball(2, Math.random() * 0xffffff);
			ball.x = js.lienzo.width/2;
			ball.y = js.lienzo.height;
			ball.vx = Math.random() * 2 -1;
			ball.vy = Math.random() * -10 -10;
			js._balls.push(ball);
		}
		
		
	},

	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(fn.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		//fn.dibujaPistola();

		var dx = js.mouse.x,
			dy = js.mouse.y - js.pistola.y -35,
			angle = Math.atan2(dy, dx),
			ax = Math.cos(angle) * js._force,
			ay = Math.sin(angle) * js._force;
		

		js.pistola.rotation = angle;

		js._vx += ax;
		js._vy += ay;

		js.pistola.y = 0;
		js.pistola.x = 50;

		js.pistola.draw(js.contexto);
		//js._balls.forEach(fn.draw);
		
	},
	
	draw : function(ball) {
		ball.vy += js._gravity;
		ball.x += ball.vx;
		ball.y += ball.vy;
		
		if (ball.x - ball.radius > js.lienzo.width || 
			ball.x + ball.radius < 0 ||
			ball.y - ball.radius > js.lienzo.height || 
			ball.y + ball.radius < 0) {
				ball.x = js.lienzo.width / 2;
				ball.y = js.lienzo.height;
				ball.vx = Math.random() * 2 -1;
				ball.vy = Math.random() * -10 -10;
		}
		ball.draw(js.contexto);
	},

	dibujaPistola : function(angulo) {
		js.contexto.drawImage(
			js.fotos[0],
			0,
			js.lienzo.height/2-js.fotos[0].height/4, // centramos la pistola
			js.fotos[0].width/2,
			js.fotos[0].height/2
		);
	}
};

$(fn.init);
