//Async function to sleep for x ms
function sleep(ms) {
  //Return a timeout function for x ms
  return new Promise(resolve => setTimeout(resolve, ms))
}

//https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code/21743156?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
//Simple copy pasta to get width on all devices
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
}

//https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code/21743156?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
//Simple copy pasta to get height on all devices
function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  )
}

//Create our game area object
var gameArea = {
  //Create the canvas for the game
  canvas: document.createElement("canvas"),
  //Current game state
  over: false,
  started: false,
  fps: 0,
  lastCall: 0,
  //Function to start the game
  start: function() {
    //The canvas width
    this.canvas.width = getWidth()
    //The canvas height
    this.canvas.height = getHeight()
    //Make the background grey
    this.canvas.style.background = "#333"
    //Get the canvas context (data)
    this.context = this.canvas.getContext("2d")
    //Add this canvas to the HTML Dom
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    //Our game update rate
    this.interval = setInterval(updateGame, 10)
  },
  //Clear the canvas
  clear: function() {
    //Set the context to nothing
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  //Calculate our game framerate
  getFramerate: function() {
    //Get a last call time of the function
    if (!this.lastCall) {
      //Get the last call time
      this.lastCall = performance.now()
      //Set the fps to 0, fallback if it failed to be set as an int
      this.fps = 0
      //We are done for now
      return
    }
    //Delta is the difference of the last call and our current call times divided by 1000 (1 second in ms)
    let delta = (performance.now() - this.lastCall) / 1000
    //Update our last call
    this.lastCall = performance.now()
    //Calculate the FPS
    this.fps = 1 / delta
    //Return the FPS as a floor value to give most accurate int value of fps
    return Math.floor(this.fps)
  }
}

//Create a text element in our game
function textElement(content, x, y, size, color) {
  //Get our game area context
  ctx = gameArea.context
  //Set the font style
  ctx.font = size + "px Arial";
  //Set the font color
  ctx.fillStyle = color;
  //Set the font alignment
  ctx.textAlign = "center";
  //Place the text
  ctx.fillText(content, x, y);
  //Text update function
  this.update = function(content) {
    //Get our game area context
    ctx = gameArea.context
    //Set the font style
    ctx.font = size + "px Arial";
    //Set the font color
    ctx.fillStyle = color;
    //Set the font alignment
    ctx.textAlign = "center";
    //Place the text
    ctx.fillText(content, x, y);
  }
}

//Function to create a game element
function component(name, width, height, color, x, y, borderRadius) {
  //Is our player alive?
  //This does not really need to be here because it's not multiplayer, but adds
  //Capability for more than 1 'bird'
  this.alive = true
  //Should our player be allowed to score?
  this.shouldScore = true
  //Our current score, I should make a player object so walls don't have score but
  //There is no negative to this, in this context
  this.score = 0
  //Set component name
  this.name = name
  //Set component width
  this.width = width
  //Set component height
  this.height = height
  //Set component x coord
  this.x = x
  //Set component y coord
  this.y = y
  //Our game area context
  ctx = gameArea.context
  //Fill the context with color
  ctx.fillStyle = color
  //Do the filling at X,Y of XWidth of XHeight
  ctx.fillRect(this.x, this.y, this.width, this.height)
  //Set jumping state to false
  this.jumping = false
  //component update function
  this.update = function() {
    //Get our context
    ctx = gameArea.context
    //Set fill style to color
    ctx.fillStyle = color
    //Do the filling at X,Y of XWidth of XHeight
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  //Function to move the component by X and Y
  this.move = function(x, y) {
    //Set the X coordinate to move x distance
    this.x += x
    //Set the Y coordinate to move y distance
    this.y += y
  }
  //Function to make component jump
  this.jump = async function() {
    //If the entity is not alive, don't move
    if (!this.alive) {
      //Quick escape, don't need to stay in the function longer
      return false
    }
    //Set jumping state to true
    this.jumping = true
    //We want to move 30 * 2 spaces up
    for (var i = 0; i < 30; i++) {
      //Sleep to make it smoother
      await sleep(1)
      //Move it up 2 at a time
      this.y -= 3
    }
    //Set jumping state to false after our jump
    this.jumping = false
  }
  //Falling state of the component
  this.fall = async function() {
    //If the entity is not alive, don't move
    if (!this.alive) {
      //Quick escape, don't need to stay in the function longer
      return false
    }
    if (this.y >= gameArea.canvas.height - this.height) {
      //We are at the bottom
      this.y = gameArea.canvas.height - this.height
      //Quick escape to avoid falling and 'glitching' of the bird
      return
    }
    //Check if jumping, if not continue
    if (!this.jumping) {
      //We want to fall 5 spaces, because its always falling unless its jumping smaller is smoother
      for (var i = 0; i < 5; i++) {
        //Sleep for 1ms
        await sleep(1)
        //Move Y by 1 space
        this.y += 1
      }
    }
  }
  //Function to set setDimensions of the component
  this.setDimensions = function(w, h) {
    //Set the width to W
    this.width = w
    //Set the height to H
    this.height = h
  }
  //Function to check if component is overlapping another component
  this.overLap = function(other) {
    return !(other.x > (this.x + this.width) ||
      (other.x + other.width) < this.x ||
      other.y > (this.y + this.height) ||
      (other.y + other.height) < this.y)
  }
}

//Update our game area
function updateGame() {
  if (!gameArea.started) {
    gameStart = new textElement("Click to start", gameArea.canvas.width / 2, gameArea.canvas.height / 2 - 50, 40, "white")
    return
  }
  //Check if game over, early exit
  if (!playerOne.alive) {
    gameArea.over = true
    //Game over text
    gameOver = new textElement("GAMEOVER (Click to restart)", gameArea.canvas.width / 2, gameArea.canvas.height / 2 - 50, 30, "white")
    return
  }
  //Perform overlap check, early exit
  if (playerOne.alive && (playerOne.overLap(wallA) || playerOne.overLap(wallB))) {
    playerOne.alive = false
    return
  }
  //Is our player passed the walls and have we scored this round yet?
  if (playerOne.x >= wallA.x && playerOne.shouldScore) {
    //We are scoring, so you don't need anymore points this level
    playerOne.shouldScore = false
    //Add score
    playerOne.score++
  }
  //Clear game area on frame update
  //Turn this off to play hard mode :P
  gameArea.clear()
  //Let player one fall
  playerOne.fall()
  //Check if the walls are
  if (wallA.x <= 0 && wallB.x <= 0) {
    //Ok, next level you can have scores
    playerOne.shouldScore = true
    //Random height for wall a
    let heightA = Math.floor(Math.random() * (gameArea.canvas.height / 2 - 80)) + 80
    //Random height for wall b
    let heightB = Math.floor(Math.random() * (gameArea.canvas.height / 2 - 80)) + 80
    //Change setDimensions with random height
    wallA.setDimensions(20, heightA)
    //Reset position to right
    wallA.x = gameArea.canvas.width
    //Change setDimensions with random height
    wallB.setDimensions(20, heightB)
    //Reset position to right
    wallB.x = gameArea.canvas.width
  }
  //Move left every frame
  wallA.move(-5 - playerOne.score / 2, 0)
  //Move left every frame
  wallB.move(-5 - playerOne.score / 2, 0)
  //Update component position
  wallA.update()
  //Update component position
  wallB.update()
  //Update score text
  playerScore.update("Score: " + playerOne.score)
  //Update our game framerate variable
  gameFPS.update("FPS: " + gameArea.getFramerate())
  //Update component position
  playerOne.update()
}

//Start the game function
function startGame() {
  //Setup the game canvas
  gameArea.start()
  //Setup player 1
  console.log(gameArea.canvas.height / 2, gameArea.canvas.width / 2)
  playerOne = new component("player-one", 50, 50, "white", gameArea.canvas.width / 2 - 25, gameArea.canvas.height / 2 - 25)
  //Setup wall a
  wallA = new component("wallA", 20, 100, "red", gameArea.canvas.width, 0)
  //Setup wall b
  wallB = new component("wallB", 20, 100, "red", gameArea.canvas.width, gameArea.canvas.height - 100)
  //Setup score text
  playerScore = new textElement('Score: ' + playerOne.score, gameArea.canvas.width - 100, 20, 20, "red")
  gameFPS = new textElement('FPS: ' + gameArea.getFramerate(), gameArea.canvas.width - 200, 20, 20, "red")
}

//Register player 1 and player 2 jumpings
document.addEventListener('click', function() {
  //If the game is not started, we can start it now
  if (!gameArea.started) {
    //Start the game
    gameArea.started = true
  }
  if (gameArea.over) {
    //NEED TO RECREATE ELEMENTS TO RESTART THE GAME AND CLEAR THEIR STATES
    //Set game over false
    gameArea.over = false
    //Setup player 1
    playerOne = new component("player-one", 50, 50, "white", gameArea.canvas.height / 2, gameArea.canvas.width / 2)
    //Setup wall a
    wallA = new component("wallA", 20, 100, "red", gameArea.canvas.width, 0)
    //Setup wall b
    wallB = new component("wallB", 20, 100, "red", gameArea.canvas.width, gameArea.canvas.height - 100)
    //Setup score text
    playerScore = new textElement('Score: ' + playerOne.score, gameArea.canvas.width - 100, 20, 20, "red")
  }
  //Jump :D
  playerOne.jump()
})

startGame()
