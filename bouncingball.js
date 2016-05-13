(function(){

	var canvas = document.getElementById("ball");
		c = canvas.getContext('2d'),
		gravity = 0.1,
		dampening = 0.99,
		pullStrength = 0.001,
		offset = 200,
		circles = [],
		numCircles = 10;

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	for(i = 0; i < numCircles; i++) {
		circles.push({
			x: getRandomInt(200, 600),
			y: getRandomInt(200, 600),
			// (vx, vy) = Velocity vector
			vx: 0,
			vy: 0,
			radius: 20
		});
	}

	function executeFrame(){
		var i, circle;
		for(i = 0; i < numCircles; i++) {
			circle = circles[i];
		
			// Increment location by velocity
			circle.x += circle.vx;
			circle.y += circle.vy;
	
			// Increment Gravity
			circle.vy += gravity;
	
			// Slow it down
			circle.vy *= dampening;
			circle.vx *= dampening;
	
			// Bounce - Bottom
			if(circle.y + circle.radius > canvas.height - offset){
				circle.y = canvas.height - offset - circle.radius;
				circle.vy = -Math.abs(circle.vy);
			}
			// Bounce - Top
			if(circle.y + circle.radius < offset){
				circle.y = offset + circle.radius;
				circle.vy = Math.abs(circle.vy);
			}
			// Bounce - Right
			if(circle.x + circle.radius > canvas.width - offset){
				circle.x = canvas.width - offset - circle.radius;
				circle.vx = -Math.abs(circle.vx);
			}
			// Bounce - Left
			if(circle.x - circle.radius < offset){
				circle.x = offset + circle.radius;
				circle.vx = Math.abs(circle.vx);
			}
	
			c.beginPath();
			c.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
			c.closePath();
			c.fillStyle = 'black';
			c.fill();

		}
	
		//c.clearRect(0, 0, canvas.width - 400, canvas.height - 400);
		c.fillStyle = 'rgba(255,255,255, 0.2)';
		c.fillRect(0, 0, canvas.width, canvas.height);

		requestAnimationFrame(executeFrame);
	}

	canvas.addEventListener('mousemove', function(event){
		var dx, dy, i, circle;

		for(i = 0; i < numCircles; i++) {
			circle = circles[i];
			dx = (event.pageX - 10) - circle.x,
			dy = (event.pageY - 10) - circle.y;
			circle.vx += dx * pullStrength;
			circle.vy += dy * pullStrength;
		}
	});

	// Start animation
	executeFrame();
})();