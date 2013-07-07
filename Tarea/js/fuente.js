var fuente = {
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
	init : function(){
		fuente.lienzo = document.getElementById('lienzo');
		fuente.contexto = fuente.lienzo.getContext('2d');
	}
};