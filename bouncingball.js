(function(){

	var canvas = document.getElementById("ball");
	c = canvas.getContext('2d');

	var circle = {
		x: 50,
		y: 50,
		radius: 20
	};

	function executeFrame(){
		circle.y++;

		c.clearRect(0, 0, canvas.width, canvas.height);

		c.beginPath();
		c.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
		c.closePath();
		c.fill();

		if(circle.y < canvas.height - circle.radius) {
			requestAnimationFrame(executeFrame);
		}
	}

	// Start animation
	executeFrame();
})();