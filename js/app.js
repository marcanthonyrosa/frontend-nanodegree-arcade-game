var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0 - (Math.floor(Math.random()*4) *65);
    this.y = 51 + (83 * Math.floor(Math.random()*3));
    this.speed = 40* (1 + Math.random()*5);

    // I added in logic to randomly position the enemy in new starting
    // positions across the x axis, across 1 of the three stone rows,
    // and with a randomly generated speed to make the gameplay dynamic
};

Enemy.prototype.update = function(dt) {
    if (this.x > 707) {
      this.x = -101;
    }
    // this above code resets the player's x coordinates once the enemy
    // falls off the edge of the canvas

    this.x = this.x + (this.speed* dt);

    // Below is the logic for identifying collisions
    // which looks to see if an enemy is within a certain
    // proximity to the player's x and y coordinates
    if (player.x <this.x+ 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        player.y + 65 > this.y) {
          player.collide();
        }
        // once a collision is detected, we run the player.collide
        // function which deducts points and lives
};
Enemy.prototype.collide = function () {
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 303;
  this.y = 386;
  this.score = 0;
  this.lives = 5;
};
// This Class sets the player's initial x and y axis, and also sets the
// starting game's score and lives count for each new game.

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
  if (this.y < 0) {
    this.playerScore();
    this.reset();
  }
  // This logic detects if the player has reached the water (y axis less than
  // 0). If so, we run the playerScore and reset methods
  // which add points to the player's game score and resets the position
};

Player.prototype.collide = function () {
  this.score = this.score - 5;
  this.lives = this.lives - 1;
  console.log("Oh snap! " + this.score);

  // The above logic deducts points and lives if a collision is detected

  if (this.lives ==0) {
    document.getElementById("game-over").innerHTML = " - GAME OVER!!!";
  }
  // this above if statement will update the HTML to read "GAME OVER" if
  // if the total lives = 0

  player.reset();

};
Player.prototype.playerScore = function() {
  this.score = this.score + 5;
  console.log(this.score);
};
// This method adds points to the board when the player reaches the water!

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

  // This feels like a very big set of if statements - I could have used
  // a different process, like switch
  // This set of if statements help move the player around based on
  // which keys were inputted.
  // This also includes logic that resets the player's x position if they
  // move too far left or right off the canvas
  // I originally had the success logic stored in the "right" if statement,
  // but moved it to the player's update method

};

Player.prototype.reset = function () {
  this.x = 303;
  this.y = 386;
  this.updateScore();
};
// A simple reset function to reorient the player any time a reset is needed

Player.prototype.updateScore = function () {
  document.getElementById("score").innerHTML = this.score;
  document.getElementById("lives").innerHTML = this.lives;
}
// This updateScore method helps push the latest score to the DOM :)

Player.prototype.resetGame = function () {
  this.score = 0;
  this.lives = 5;
  player.reset();
  document.getElementById("game-over").innerHTML = "";
  for (var i = 0; i< allHearts.length; i++) {
    allHearts[i].appear = true;
    allHearts[i].reset();
    noRepeatHearts();
  }
};
// I added in a Reset button to the top of the game - this button
// enables players to refresh their game to the default settings,
// with default score, lives count, and total hearts.
// The only thing this doesn't do is refresh the Enemy prototype position
// and speed, which would call for re-creating new enemy objects

Player.prototype.newLife = function () {
  this.lives = this.lives +1;
  console.log(this.lives);
};
// this method adds a new life if a collision is detected between the
// hearts and the player


// Creating hearts objects!

var Hearts = function () {
  this.sprite = 'images/Heart.png' ;
  this.x = 0 + (101 * Math.floor(Math.random()*7));
  this.y = 83 + (83 * Math.floor(Math.random()*3));
  this.xy = this.x +" "+this.y;
  this.appear = true;
};
// Woohoo! This was a lot of fun to build a brand new Class and set of
// objects to create hearts on the board :)
// This Class will randomly place static hearts across the stone path.
// I added in a propery .xy which is helpful when detecting duplicates
// of the randomly generated x and y axes (used in noRepeatHearts).
// I also added in a propery .appear with a boolean, which is helpful
// for determining if the heart should render after a collision.

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
      // I used the same collision detection logic from the Enemy prototype
      // a bit of this felt duplicated but I didn't know how to refer to
      // parts of the code while avoiding the follow-up functions also
      // included in Enemy.update
};
Hearts.prototype.collide = function () {
  while (this.appear === true) {
    player.newLife();
    this.appear = false;
  }

  // Once a collision is detected, the property .appear is updated to "false",
  // which is checked out in engine.js

};
Hearts.prototype.collision = function () {
};
// I didn't have any code to use for this, so I created a blank
// function instead of inheriting a non-blank collision from Enemy

Hearts.prototype.reset = function() {
  console.log("before: "+ this.xy);
  this.x = 0 + (101 * Math.floor(Math.random()*7));
  this.y = 83 + (83 * Math.floor(Math.random()*3));
  this.xy = this.x +" "+this.y;
  console.log("after: "+ this.xy);
};
// This is a method that runs later in the program as a way to reset
// x and y coordinates for a Heart.
// This method runs if the function noRepeatHearts detects that two heart
// objects share the same x and y values.


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

// I instantiate the player, enemies, and hearts!
// I also add multiple enemies and hearts into new arrays

var noRepeatHearts = function () {
  for (var i = 0; i< allHearts.length; i++) {
    for (var j = i+1; j < allHearts.length; j++) {
      if (allHearts[i].xy === allHearts[j].xy) {
        allHearts[j].reset();
        noRepeatHearts();
      }
    }
  }
};
noRepeatHearts();

// This was an interesting function to write. When each heart object
// is first instantiated, there's a possibility that the randomly generated
// x and y values might overlap with another heart object.
// The noRepeatHearts function runs two for loops to compare array items.
// If an overlap is detected, Hearts.reset method is called and
// noRepeatHearts is run through again.
// My sense is that calling the function within the function might
// be somewhat expensive, but the function needs to run only a handful
// of times at the maximum before all heart objects have unique x and y
// values.


document.getElementById("up").onclick = function () {
  player.handleInput('up');
}
document.getElementById("down").onclick = function () {
  player.handleInput('down');
}
document.getElementById("left").onclick = function () {
  player.handleInput('left');
}
document.getElementById("right").onclick = function () {
  player.handleInput('right');
}

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
