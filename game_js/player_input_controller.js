// class to keep track of player input

var PlayerInputController = function(document) {
	// action keys
	this.leftPressed = false;
	this.rightPressed = false;

	var currentScope = this;
	// listeners
	document.addEventListener("keydown", 
		function(e) {
			currentScope.keyDownHandler.call(currentScope, e);
		}, false);

	document.addEventListener("keyup", 
		function(e) {
			currentScope.keyUpHandler.call(currentScope, e);
		}, false);
}

PlayerInputController.prototype.keyDownHandler = function(e) {
	if (e.keyCode == 37) {
		this.leftPressed = true;
	} else if (e.keyCode == 39) {
		this.rightPressed = true;
	}
}

PlayerInputController.prototype.keyUpHandler = function(e) {
	if(e.keyCode == 37) {
		this.leftPressed = false;
	} else if (e.keyCode == 39) {
		this.rightPressed = false;
	}
}
