
boolean overLeftButton = false;
boolean overRightButton = false;

void setup() {
	size(200,200);
}

void draw() {
	background(204);
	// Botón izquierdo
	if(overLeftButton == true) {
		fill(255);
	} else {noFill();}
	
	rect(20,60,75,75);
	rect(50,90,15,15);
	
	// Botón derecho
	if(overRightButton == true) {
		fill(255);
	} else {noFill();}
	
	rect(105,60,75,75);
	
	line(135,105,155,85);
	line(140,85,155,85);
	line(155,85,155,100);
	
	
}

void mousePressed() {
	if(overLeftButton) {
		link('http://yahoo.com', '_new');
	} else if(overRightButton) {
		link('http://yahoo.com', '_new');
	}
}

void mouseMoved() {
	checkButtons();
}

void mouseDragged() {
	checkButtons();
}

void checkButtons() {
	if(mouseX > 20 && mouseX < 95 && mouseY > 60 && mouseY < 135) {
		overLeftButton = true;
	} else if(mouseX > 105 && mouseX < 180 && mouseY > 60 && mouseY < 135) {
		overRightButton = true;
	} else {
		overLeftButton = overRightButton = false;
	}
}
