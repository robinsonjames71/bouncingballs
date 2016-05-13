(function(){

	var canvas = document.getElementById("ball");
	c = canvas.getContext('2d'),
	gravity = 0.1,
	dampening = 0.99;

	var circle = {
		x: 50,
		y: 50,
		// (vx, vy) = Velocity vector
		vx: 0,
		vy: 0,
		radius: 20
	};

	function executeFrame(){
		// Increment location by velocity
		circle.x += circle.vx;
		circle.y += circle.vy;

		// Increment Gravity
		circle.vy += gravity;

		// Slow it down
		circle.vy *= dampening;
		circle.vx *= dampening;

		if(circle.y + circle.radius > canvas.height){
			circle.y = canvas.height - circle.radius;
			circle.vy = -Math.abs(circle.vy);
		}

		c.clearRect(0, 0, canvas.width, canvas.height);

		c.beginPath();
		c.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
		c.closePath();
		c.fill();

		requestAnimationFrame(executeFrame);
	}

	// Start animation
	executeFrame();
})();