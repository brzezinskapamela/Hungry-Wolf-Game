//Wolf
function Wolf (x,y, direction) {
    this.x = 0;
    this.y = 0;
    this.direction = 'right';
};

//Meat
function Meat (x,y) {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
};

//Game
function Game () {
    var self = this;
    this.board =document.querySelectorAll('#board div');
    this.wolf=new Wolf();
    this.meat=new Meat();
    this.score = 0;
    var scoreValue = document.querySelector("#score strong");


    //starting game
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveWolf();
        }, 300);
    }

    //setting of position.
    this.position = function(x,y) {
        return x + (y * 10);
    };

    // rendering Wolf
    this.showWolf = function() {
        this.hideVisibleWolf();
        this.board[this.position(this.wolf.x, this.wolf.y)].classList.add('wolf');
    };

    // hiding last position Wolf
    this.hideVisibleWolf = function () {
        var visible = document.querySelector('.wolf');
        if (visible) {
            visible.classList.remove('wolf')}
    };

    // rendering meat
    this.showMeat = function () {
        this.board[this.position(this.meat.x, this.meat.y)].classList.add('meat');
    };


    //moving Wolf
    this.moveWolf = function () {
        if (self.wolf.direction === 'right') {
            self.wolf.x = self.wolf.x + 1;
        } else if (self.wolf.direction === 'left') {
            self.wolf.x = self.wolf.x - 1;
        }  else if (self.wolf.direction === 'up') {
            self.wolf.y = self.wolf.y - 1;
        } else if(self.wolf.direction === 'down') {
            self.wolf.y = self.wolf.y + 1;
        };
        self.gameOver ();
        self.showWolf();
        self.checkMeatCollision ();
    };

    // changing direction by pressing keyboard


    document.addEventListener('keydown', function(event) {
        self.turnWolf(event);
    });


    this.turnWolf= function(event) {
        switch (event.which) {
            case 37:
                self.wolf.direction = 'left';
                break;
            case 39:
                self.wolf.direction = 'right';
                break;
            case 38:
                self.wolf.direction = 'up';
                break;
            case 40:
                self.wolf.direction = 'down';
                break;
        };
    };



    //score
    this.checkMeatCollision = function() {
        if (this.meat.x === this.wolf.x && this.meat.y===this.wolf.y) {
            this.board[this.position(this.meat.x, this.meat.y)].classList.remove('meat');
            this.score +=1;
            scoreValue.innerText = this.score;
            this.meat=new Meat();
            this.showMeat();
        }
    }
    //game over
    this.gameOver = function () {
        if (this.wolf.x < 0 ||  this.wolf.x > 9 || this.wolf.y < 0 || this.wolf.y > 9) {
            clearInterval(this.idSetInterval)
            this.hideVisibleWolf ();
            alert('Game over! You scored ' + this.score + ' points.');
            console.log("GAME OVER!");

        }
    }
}

var game = new Game();
game.showMeat();
game.showWolf();
game.startGame();
document.addEventListener('keydown', game.turnWolf);
