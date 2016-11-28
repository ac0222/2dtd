// Brick class

var Brick = function(world, xPos, yPos, brickWidth, brickHeight) {
	this.world = world;
	this.xPos = xPos;
	this.yPos = yPos;
	this.brickWidth = brickWidth;
	this.brickHeight = brickHeight;
	this.beenHit = false;
}

Brick.prototype.getHit = function() {
	this.beenHit = true;
}

Brick.prototype.render = function() {
	var ctx2d = this.world.ctx2d;
	ctx2d.beginPath();
	ctx2d.rect(this.xPos, this.yPos, this.brickWidth, this.brickHeight);
	ctx2d.fillStyle = "red";
	ctx2d.fill();
	ctx2d.closePath();
}