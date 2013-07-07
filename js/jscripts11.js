var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	ball : null,
	mouse : null,
	touch : null,
	log : null,
	segmento0 : null,
	segmento1 : null,
	segmento2 : null,
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
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		js.segmento0 = new Segment(100, 20),
		js.segmento1 = new Segment(200, 10),
		js.segmento2 = new Segment(80, 40),
		
		js.segmento0.x = 100;
		js.segmento0.y = 50;
		js.segmento0.draw(js.contexto);
		
		js.segmento1.x = 100;
		js.segmento1.y = 80;
		js.segmento1.draw(js.contexto);
		
		js.segmento2.x = 100;
		js.segmento2.y = 120;
		js.segmento2.draw(js.contexto);
		
		
		//~ js.drawFrame();
	},
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		
		
	}
	
	
	
	
};

$(js.init);
