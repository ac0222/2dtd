// main app for breakout game

window.onload = function() {
	// grab the necessary elements used to display the game, i.e.
	// the game canvas and the ui canvas
	var worldCanvas = document.getElementById('breakout_canvas');
	var uiCanvas = document.getElementById('ui_canvas');
	// prepare the listeners for user input
	var pic = new PlayerInputController(document);
	// create the world
	var breakoutWorld = new World(WORLD_WIDTH, WORLD_HEIGHT, 
		BRICK_ROWS, BRICK_COLS,
		worldCanvas, uiCanvas, pic);
	// put it inside the game container
	var breakoutNG = new BreakoutGame(breakoutWorld);
	
	// some ui buttons 
	var startButton = document.getElementById('start_game_btn');
	var stopButton = document.getElementById('stop_game_btn');
	var resetButton = document.getElementById('reset_game_btn');

	startButton.addEventListener("click", function() {
		breakoutNG.runGame();
	})

	stopButton.addEventListener("click", function() {
		breakoutNG.stopGame();
	})

	resetButton.addEventListener("click", function() {
		breakoutNG.resetGame();
	})
		
}