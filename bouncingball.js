(function(){

	var canvas = document.getElementById("ball");
		c = canvas.getContext('2d'),
		gravity = 0.1,
		dampening = 0.99,
		pullStrength = 0.005,
		offset = 200,
		circles = [],
		numCircles = 10,
		repulsion = 1;

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
		var i, j, circle;
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

			// Collision
			for (j = i + 1; j < numCircles; j++) {
				collide(circle, circles[j])
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

		executeInteraction();

		requestAnimationFrame(executeFrame);
	}

	function collide(a, b) {
		var dx = b.x - a.x,
			dy = b.y - a.y,
			// Distance between balls
			d = Math.sqrt(dx*dx + dy*dy),
			ux = dx / d,
			uy = dy / d;

		if(d < a.radius + b.radius){
			a.vx -= ux * repulsion;
			a.vy -= uy * repulsion;
			b.vx += ux * repulsion;
			b.vy += uy * repulsion;
		}
	}

	var mouseDown = false,
		mouseX, mouseY;
	canvas.addEventListener('mousedown', function(event){
		mouseDown = true;
		mouseX = event.pageX;
		mouseY = event.pageY;
	});
	canvas.addEventListener('mouseup', function(event){
		mouseDown = false;
	});
	canvas.addEventListener('mousemove', function(event){
		mouseX = event.pageX;
		mouseY = event.pageY;
	});
	function executeInteraction(){
		if(mouseDown){
			var dx, dy, i, circle;

			for(i = 0; i < numCircles; i++) {
				circle = circles[i];
				dx = mouseX - circle.x,
				dy = mouseY - circle.y;
				circle.vx += dx * pullStrength;
				circle.vy += dy * pullStrength;
			}
		}
	};

	// Start animation
	executeFrame();
})();