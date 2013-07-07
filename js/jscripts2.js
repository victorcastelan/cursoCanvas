var js = {
	lienzo : null,
	contexto : null,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		js.lienzo = $('#lienzo');
		js.contexto = js.lienzo.get(0).getContext('2d');
		$(window).resize(js.resizeCanvas);
		js.resizeCanvas();
	},
	
	resizeCanvas : function() {
		js.lienzo.attr({
			'width':$(window).innerWidth(),
			'height':$(window).innerHeight(),
		});
		js.contexto.fillRect(0,0,js.lienzo.width(), js.lienzo.height());
	}
	
};

$(js.init);
