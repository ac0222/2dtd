// Breakout game main container

var BreakoutGame = function(world) {
	this.intervalID = null;
	this.world = world;
}

BreakoutGame.prototype.runGame = function() {
	// keep hold of current scope
	var currentScope = this;

	this.intervalID = setInterval(
		function() {
			var retval = currentScope.processFrame.call(currentScope); 
			if (retval == WIN_FLAG) {
				clearInterval(currentScope.intervalID);
				currentScope.world.displayWinScreen();
			}
			if (retval == LOSS_FLAG) {
				clearInterval(currentScope.intervalID);
				currentScope.world.displayLossScreen();
			}
		}
		, (1/REFRESH_RATE)*1000
	);
}

BreakoutGame.prototype.processFrame = function() {
	var retval = this.world.update();
	this.world.render();
	return retval;
}

BreakoutGame.prototype.stopGame = function() {
	clearInterval(this.intervalID);
}

BreakoutGame.prototype.resetGame = function() {
	clearInterval(this.intervalID);
	this.world.initGameObjects();
	this.world.render();
}

