var game = document.getElementById('game')
var bird = document.getElementById('bird')
var dead = false
var jumping = true

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeWalls() {
  let wallsTop = document.getElementsByClassName('wall-top')
  let wallsBottom = document.getElementsByClassName('wall-bottom')

  Array.prototype.forEach.call(wallsTop, function(el) {
    if (parseInt(el.style.left) <= 20) {
      console.log("REMOVE ME")
      el.remove()
    }
  })
  Array.prototype.forEach.call(wallsBottom, function(el) {
    if (parseInt(el.style.left) <= 20) {
      console.log("REMOVE ME")
      el.remove()
    }
  })
}

async function overLap() {
  let wallsTop = document.getElementsByClassName('wall-top')
  let wallsBottom = document.getElementsByClassName('wall-bottom')

  Array.prototype.forEach.call(wallsTop, function(el) {
    let elBox = el.getBoundingClientRect()
    let birdBox = bird.getBoundingClientRect()
    let overlap = !(birdBox.right < elBox.left || birdBox.left > elBox.right || birdBox.bottom < elBox.top || birdBox.top > elBox.bottom)
    if (overlap) {
      dead = true
    }
  })
  Array.prototype.forEach.call(wallsBottom, function(el) {
    let elBox = el.getBoundingClientRect()
    let birdBox = bird.getBoundingClientRect()
    let overlap = !(birdBox.right < elBox.left || birdBox.left > elBox.right || birdBox.bottom < elBox.top || birdBox.top > elBox.bottom)
    if (overlap) {
      dead = true
    }
  })
}

async function moveWallLeft(wall) {
  for (var i=0;i<1;i += 2) {
    wall.style.left = parseInt(wall.style.left) - 2 + 'px'
    await sleep(1)
  }
}

async function setupTopWalls() {
  let walls = document.getElementsByClassName('wall-top')
  if (walls.length < 1) {
    let wall = document.createElement('div')
    wall.style.height = Math.floor((Math.random() * 150) + 100) + "px"
    wall.style.width = "25px"
    wall.style.backgroundColor = "#000"
    wall.style.left = "480px"
    wall.style.position = "absolute"
    wall.setAttribute("class", "wall-top")
    game.appendChild(wall)
    walls = document.getElementsByClassName('wall-top')
  }
}

async function setupBottomWalls() {
  let walls = document.getElementsByClassName('wall-bottom')
  if (walls.length < 1) {
    let wall = document.createElement('div')
    wall.style.height = Math.floor((Math.random() * 150) + 100) + "px"
    wall.style.width = "25px"
    wall.style.backgroundColor = "#000"
    wall.style.left = "480px"
    wall.style.top = 505 - parseInt(wall.style.height) + "px"
    wall.style.position = "absolute"
    wall.setAttribute("class", "wall-bottom")
    game.appendChild(wall)
    walls = document.getElementsByClassName('wall-bottom')
  }
}

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
      await sleep(1)
    }
  }
}

async function jump() {
  if (dead) { return false }
  for (var i=0;i<75;i += 2) {
    jumping = true
    bird.style.top = parseInt(bird.style.top) - 2 + 'px'
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
  let wallsTop = document.getElementsByClassName('wall-top')
  let wallsBottom = document.getElementsByClassName('wall-bottom')

  //Game bounding
  hitRoof()
  hitGround().then(x => {
    if (x) {
      dead = true
    }
  })

  //Walls
  setupTopWalls()
  setupBottomWalls()
  removeWalls()

  fall()

  overLap()

  Array.prototype.forEach.call(wallsTop, function(el) {
    moveWallLeft(el)
  })
  Array.prototype.forEach.call(wallsBottom, function(el) {
    moveWallLeft(el)
  })
}, 10);
