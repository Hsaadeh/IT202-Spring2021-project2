// Javascript file for Project 2


// global variables
let menu = document.querySelector("#menu");
let gameCanvas = document.querySelector("#gameCanvas");
let context = gameCanvas.getContext('2d');

// start button
startButton = document.querySelector("#startGame");
startButton.addEventListener("click", (event) => {
    // dont display the menu
    menu.style.display = "none";
    // display the game screen
    gameCanvas.style.display = "block";
    console.log("game screen loaded");
    runGame();
})

// Animation class
class Animation {
    constructor(spriteSheet, context, spriteWidth, spriteHeight, xStartIndex, xEndIndex, yIndexOffset, animationSpeed, scale = 1) {
        this.xPostion = 0;
        this.yPosition = 0;
        this.spriteSheet = spriteSheet;
        this.context = context;
        this.width = spriteWidth;
        this.height = spriteHeight;
        this.xStartIndex = xStartIndex;
        this.xEndIndex = xEndIndex;
        this.yIndexOffset = yIndexOffset;
        this.animationSpeed = animationSpeed;
        this.count = 0;
        this.xframeIndex = xStartIndex;
        this.scale = scale;
    }
    play() {
        this.context.drawImage(this.spriteSheet,
            this.xframeIndex * this.width,
            this.yIndexOffset * this.height,
            this.width,
            this.height,
            this.xPostion,
            this.yPosition,
            this.width * this.scale,
            this.height * this.scale);
    }
    update() {
        this.count++;
        if (this.count > this.animationSpeed) {
            this.xframeIndex++;
            this.count = 0;
        }
        if (this.xframeIndex > this.xEndIndex) {
            this.xframeIndex = this.xStartIndex;
        }
    }

}

class Entity {
    constructor() {
        this.context;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speed = 1;
        this.velocity = [0, 0];
        this.image = null;
        this.currentAnimation = null;
    }

    update() {
        this.x += this.velocity[0];
        this.y += this.velocity[1];

        if (this.image == null) {
            this.currentAnimation.xPostion = this.x;
            this.currentAnimation.yPosition = this.y;
            this.currentAnimation.update();
        }
    }

    draw() {
        // draw image
        if (this.image != null) {

            this.context.drawImage(this.image,
                0,
                0,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width * this.scale,
                this.height * this.scale);
        }
        else {
            this.currentAnimation.play();
        }
    }
}

let areColliding = (entityA, entityB) => {
    let delta_x = entityB.x - entityA.x;
    let delta_y = entityB.y - entityA.y;

    let distance = Math.sqrt((delta_x * delta_x) + (delta_y * delta_y));

    if (distance < (entityA.width/2 + entityB.width/2)) {
        return true;
    }
    return false;
}

// Player Class
class Player extends Entity{
    constructor() {
        super();

        //starting position
        this.lives = 3;
        this.dead = false;
        this.x = 0; // player's x coordinate position
        this.y = 80; // player's y coordinate position
        this.width = 64;
        this.height = 64;
        // this.facingRight = true;
        // this.facingLeft = false;

        // movement
        this.movingLeft = false;
        this.movingRight = false;
        this.attacking = false;
        this.jumping = false;
        // this.speed = 1;
        // this.velocity = [0, 0];

        // // for the spritesheet position
        // this.xFrame = 0;
        // this.yFrame = 0;
        // this.frame = 0;

        // sprite dimensions
        // this.spriteWidth = 64;
        // this.spriteHeight = 64;

        // keeps track of player state
        // this.state = this.states['idle'];

        // add 3 animation objects from animation class

        // idle
        let idleRunSpriteSheet = new Image();
        idleRunSpriteSheet.src = "SpriteSheets/Idle_and_running.png";
        this.idleAnimation = new Animation(idleRunSpriteSheet, context, 64, 64, 0, 1, 0, 50);
        // run
        let runningLeftSpriteSheet = new Image();
        runningLeftSpriteSheet.src = "SpriteSheets/runningLeft.png"
        this.runRightAnimation = new Animation(idleRunSpriteSheet, context, 64, 64, 0, 7, 1, 20);
        this.runLeftAnimation = new Animation(runningLeftSpriteSheet, context, 64, 64, 0, 7, 1, 20);

        // jump
        let jumpSpriteSheet = new Image();
        jumpSpriteSheet.src = "SpriteSheets/Jumping.png";
        this.jumpAnimation = new Animation(jumpSpriteSheet, context, 64, 64, 0, 7, 0, 20);

        // attack animations
        // right attack
        let attackRightSpriteSheet = new Image();
        attackRightSpriteSheet.src = "SpriteSheets/Normal Attack.png";
        this.attackRightAnimation = new Animation(attackRightSpriteSheet, context, 64, 64, 0, 5, 3, 20);
        // left attack
        // let LeftAttackSpriteSheet = new Image();
        // LeftAttackSpriteSheet.src = "SpriteSheets/LeftAttack.png";
        // this.attackLeftAnimation = new Animation(LeftAttackSpriteSheet, context, 64, 64, 0, 5, 3, 20);

        // current Animation
        this.currentAnimation = this.idleAnimation;

    }
    update() {
        if (this.movingLeft) {
            this.velocity[0] = -this.speed;
        }
        if (this.movingRight) {
            this.velocity[0] = this.speed;
        }
        if (this.jumping) {
            this.velocity[1] = this.speed;
        }

        // this.x += this.velocity[0];
        // this.y += this.velocity[1];

        // running to the right
        if (this.velocity[0] > 0) {
            this.currentAnimation = this.runRightAnimation;
            // this.facingRight = true;
        }
        // running left
        else if (this.velocity[0] < 0) {
            this.currentAnimation = this.runLeftAnimation;
            // this.facingRight = false;
        }
        // attacking right
        else if (this.attacking) {
            this.currentAnimation = this.attackRightAnimation;
            // this.facingRight = true;
        }
        //attacking left
        // else if (this.facingLeft&&this.attacking) {
        //     this.currentAnimation = this.runLeftAnimation;
        //     // this.facingLeft = true;
        // }
        // resets back to idle animation if there are no other movement inputs
        else {
            this.currentAnimation = this.idleAnimation;
        }

        // this.runAnimation.isFlipped = false;
        
        // this.currentAnimation.xPostion = this.x;
        // this.currentAnimation.yPosition = this.y;
        // this.currentAnimation.update();
        super.update();
        this.velocity = [0, 0];
    }
    draw() {
        //
        //this.currentAnimation.play();
        super.draw();
    }
    idle() {
        //
    }
    run() {
        //
    }
    jump() {
        //
    }
    attack() {
        //
    }
}


