// Enemies our player must avoid
// This function is a class object, it initiates the Enemy
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

Enemy.prototype.speed = function (min, max) {
    this.min = Math.ceil(min);
    this.max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// TODO: Handle collisions with Player here
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed(75, 300) * dt;
    if (this.x > 505) {
        this.x = -1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    Enemy.call(this, x, y);
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Create Player.prototype object to inherit render method from
// Enemy.prototype.
Player.prototype = Object.create(Enemy.prototype);

// Set constructor property to refer to Player.
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    if (key === 'left') {this.x -= 101};
    if (key === 'right') {this.x += 101};
    if (key === 'up') {this.y -= 85};
    if (key === 'down') {this.y += 85};
};

Player.prototype.update = function() {
    // Prevent player from going off game board.
    if (this.x > 404) {this.x = 404};
    if (this.x < 0) {this.x = 0};
    if (this.y > 410) {this.y = 410};
    // Reset player to start position if player reaches water.
    if (this.y < 0) {this.x = 202; this.y = 410};
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(404, 60), new Enemy(0, 145), new Enemy(202, 230)];

var player = new Player(202, 400);

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




