// UI class

var UserInterfacePanel = function(world, uiCanvas, uiWidth, uiHeight) {
	this.world = world;
	this.uiCanvas = uiCanvas;
	this.uiWidth = uiWidth;
	this.uiHeight = uiHeight;
	this.uictx = this.uiCanvas.getContext('2d');
	this.uiCanvas.setAttribute("width", uiWidth);
	this.uiCanvas.setAttribute("height", uiHeight);
}

UserInterfacePanel.prototype.render = function() {
	var scoreDisplayed = this.world.paddle.score;
	var livesDisplayed = this.world.paddle.lives;

	// clear the panel first
	this.uictx.clearRect(0, 0, this.uiWidth, this.uiHeight);
	
	this.uictx.font = "16px Arial";
	this.uictx.fillStyle = "#0095DD";
	this.uictx.fillText("Score: " + scoreDisplayed, 20, 50);
	this.uictx.fillText("Lives: " + livesDisplayed, 200, 50);
}