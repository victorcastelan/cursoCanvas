var js = {
	lienzo : null,
	contexto : null,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = $('#lienzo');
		js.contexto = js.lienzo.get(0).getContext('2d');
		
		//~ js.pSave();
		//~ js.pTranslate();
		//~ js.pScale();
		js.pRotate();
		
	},
	
	pRotate : function() {
		js.contexto.save();
		js.contexto.translate(100,100);
		js.contexto.fillStyle = '#FF0000';
		js.contexto.fillRect(-50,-50,100,100);
		
		js.contexto.restore();
		js.contexto.translate(100,100);
		js.contexto.rotate(Math.PI/4);
		js.contexto.shadowBlur = 20;
		js.contexto.shadowOffsetX = 30;
		js.contexto.shadowOffsetY = 30;
		js.contexto.shadowColor = 'rgba(100,100,100,.5)';
		js.contexto.fillRect(-50,-50,100,100);
		
		js.contexto.fillStyle = '#ccc';
		js.contexto.fillRect(0,0,100,100);
		
		var dataURL = js.lienzo.get(0).toDataURL();
		var img = $('<img></img>');
		img.attr('src', dataURL);
		console.log(dataURL);
		js.lienzo.replaceWith(img);
	},
	
	pScale : function() {
		js.contexto.save();
		js.contexto.translate(150,150);
		js.contexto.scale(2,2);
		js.contexto.fillStyle = 'rgb(255,0,0)';
		js.contexto.fillRect(0,0,100,100);
		
		js.contexto.restore();
		
		js.contexto.fillRect(150,150,100,100);
	},
	
	pTranslate : function() {
		js.contexto.fillRect(150,150,110,110);
		js.contexto.translate(150,150);
		js.contexto.fillStyle = 'rgb(255,0,0)';
		js.contexto.fillRect(0,0,100,100);
	},
	
	pSave : function() {
		js.contexto.fillStyle = 'rgb(255,0,0)';
		js.contexto.save();
		js.contexto.fillRect(50,50,100,100);
		
		js.contexto.fillStyle = '#cccccc';
		
		js.contexto.fillRect(200,50,100,100);
		js.contexto.save();
		
		js.contexto.restore();
		js.contexto.fillRect(350,50,100,100);
		
		js.contexto.restore();
		js.contexto.fillRect(500,50,100,100);
	}
	
	
};

$(js.init);
