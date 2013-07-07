var js = {
	lienzo : null,
	contexto : null,
	globalId : null,
	_ball : null,
	_vx : 0,
	_vy : 0,
	_ax : 0,
	_ay : 0,
	_gravity : 0,
	_balls : [],
	_numBalls : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		
		js.ball.prototype.draw = function(context) {
			context.save();
			context.translate(this.x, this.y);
			context.rotate(this.rotation);
			context.scale(this.scaleX, this.scaleY);
			context.lineWidth = this.lineWidth;
			context.fillStyle = this.color;
			context.beginPath();
			context.arc(0,0,this.radius,0,(Math.PI * 2), true);
			context.closePath();
			context.fill();
			if(this.lineWidth > 0) context.stroke();
			context.restore();
		}
		
		js._balls = [];
		js._numBalls = 120;
		js._gravity = 0.5;
		
		for (var ball, i=0; i < js._numBalls; i++) {
			ball = new js.ball(22, Math.random() * 0xffffff);
			ball.x = js.lienzo.width/2;
			ball.y = js.lienzo.height;
			ball.vx = Math.random() * 2 -1;
			ball.vy = Math.random() * -10 -10;
			js._balls.push(ball);
		}
		
		js.drawFrame();
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
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js._balls.forEach(js.draw);
		
	},
	
	ball : function(radius, color) {
		radius = radius || 40;
		color = color || '#FF0000';
		this.x = 0;
		this.y = 0;
		this.radius = radius;
		this.rotation = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.color = utils.parseColor(color);
		this.lineWidth = 1;
	},
	
	repiteAnimacion : function() {
		$('<div />').appendTo('body');
		js.globalId = requestAnimationFrame(js.repiteAnimacion);
	},
	
	pFotos : function() {
		//~ js.contexto.shadowBlur = 20;
		//~ js.contexto.shadowColor = 'rgba(0,0,0,.6)';
		var foto = new Image();
		foto.src = 'img/foto.jpg';
		$(foto).load(function(){
			//~ js.contexto.drawImage(foto,0,0,js.lienzo.width(),js.lienzo.height()); // image resize
			//~ js.contexto.drawImage(foto,180,0,250,250,0,0,250,250); // clipping image
			
			js.contexto.drawImage(foto,0,0,js.lienzo.width(),js.lienzo.height());
			//~ var imageData = js.contexto.getImageData(0,0,3,3);
			//~ var pixel = imageData.data;
			//~ var red = pixel[0];
			//~ var green = pixel[1];
			//~ var blue = pixel[2];
			//~ var alpha = pixel[3];
			//~ 
			//~ console.log(red,green,blue,alpha);
			js.lienzo.click(function(e){
				var lienzoOffset = js.lienzo.offset();
				var lienzoX = Math.floor(e.pageX - lienzoOffset.left);
				var lienzoY = Math.floor(e.pageY - lienzoOffset.top);
				var imageData = js.contexto.getImageData(lienzoX,lienzoY,1,1);
				var p = imageData.data;
				var colorPixel = 'rgba('+p[0]+','+p[1]+','+p[2]+','+p[3]+')';
				$('#muestra').css('backgroundColor',colorPixel).html(colorPixel);
				
				js.contexto.fillStyle = colorPixel;
				
				js.contexto.fillRect(js.lienzo.width() - 100,0,200,50);
				js.contexto.font = "normal 10px sans-serif";
				js.contexto.fillStyle = '#fff';
				js.contexto.fillText(colorPixel, js.lienzo.width() - 100,25);
			});
		});
	},
	
	pGradienteR : function() {
		var centroX = js.lienzo.width() / 2;
		var centroY = js.lienzo.height() / 2;
		var gradiente = js.contexto.createRadialGradient(centroX,centroY,0,200,centroY,250);
		gradiente.addColorStop(0,'#ffffff');
		gradiente.addColorStop(0.5,'#ff0000');
		gradiente.addColorStop(1,'#000000');
		js.contexto.fillStyle = gradiente;
		js.contexto.fillRect(0,0,js.lienzo.width(),js.lienzo.height());
	},
	
	pGradienteL : function() {
		var gradiente = js.contexto.createLinearGradient(0,0,0,js.lienzo.height());
		gradiente.addColorStop(0,'#ffffff');
		gradiente.addColorStop(.5,'#ff0000');
		gradiente.addColorStop(1,'#000000');
		js.contexto.fillStyle = gradiente;
		js.contexto.fillRect(0,0,js.lienzo.width(),js.lienzo.height());
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
