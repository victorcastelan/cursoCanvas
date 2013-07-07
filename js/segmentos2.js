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
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		js.segmento0 = new Segment(100, 20);
		js.segmento1 = new Segment(100, 20);
		js.slider0 = new Slider(-90, 90, 0);
		js.slider1 = new Slider(-90, 90, 0);
		
		js.segmento0.x = 100;
		js.segmento0.y = 100;
		js.slider0.x = 300;
		js.slider0.y = 20;
		js.slider0.captureMouse(js.lienzo);
		js.slider0.onchange = js.drawFrame;
		
		//~ js.segmento1.x = 320;
		//~ js.segmento1.y = 20;
		js.slider1.x = 340;
		js.slider1.y = 20;
		js.slider1.captureMouse(js.lienzo);
		js.slider1.onchange = js.drawFrame;
		
		
		js.drawFrame();
	},
	
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js.segmento0.rotation = js.slider0.value * Math.PI / 180;
		js.segmento1.rotation = js.slider1.value * Math.PI / 180;
		
		js.segmento1.x = js.segmento0.getPin().x;
		js.segmento1.y = js.segmento0.getPin().y;
		
		js.segmento0.draw(js.contexto);
		js.segmento1.draw(js.contexto);
		js.slider0.draw(js.contexto);
		js.slider1.draw(js.contexto);
		
	}
	
	
	
	
};

$(js.init);
