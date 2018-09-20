/*
 * Opens the instructions modal on page load. Modal itself uses only css3/html5
 */
window.onload = function() {
    window.location.href = "#openModal";
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // JH
    // enemy instance Variables
    // x = x coordinate
    // y = y coordinate
    // speed = speed of the enemy moving from left to right
    // these 3 variables need to also be added tot the function argument list
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // JH
    //let movement = this.speed * dt;
  //  this.x = this.x + movement;

  this.x += this.speed * dt;

    // JH
    // Reset enemy postion after enemy leaves screen on the right side
    if(this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
    }
    // JH
    // Check for collission between enemy and the Player
    if(player.x < this.x + 60 &&
       player.x + 37 > this.x &&
       player.y < this.y + 25 &&
       30 + player.y > this.y) {
         alert('Smash! Game Over');
         player.x = 200;
         player.y = 300;
       }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// JH
var Player = function(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
  if(this.y > 380){
    this.y = 380;
  }
  if(this.x > 400){
    this.x = 400;
  }
  if(this.x < 0){
    this.x = 0;
  }
  //player wins - reset to game start
  if(this.y < 0 ){
    window.location.href = "#closeModal";
    this.x = 200;
    this.y = 380;
  }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress){
  switch(keyPress) {
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
    case 'left':
      this.x -= this.speed + 50;
      break;
    case 'right':
      this.x += this.speed + 50;
      break;
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// JH
let allEnemies = [];
let player = new Player(200,380,50);
let enemyPosition = [60,140,220];

let enemy;
enemyPosition.forEach(function(yCoordinate) {
  enemy = new Enemy(0, yCoordinate, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
