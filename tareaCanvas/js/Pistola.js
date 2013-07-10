
function Pistola() {
	this.x = 0;
	this.y = 0;
	this.rotation = 0;
}

Pistola.prototype.draw = function(context) {
	context.save();
	context.translate(this.x, this.y);
	
	context.rotate(this.rotation);
	// context.moveTo(-50, -25);
	context.drawImage(
			js.fotos[0],
			// 400,
			// jss.lienzo.height/2-jss.fotos[0].height/4, // centramos la pistola
			0,0,
			js.fotos[0].width/2,
			js.fotos[0].height/2
		);
	context.restore();
}
