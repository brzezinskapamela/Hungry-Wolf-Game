document.addEventListener("DOMContentLoaded", function () {

    const startingWindow = document.querySelector(".start");
    const main = document.querySelector(".main");
    const start = document.querySelector("#ready");
    const playAgain = document.querySelector("#again");


    const runGame =  function () {

        if (document.querySelector(".meat") !== null){
            document.querySelector(".meat").classList.remove("meat");
        }
        startingWindow.classList.add("invisible");
        main.classList.remove("invisible");


        function Wolf (x,y, direction) {
            this.x = 0;
            this.y = 0;
            this.direction = 'right';
        };

        function Meat (x,y) {
            this.x = Math.floor(Math.random() * 10);
            this.y = Math.floor(Math.random() * 10);
        };

        const Game = function () {
            const self = this;
            this.board =document.querySelectorAll('#board div');
            this.wolf=new Wolf();
            this.meat=new Meat();
            this.score = 0;
            const scoreValue = document.querySelector("#score strong");


            this.index = function (x, y) {
                return x + (y * 10);
            };

            this.showWolf = function () {

                if (document.querySelector(".wolf") != null) {
                    this.hideVisibleWolf();
                }

                const showWolfOnBoard = this.board[this.index(this.wolf.x, this.wolf.y)];

                if (showWolfOnBoard !== undefined) {
                    showWolfOnBoard.classList.add('wolf');
                }
            };

            this.showMeat = function () {
                this.board[this.index(this.meat.x, this.meat.y)].classList.add("meat");
            };


            this.startGame = function () {
                this.idSetInterval = setInterval(function () {
                    self.moveWolf();
                }, 300);
            };

            this.moveWolf = function () {
                if (this.wolf.direction === "right") {
                    this.wolf.x = this.wolf.x + 1;
                } else if (this.wolf.direction === "left") {
                    this.wolf.x = this.wolf.x - 1;
                } else if (this.wolf.direction === "top") {
                    this.wolf.y = this.wolf.y - 1;
                } else if (this.wolf.direction === "bottom") {
                    this.wolf.y = this.wolf.y + 1;
                }
                this.showWolf();
                this.checkMeatCollision();
                this.gameOver();
            };

            this.hideVisibleWolf = function () {
                const visible = document.querySelector('.wolf');
                if (visible) {
                    visible.classList.remove('wolf')}
            };

            this.turnWolf = function (event) {

                switch (event.which) {
                    case 37:
                        this.wolf.direction = "left";
                        break;
                    case 38:
                        this.wolf.direction = "top";
                        break;
                    case 39:
                        this.wolf.direction = "right";
                        break;
                    case 40:
                        this.wolf.direction = "bottom";
                        break;
                }

            };

            document.addEventListener("keydown", function (event) {
                self.turnWolf(event);
            });

            this.checkMeatCollision = function() {
                if (this.meat.x === this.wolf.x && this.meat.y===this.wolf.y) {
                    document.querySelector(".meat").classList.remove("meat");
                    this.score ++;
                    scoreValue.innerText = this.score;
                    this.meat=new Meat();
                    this.showMeat();
                }
            };

            this.gameOver = function () {
                if (this.wolf.x < 0 || this.wolf.x > 9 || this.wolf.y < 0 || this.wolf.y > 9) {
                    document.getElementById("over").classList.remove("invisible");
                    if (document.querySelector(".wolf") !== null) {
                        document.querySelector(".wolf").classList.remove("wolf");
                    }
                    document.getElementById("finalScore").innerHTML = document.querySelector("strong").innerHTML;
                    return clearInterval(this.idSetInterval);
                }
            }
        };

        const game = new Game();
        game.showWolf();
        game.showMeat();
        game.startGame();

    };

    start.addEventListener("click", runGame);
    playAgain.addEventListener("click", runGame);
    playAgain.addEventListener("click", function (){
        document.getElementById("over").classList.add("invisible");
    });


});