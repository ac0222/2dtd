// Breakout game world

var World = function(width, height, brickRows, brickCols, 
	canvas, uiCanvas, pic) 
{
	// calculated constants
	this.worldWidth = width;
	this.worldHeight = height;
	this.brickRows = brickRows;
	this.brickCols = brickCols;
	this.brickWidth = 0.8*this.worldWidth/this.brickCols;
	this.brickHeight = 0.8*0.5*this.worldHeight/this.brickRows;

	// prepare game canvas for drawing
	this.canvas = canvas;
	this.canvas.setAttribute("width", this.worldWidth);
	this.canvas.setAttribute("height", this.worldHeight);	
	this.ctx2d = canvas.getContext('2d');

	// prepare ui panel
	this.uiPanel = new UserInterfacePanel(this, uiCanvas, 
		UI_PANEL_WIDTH, UI_PANEL_HEIGHT);

	// prepare player input controller
	this.pic = pic;

	// init game objects
	this.ball = null;
	this.paddle = null;
	this.brickField = null;
	this.initGameObjects();	
}

World.prototype.initGameObjects = function() {
	this.ball = new Ball(this, BALL_RADIUS, 			// radius
		this.worldWidth/2, this.worldHeight/2, 	// starting x and y pos
		BALL_X_SPEED, BALL_Y_SPEED);			// x and y speed
	
	this.paddle = new Paddle(this, PADDLE_WIDTH, PADDLE_HEIGHT, 		
												// width and height
		this.worldWidth/2, this.worldHeight-PADDLE_HEIGHT, 	
												// starting x and y pos
		PADDLE_X_SPEED, PADDLE_Y_SPEED);							
	this.brickField = this.initBrickField();
}

World.prototype.initBrickField = function() {
	var brickField = [];
	var xspacing = this.worldWidth/this.brickCols;
	var yspacing = this.worldHeight/(2*this.brickRows);
	for (var r = 0; r < this.brickRows; r++) {
		brickField[r] = [];
		for (var c = 0; c < this.brickCols; c++) {
			var xPos = xspacing*c + 0.1*xspacing;
			var yPos = yspacing*r + 0.1*yspacing;
			brickField[r][c] = new Brick(this, 
				xPos, yPos, 
				this.brickWidth, this.brickHeight);
		}
	}
	return brickField;
}

World.prototype.update = function() {
	// player always goes first, before anything else happens
	this.paddle.update();
	// next, move the ball
	this.ball.update();
	// did we win?
	if (this.checkWin() == true) {
		return WIN_FLAG;
	} 
	// did we lose?
	if (this.checkLoss() == true) {
		return LOSS_FLAG;
	}
	return GAME_UNFINISHED_FLAG;
}

World.prototype.render = function() {
	// clear canvas before each frame
	this.ctx2d.clearRect(0, 0, this.worldWidth, this.worldHeight);
	// draw the paddle
	this.paddle.render();
	// draw the ball
	this.ball.render();
	// draw the bricks
	for (var r = 0; r < this.brickRows; r++) {
		for (var c = 0; c < this.brickCols; c++) {
			var currentBrick = this.brickField[r][c];
			if (currentBrick.beenHit == false) {
				this.brickField[r][c].render();
			}
		}
	}
	// draw the ui panel
	this.uiPanel.render();
}

World.prototype.isOutOfBounds = function(x, y) {
	if (x > this.worldWidth || x < 0) {
		return true;
	}
	if (y > this.worldHeight || y < 0) {
		return true
	}
	return false;
}

World.prototype.checkWin = function() {
	if (this.paddle.score == this.brickRows*this.brickCols) {
		return true;
	}
}

World.prototype.checkLoss = function() {
	if (this.paddle.lives == 0) {
		return true;
	}
}

World.prototype.displayWinScreen = function() {
	this.ctx2d.clearRect(0, 0, this.worldWidth, this.worldHeight);
	this.ctx2d.font = "16px Arial";
	this.ctx2d.fillStyle = "#0095DD";
	this.ctx2d.fillText("YOU DEFEATED", this.worldWidth/2, this.worldHeight/2);
}

World.prototype.displayLossScreen = function() {
	this.ctx2d.clearRect(0, 0, this.worldWidth, this.worldHeight);
	this.ctx2d.font = "16px Arial";
	this.ctx2d.fillStyle = "#0095DD";
	this.ctx2d.fillText("YOU DIED", this.worldWidth/2, this.worldHeight/2);
}

