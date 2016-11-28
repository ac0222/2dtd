// paddle class. The paddle is controlled by the player

var Paddle = function(world, width, height, xPos, yPos, xSpeed, ySpeed) {
	this.world = world;
	this.paddleWidth = width;
	this.paddleHeight = height;
	this.xPos = xPos;
	this.yPos = yPos;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.score = 0;
	this.lives = STARTING_LIVES;
}

Paddle.prototype.move = function() {
	var dx = this.xSpeed/REFRESH_RATE;
	var newx = this.xPos + dx;
	if (this.detectCollisions(newx, this.yPos) == false) {
		this.xPos = newx;
	}
}

Paddle.prototype.detectCollisions = function(x, y) {
	// check 2 horizontal edges only 
	if (this.world.isOutOfBounds(x, y) || 
		this.world.isOutOfBounds(x+this.paddleWidth, y)) {
		return true;
	} else {
		return false;
	}
}

Paddle.prototype.render = function() {
	var ctx2d = this.world.ctx2d;
	ctx2d.beginPath();
	ctx2d.rect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);
	ctx2d.fillStyle = "green";
	ctx2d.fill();
	ctx2d.closePath();
}

Paddle.prototype.update = function() {
	if (this.world.pic.leftPressed == true) {
		this.xSpeed = -Math.abs(this.xSpeed);
		this.move()
	} else if (this.world.pic.rightPressed == true) {
		this.xSpeed = Math.abs(this.xSpeed);
		this.move();
	}
}

