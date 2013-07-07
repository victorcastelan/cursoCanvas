var js = {
	lienzo : null,
	contexto : null,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		js.lienzo = document.getElementById('lienzo');
		js.contexto = lienzo.getContext('2d');
		//~ js.dibujar();
		js.dibujaPlano();
	},
	
	dibujar : function() {
		js.contexto.fillRect(10,10,100,120);
		
	},
	
	dibujaPlano : function() {
		var margen = 20.5;
		js.contexto.font = "normal 6px sans-serif";
		
		for (var x=margen; x<500; x+=5) {
			//js.contexto.fillText(x, x,0);
			js.contexto.moveTo(x,margen);
			js.contexto.lineTo(x,375);
		}
		for (var y=margen; y<375; y+=5) {
			js.contexto.fillText(y-margen, 0,y);
			js.contexto.moveTo(margen,y);
			js.contexto.lineTo(500,y);
		}
		
		js.contexto.strokeStyle = '#bbb';
		js.contexto.stroke();
		
		js.contexto.beginPath();
		js.contexto.moveTo(margen,40);
		js.contexto.lineTo(240,40);
		
		js.contexto.moveTo(260,40);
		js.contexto.lineTo(500,40);
		
		js.contexto.moveTo(60,margen);
		js.contexto.lineTo(60,153);
		
		js.contexto.moveTo(60,173);
		js.contexto.lineTo(60,375);
		
		js.contexto.strokeStyle = '#000';
		js.contexto.stroke();
		
		js.contexto.font = "bold 14px sans-serif";
		js.contexto.fillText('x', 248,43);
		
		js.contexto.font = "bold 20px sans-serif";
		js.contexto.fillText('y', 55,170);
	}
};

//$(function(){js.init()});
$(js.init);
