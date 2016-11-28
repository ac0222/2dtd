// Ball class

var Ball = function(world, radius, xPos, yPos, xSpeed, ySpeed) {
	this.world = world;
	this.radius = radius;
	this.xPos = xPos;
	this.yPos = yPos;
	this.xSpeed = xSpeed // pixels per second;
	this.ySpeed = ySpeed // pixels per second;
}

Ball.prototype.move = function() {
	this.moveX();
	this.moveY();
}

Ball.prototype.moveX = function() {
	var dx = this.xSpeed/REFRESH_RATE;
	var newx = this.xPos + dx;
	if (this.detectCollisions(newx, this.yPos)) {
		newx = this.xPos - dx;
		this.xSpeed = -this.xSpeed;
	}
	this.xPos = newx;
}

Ball.prototype.moveY = function() {
	var dy = this.ySpeed/REFRESH_RATE;
	var newy = this.yPos + dy;
	if (this.detectCollisions(this.xPos, newy)) {
		newy = this.yPos - dy;
		this.ySpeed = -this.ySpeed;
	}
	this.yPos = newy;
}

Ball.prototype.detectCollisions = function(x, y) {
	// collision with paddle
	if ((y > this.world.paddle.yPos && 
		y < this.world.paddle.yPos+this.world.paddle.paddleHeight) &&
		(x > this.world.paddle.xPos && 
		x < this.world.paddle.xPos+this.world.paddle.paddleWidth)) {
		return true;
	}
	// collision with bricks
	for (var r = 0; r < this.world.brickRows; r++) {
		for (var c = 0; c < this.world.brickCols; c++) {
			var currentBrick = this.world.brickField[r][c];
			// only collide with bricks that have not been hit
			if (currentBrick.beenHit == false) {
				if ((y > currentBrick.yPos && 
					y < currentBrick.yPos+this.world.brickHeight) &&
					(x > currentBrick.xPos && 
					x < currentBrick.xPos+this.world.brickWidth)) 
				{
					currentBrick.getHit();
					this.world.paddle.score++;
					return true;
				}
			}
		}
	}

	// collision with bottom
	if (y > this.world.worldHeight) {
		// we hit the bottom, deduct a life
		this.world.paddle.lives--;
		return true;
	}

	// edges of world 
	if (this.world.isOutOfBounds(x, y) == true) {
		return true;
	}
	// no collisions detected
	return false
}

Ball.prototype.render = function() {
	var ctx2d = this.world.ctx2d;
	ctx2d.beginPath();
	ctx2d.arc(this.xPos, this.yPos, this.radius, 0, Math.PI*2);
	ctx2d.fillStyle= "#0095DD";
	ctx2d.fill();
	ctx2d.closePath();
}

Ball.prototype.update = function() {
	this.move();
}