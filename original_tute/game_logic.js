window.onload = function(){
	// global variables
	// canvas
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	// ball variables
	var x = canvas.width/2;
	var y = canvas.height - 30;
	var dx = 2;
	var dy = -2;
	var ballRadius = 10;

	// paddle variables
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;
	var rightPressed = false;
	var leftPressed = false;

	// brick field variables
	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	var bricks = []

	// initialize brick field
	for (c = 0; c < brickColumnCount; c++) {
		bricks[c] = [];
		for (r = 0; r < brickRowCount; r++) {
			bricks[c][r] = { 	
								x: 0, 
								y: 0,
								status: 1
							};
		}
	}

	// scoring
	var score = 0;

	// player lives
	var lives = 3;

	function main() {
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("mousemove", mouseMoveHandler, false);
		draw();
	}

	// rendering
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBricks();
		drawBall();
		updateBall();
		drawPaddle();
		updatePaddle();
		drawScore();
		drawLives();
		requestAnimationFrame(draw);
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y , ballRadius, 0, Math.PI*2);
		ctx.fillStyle= "#0095DD";
		ctx.fill();
		ctx.closePath();
	}

	function updateBall() {
		if (y + dy < ballRadius) {
			dy = -dy;
		} else if (y + dy > canvas.height-ballRadius) {
			if (x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
			} else {
				lives--;
				if (lives == 0) {
					alert("GAME OVER");
					document.location.reload();
				} else {
					x = canvas.width/2
					y = canvas.height-30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width-paddleWidth)/2
				}
			}
		}

		if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
			dx = -dx;
		}
		collisionDetection();
		x += dx;
		y += dy;
	}

	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle = "#9905DD";
		ctx.fill();
		ctx.closePath();
	}

	function updatePaddle() {
		if (rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += 7;
		} else if (leftPressed && paddleX > 0) {
			paddleX -= 7;
		}
	}

	function drawBricks() {
		var brickX = 0;
		var brickY = 0;
		for (c = 0; c < brickColumnCount; c++) {
			for (r = 0; r < brickRowCount; r++) {
				if (bricks[c][r].status == 1) {
					brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fillStyle = '#0095DD';
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}

	// collision detection
	function collisionDetection() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				var b = bricks[c][r];
				if (b.status == 1) {
					if (x > b.x && x < b.x+brickWidth && 
						y > b.y && y < b.y+brickHeight) {
						dy = -dy;
						b.status = 0;
						score++;
						if (score == brickRowCount*brickColumnCount) {
							alert("You win, congratulations!");
							document.location.reload();
						}
					}
				}
			}
		}
	}

	// scoring
	function drawScore() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score: " + score, 8, 20);
	}

	// lives
	function drawLives() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "0095DD";
		ctx.fillText("Lives: " + lives, canvas.width-65, 20);
	}

	// handling user input
	function keyDownHandler(e) {
		if (e.keyCode == 39) {
			rightPressed = true;
		} else if (e.keyCode == 37) {
			leftPressed = true;
		}
	}

	function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		} else if (e.keyCode == 37) {
			leftPressed = false;
		}
	}

	function mouseMoveHandler(e) {
		var relativeX = e.clientX - canvas.offsetLeft;
		if (relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
		}
	}

	main();

}

