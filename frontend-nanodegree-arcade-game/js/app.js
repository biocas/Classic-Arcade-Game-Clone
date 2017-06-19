// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; 
    this.y = y; 
    this.w = 80; 
    this.h = 60;
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
    this.x += this.speed * dt; 
    
     if(this.x > 505) {
            this.x = 0;
        }
   if (this.checkCollisions()) {
       console.log("collision checked");
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
    //Enemy.call(this); 
    this.x = x; 
    this.y = y; 
    this.sprite = 'images/char-boy.png';
    this.w = 101; 
    this.h = 171;
    
    this.box = [this.x, this.y, this.w, this.h];
};


/* Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player; */
Player.prototype.update = function(dt) {
    // makes sure player moves equally across browsers
    this.x * (dt); 
    this.y * (dt);
    
    // assures player is confined to canvas
    if (this.x < -10) {
        this.x = 200;
        this.y = 400;
        }
    else if (this.x > 450) {
        this.x = 200; 
        this.y = 400;
        }
    else if (this.y < 40) {
        this.x = 200; 
        this.y = 400; 
        }
    else if (this.y > 400) {
        this.x = 200; 
        this.y = 400; 
        }

}; 

Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
}; 

Player.prototype.handleInput = function(keys) {
    switch(keys) {
        case 'left':
            this.x = this.x - 103; 
            break; 
        case 'up':
            this.y = this.y - 83; 
            break; 
        case 'right':
            this.x = this.x + 103;
            break; 
        case 'down':
            this.y = this.y + 83;
            break; 
    }; 
    
}; 

// Now instantiate your objects.
var enemy1 = new Enemy(-50, 200, 300);
var enemy2 = new Enemy(-300, 100, 100);
var enemy3 = new Enemy(-200, 200, 50);
var enemy4 = new Enemy(-150, 150, 200);
var enemy5 = new Enemy(-50, 70, 270);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
    allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// Place the player object in a variable called player
var player = new Player(200, 400); 

//Check collision between player and enemies
Enemy.prototype.checkCollisions = function(player) {
    var playerHit = {
        x: Player.x,
        y: Player.y,
        width: Player.w,
        height: Player.h 
    }
 
    var enemyHit = {
        x: this.x,
        y: this.y,
        width: this.w,
        height: this.h
    }
 
    for (var i = 0; i < allEnemies.length; i++) {
         if (enemyHit.x < playerHit.x + playerHit.width &&
               enemyHit.x + enemyHit.width > playerHit.x &&
               enemyHit.y < playerHit.y + playerHit.height &&
               enemyHit.height + enemyHit.y > playerHit.y) {
                    this.reset()// collision detected!
            }
        }
    
}; 


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
