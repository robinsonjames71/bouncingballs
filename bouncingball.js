var canvas = document.getElementById("ball");
c = canvas.getContext('2d');

var x = 50,
	y = 50,
	radius = 20;


function executeFrame(){
	y++;

	c.beginPath();
	c.arc(x, y, radius, 0, 2*Math.PI);
	c.closePath();
	c.fill();

	requestAnimationFrame(executeFrame);
}

// Start animation
executeFrame();