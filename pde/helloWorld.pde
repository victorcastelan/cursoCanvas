
void setup() {
	size(200,200);
	background(102);
	//~ stroke(255);
	//~ ellipse(50,50,25,25);
	//~ println('Hello World');
}

void draw() {
	stroke(255);
	if(mousePressed) {
		line(mouseX, mouseY, pmouseX, pmouseY)
	}
}