class Bat extends Entity {
    constructor() {
        super();
        this.x = gameCanvas.width;
        this.y = 97;
        this.width = 16;
        this.height = 24;
        this.velocity = [-this.speed, 0];

        let batSpriteSheet = new Image();
        batSpriteSheet.src = "SpriteSheets/Bat_Sprite_Sheet.png";
        this.currentAnimation = new Animation(batSpriteSheet, context, this.width, this.height, 0, 4, 0, 30);
    }
    update() {
        super.update();
        if (this.x < 0) {
            this.x = gameCanvas.width;
        }
    }
    draw() {
        super.draw();
    }
}


class Coin extends Entity {
    constructor() {
        super();
        this.x = gameCanvas.width + 150;
        this.y = 110;
        this.width = 24;
        this.height = 24;
        this.velocity = [-this.speed, 0];

        let coinSpriteSheet = new Image();
        coinSpriteSheet.src = "SpriteSheets/coin.png";
        this.currentAnimation = new Animation(coinSpriteSheet, context, this.width, this.height, 0, 0, 0, 300, 0.5);
    }
    update() {
        super.update();
        if (this.x < 0) {
            this.x = gameCanvas.width;
        }
    }
    draw() {
        super.draw();
    }
}

let player = new Player();

/**********
 * Events
 **********/
window.addEventListener("keydown", (keypressed) => {
    let leftKey = "ArrowLeft";
    let rightKey = "ArrowRight";
    let upKey = "ArrowUp";
    let attackKey = "f";

    // switch statement that sets a specific state false
    switch (keypressed.key) {
        case leftKey:
            player.movingLeft = true; // to change the x position by 5 pixels left
            // player.facingRight = false;
            // player.facingLeft = true;
            break;
        case rightKey:
            player.movingRight = true; // to change the x position by 5 pixels right
            // player.facingRight = true;
            break;
        // case upKey:
        //     player.jumping = true; // to change the y position by 5 pixels upwards
        //     break;
        case attackKey:
            player.attacking = true; // to tigger the attack animation and make the player fire a projectile
            break;
    }
});

window.addEventListener("keyup", (keyreleased) => {
    let leftKey = "ArrowLeft";
    let rightKey = "ArrowRight";
    let attackKey = "f";

    // switch statement that sets a specific state false
    switch (keyreleased.key) {
        case leftKey:
            player.movingLeft = false;
            // player.facingRight = false;
            // player.facingLeft = true;
            break;
        case rightKey:
            player.movingRight = false;
            // player.facingRight = true;
            break;
        case attackKey:
            player.attacking = false;
    }
});

let bat1 = new Bat();
let bats = [bat1];
let coin = new Coin();
let coins = [coin];

let runGame = () => {
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    if (!player.dead) {
        player.update();
        player.draw();
    }
    bats.forEach((bat) => {
        bat.update();
        bat.draw();
    });
    coins.forEach((coin) => {
        coin.update();
        coin.draw();
    });

    // collision
    if (bats.length > 0) {
        if (areColliding(player, bats[0])) {
            bats.pop();
            player.lives--;
            if (player.lives == 0) {
                player.dead = true;
            }
            console.log(player.lives);
        }
    }
    if (coins.length > 0) {
        if (areColliding(player, coins[0])) {
            coins.pop();
        }
    }

    window.requestAnimationFrame(runGame);
}

