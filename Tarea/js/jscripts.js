var js = {
	canvas : null,
	context : null,
	init : function(){
		js.canvas = $("#lienzo");
		js.context = js.canvas.get(0).getContext("2d");
		js.saveCanvas();

	},

	saveCanvas : function(){
		js.context.fillStyle = "rgb(255,0,0)";

		js.context.fillRect(50,50,100,100);
		js.context.save();
		
		js.context.fillStyle = "rgb(0,0,255)";
		js.context.fillRect(200,50,100,100);

		js.context.restore();
		js.context.fillRect(350,50,100,100);
	}
};

$(js.init);