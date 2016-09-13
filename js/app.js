// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0 - (Math.floor(Math.random()*4) *65);
    this.y = 51 + (83 * Math.floor(Math.random()*3));
    this.speed = 40* (1 + Math.random()*5);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 707) {
      this.x = -101;
    }
    this.x = this.x + (this.speed* dt);

    // Below is the logic for identifying collisions
    if (player.x <this.x+ 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        player.y + 65 > this.y) {
          this.collide();
          player.reset();

        }

};
Enemy.prototype.collide = function () {
  player.collide();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 303;
  this.y = 386;
  this.score = 0;
  this.lives = 5;
};
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
  if (this.y < 0) {
    this.playerScore();
    this.reset();
  }
};

Player.prototype.collide = function () {
  this.score = this.score - 5;
  this.lives = this.lives - 1;
  console.log("Oh snap! " + this.score);

  if (this.lives ==0) {
    // document.getElementById("replace-h3").innerHTML = " ";
    document.getElementById("game-over").innerHTML = " - GAME OVER!!!";
  }

};
Player.prototype.playerScore = function() {
  this.score = this.score + 5;
  console.log(this.score);
}

Player.prototype.handleInput = function(allowedKeys) {
  if (allowedKeys === "left") {
    if (this.x < 101) {
      this.x = 606;
    } else {
      this.x = this.x - 101;
    }
  }

  if (allowedKeys === "right") {
    if (this.x > 505) {
      this.x = 0;
    } else {
      this.x = this.x + 101;
    }
  }

  if (allowedKeys === "up") {
      this.y = this.y - 83;
  }

  if (allowedKeys === "down") {
    if (this.y > 385) {
    // nothing!
    } else {
      this.y = this.y + 83;
    }
  }

  console.log(this.x, this.y);


};

Player.prototype.reset = function () {
  this.x = 303;
  this.y = 386;
  this.updateScore();
};

Player.prototype.updateScore = function () {
  document.getElementById("score").innerHTML = this.score;
  document.getElementById("lives").innerHTML = this.lives;

}

Player.prototype.resetGame = function () {
  this.score = 0;
  this.lives = 5;
  player.reset();
  document.getElementById("game-over").innerHTML = "";
  for (var i = 0; i< allHearts.length; i++) {
    allHearts[i].appear = true;
    allHearts[i].reset();
  }
};

Player.prototype.newLife = function () {
  this.lives = this.lives +1;
  console.log(this.lives);
}


// Creating hearts objects!

var Hearts = function () {
  this.sprite = 'images/Heart.png' ;
  this.x = 0 + (101 * Math.floor(Math.random()*7));
  this.y = 83 + (83 * Math.floor(Math.random()*3));
  this.xy = this.x +" "+this.y;
  this.appear = true;
};
Hearts.prototype = Object.create(Enemy.prototype);
Hearts.prototype.constructor = Hearts;
Hearts.prototype.update = function () {

  if (player.x <this.x+ 75 &&
      player.x + 65 > this.x &&
      player.y < this.y + 50 &&
      player.y + 65 > this.y) {
        this.collide();
        player.updateScore();
      }
};
Hearts.prototype.collide = function () {
  while (this.appear === true) {
    player.newLife();
    this.appear = false;
  }

};
Hearts.prototype.collision = function () {
};

Hearts.prototype.reset = function() {
  this.x = 0 + (101 * Math.floor(Math.random()*7));
  this.y = 83 + (83 * Math.floor(Math.random()*3));
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var heart1 = new Hearts();
var heart2 = new Hearts();
var heart3 = new Hearts();
var heart4 = new Hearts();

var allHearts = [heart1, heart2, heart3, heart4];

var noRepeatHearts = function () {
  for (var i = 0; i< allHearts.length; i++) {
    for (var j = i+1; j < allHearts.length; j++) {
      if (allHearts[i].xy === allHearts[j].xy) {
        allHearts[j].reset();
        console.log("reset it!");
      }
    }
  }
};

noRepeatHearts();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);});


    document.getElementById("button").onclick  = function() {
      player.resetGame();
    };
