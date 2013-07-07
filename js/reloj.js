var js = {
	canvas : null,
	context : null,
	startValue : 0,
	
	init : function() {
		js.initApp();
	},
	
	initApp : function() {
		$('.canvasDiv').html('<canvas id="clock" width="768" height="768"></canvas>');
		js.canvas = document.getElementById('clock');
		js.context = js.canvas.getContext('2d');
		js.floting();
		
		js.startValue = 0;
		//~ requestAnimationFrame(js.redrawClock);
		js.redrawClock();
	},
	
	floting : function() {
		Math.roundFloat = function(number, precision) {
			var multiple = Math.pow(10, precision);
			return Math.round(number * multiple) / multiple;
		};

		Math.easeInOutQuad = function(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};
	},
	
	 clearCanvas : function() {
        js.context.clearRect(0, 0, js.canvas.clientWidth, js.canvas.clientHeight);
    },
    
    drawCircle : function(x, y, radius) {
        js.context.beginPath();
        js.context.arc(x, y, radius, Math.PI * 2, 0, true);
        js.context.closePath();

        js.context.fill();
    },
    
    drawRing : function (x, y, outsideRadius, ringWidth, percentFilled, rotationAngle) {
        js.context.beginPath();

        js.context.arc(x, y, outsideRadius - ringWidth / 2, rotationAngle, (rotationAngle - 2 * Math.PI) + 2 * Math.PI * percentFilled, true);

        js.context.lineWidth = ringWidth;
        js.context.stroke();
    },
    
    drawLine : function (x1, y1, x2, y2, lineWidth) {
        js.context.beginPath();
        js.context.moveTo(x1, y1);
        js.context.lineTo(x2, y2);
        js.context.closePath();

        js.context.lineWidth = lineWidth;
        js.context.stroke();
    },
    
    redrawClock : function() {
        var timestamp = new Date(),
            milliseconds = timestamp.getMilliseconds(),
            seconds = timestamp.getSeconds(),
            minutes = timestamp.getMinutes(),
            hours = timestamp.getHours(),
            x, y, animatedSeconds;

        js.clearCanvas();

        // calculate the sin & cos in a clockwise direction (starting at PI/2 rad) with smooth per-millisecond animation
        x = Math.roundFloat(Math.cos((seconds + milliseconds / 1000) * -Math.PI / 30 + Math.PI / 2), 5);
        y = Math.roundFloat(Math.sin((seconds + milliseconds / 1000) * -Math.PI / 30 + Math.PI / 2), 5);

        // Translucency
        js.context.strokeStyle = js.context.fillStyle = "rgba(255, 255, 255, 0.13)";

        // Draw the second ring
        animatedSeconds = seconds + 1;
        if (milliseconds > 10) {
            if (!js.startValue) {
                js.startValue = milliseconds;
            }
            if (milliseconds - js.startValue <= 100) {
                animatedSeconds -= -0.5 + Math.easeInOutQuad(milliseconds - js.startValue, js.startValue, 1000 - js.startValue, 125) / 1000;
            }
        } else {
            js.startValue = 0;
        }
        js.drawRing(384, 384, 384, 20, animatedSeconds / 60, 3 / 2 * Math.PI, false);

        // Draw the minute ring
        js.drawRing(384, 384, 384 - 30, 20, minutes / 60, 3 / 2 * Math.PI, false);

        // Draw the hour ring
        js.drawRing(384, 384, 384 - 60, 20, hours / 24, 3 / 2 * Math.PI, false);

        // Draw second-hand base circle
        js.context.strokeStyle = "rgba(255, 255, 255, 0.28)";
        js.drawCircle(384, 384, 16);

        // Draw second-hand line
        js.context.strokeStyle = "rgba(255, 255, 255, 0.63)";
        js.drawLine(384 + 16 * x, 384 - 16 * y, 384 + 384 * x, 384 - 384 * y, 1);

        // Keep on drawing, when the browser says so
        requestAnimationFrame(js.redrawClock);
    }
	
};

$(js.init);
