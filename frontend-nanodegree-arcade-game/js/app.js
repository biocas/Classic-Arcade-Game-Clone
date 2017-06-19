// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; 
    this.y = y; 
    this.width = 80; 
    this.height = 60;
    this.box = [this.x, this.y, this.width, this.height];
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
    if ( this.x < 450 ){  
      this.x += this.speed * dt;
    } else {
       this.x = 0;
    }   
    //this.x += this.speed * dt; 
    this.checkCollisions();
    
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
    this.width = 101; 
    this.height = 171;
    this.box = [this.x, this.y, this.width, this.height];
    this.score = 0;
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
    else if (this.y < -15) {
        this.x = 200; 
        this.y = 400; 
        }
    else if (this.y > 400) {
        this.x = 200; 
        this.y = 400; 
        }

    //scoreboard
    document.getElementById("score").innerHTML = this.score;
    
   if (this.y < 67) {
        this.reset();
        this.score += 1; 
        document.getElementById("score").innerHTML = player.score;
        alert("Way to go! Keep beating those bugs!! ");
    } 
    //this.win(); 
    //this.lose();
    
   /* if (this.lose) {
        this.score -= 1; 
        //$("#score").append(score);
        // alert("Auch!");
    } */
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
Enemy.prototype.checkCollisions = function() {

    var enemyBox = {
        x: this.x,
        y: this.y + 77,
        width: 70,
        height: 47
    };
    var playerBox = {
        x: player.x + 6,
        y: player.y + 63,
        width: 70,
        height: 75
    };
    
    if (enemyBox.x < playerBox.x + playerBox.width
        && enemyBox.x + enemyBox.width > playerBox.x
        && enemyBox.y < playerBox.y + playerBox.height
        && enemyBox.height + enemyBox.y > playerBox.y) {
        player.reset();
        console.log("collision checked!");
        return true;
    }
}; 

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.lose = function() {
   if (Enemy.checkCollisions === true) {
       return true; 
       console.log("lose");
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
