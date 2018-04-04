var game = document.getElementById('game')
var bird = document.getElementById('bird')
var dead = false
var jumping = true

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setupTopWalls() {
  var walls = document.getElementsByClassName('wall-top')
  if (walls.length < 1) {
    console.log(walls)
    var wall = document.createElement('div')
    wall.style.height = Math.floor((Math.random() * 150) + 100) + "px"
    wall.style.width = "25px"
    wall.style.backgroundColor = "#000"
    wall.style.left = "480px"
    wall.style.position = "absolute"
    wall.setAttribute("class", "wall-top")
    game.appendChild(wall)
    var walls = document.getElementsByClassName('wall-top')
    console.log(walls)
  }
}

async function setupBottomWalls() {
  var walls = document.getElementsByClassName('wall-bottom')
  if (walls.length < 1) {
    console.log(walls)
    var wall = document.createElement('div')
    wall.style.height = Math.floor((Math.random() * 150) + 100) + "px"
    wall.style.width = "25px"
    wall.style.backgroundColor = "#000"
    wall.style.left = "480px"
    wall.style.top = 505 - parseInt(wall.style.height) + "px"
    wall.style.position = "absolute"
    wall.setAttribute("class", "wall-bottom")
    game.appendChild(wall)
    var walls = document.getElementsByClassName('wall-bottom')
    console.log(walls)
  }
}

setupTopWalls()
setupBottomWalls()

async function hitGround() {
  if (parseInt(bird.style.top) >= 450) {
    bird.style.top = "450px"
    return true
  }
}

async function hitRoof() {
  if (parseInt(bird.style.top) <= 20) {
    bird.style.top = "20px"
    return true
  }
}

async function fall() {
  if (!jumping) {
    for (var i=0;i<1;i += 2) {
      bird.style.top = parseInt(bird.style.top) + 2 + 'px'
      console.log("New Top: " + bird.style.top)
      await sleep(1)
    }
  }
}

async function jump() {
  if (dead) { return false }
  for (var i=0;i<75;i += 2) {
    jumping = true
    bird.style.top = parseInt(bird.style.top) - 2 + 'px'
    console.log("New Top: " + bird.style.top)
    await sleep(2)
  }
  jumping = false
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        jump()
    }
}

setInterval(function () {
  if (dead) {
    return console.log("Game over")
  }

  hitGround().then(x => {
    if (x) {
      dead = true
    }
  })

  hitRoof()
  fall()

}, 10);
