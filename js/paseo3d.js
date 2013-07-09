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
	_trees : [],
	_numTrees : 0,
	_vz : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="lienzo" width="800" height="500"></canvas>');
		js.lienzo = document.getElementById('lienzo');
		js.contexto = js.lienzo.getContext('2d');
		js.mouse = utils.captureMouse(js.lienzo);
		
		js._trees = [];
		js._numTrees = 100;
		js._fl = 250;
		js._vpx = js.lienzo.width/2;
		js._vpy = js.lienzo.height/2;
		js._floor = 200;
		js._vz = 0;
		js._friction = 0.98;
		
		for(var tree, i=0;i<js._numTrees; i++) {
			tree = new Tree();
			tree.xpos = Math.random() * 2000 - 1000;
			tree.ypos = js._floor;
			tree.zpos = Math.random() * 10000;
			js._trees.push(tree);
		}
		
		window.addEventListener('keydown', js.onKeyDown);
		
		js.drawFrame();
	},
	
	onKeyDown : function(event) {
		if (event.keyCode === 38) js._vz -= 1
		else if(event.keyCode === 40) js._vz += 1;
	},
	
	drawFrame : function() {
		js.globalId = window.requestAnimationFrame(js.drawFrame, js.lienzo);
		js.contexto.clearRect(0,0,js.lienzo.width, js.lienzo.height);
		
		js._trees.forEach(js.move);
		js._vz *= js._friction;
		js._trees.sort(js.zSort)
		js._trees.forEach(js.draw);
		
	},
	
	zSort : function(a,b) {
		return (b.zpoz - a.zpos);
	},
	
	draw : function(tree) {
		tree.draw(js.contexto)
	},
	
	move : function(tree) {
		tree.zpos += js._vz;
		if(tree.zpos < -js._fl) tree.zpos += 10000;
		if(tree.zpos > 10000 -js._fl) tree.zpos -= 10000;
		
		var scale = js._fl / (js._fl + tree.zpos);
		tree.scaleX = tree.scaleY = scale;
		tree.x = js._vpx + tree.xpos * scale;
		tree.y = js._vpy + tree.ypos * scale;
		
		//tree.alpha = scale;
	}
	
	
};

$(js.init);
