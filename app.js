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
    constructor(spriteSheet, context, spriteWidth, spriteHeight, xStartIndex, xEndIndex, yIndexOffset, animationSpeed, scale=1) {
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

// Player Class
class Player {
    constructor() {
        // starting position

        this.x = 0; // player's x coordinate position
        this.y = 80; // player's y coordinate position

        // movement
        this.movingLeft = false;
        this.movingRight = false;
        this.attacking = false;
        // this.jumping = false;
        this.speed = 1;
        this.velocity = [0,0];

        // for the spritesheet position
        this.xFrame = 0;
        this.yFrame = 0;
        this.frame = 0;

        // sprite dimensions
        this.spriteWidth = 64;
        this.spriteHeight = 64;

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

        // attack
        let attackSpriteSheet = new Image();
        attackSpriteSheet.src = "SpriteSheets/Normal Attack.png";
        this.attackAnimation = new Animation(attackSpriteSheet, context, 64, 64, 0, 5, 3, 20);
        
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

        this.x += this.velocity[0];
        this.y += this.velocity[1];

        // running to the right
        if (this.velocity[0] > 0) {
            this.currentAnimation = this.runRightAnimation;
        }
        // running left
        else if (this.velocity[0] < 0) {
            this.currentAnimation = this.runLeftAnimation;
        }
        else if (this.attacking) {
            this.currentAnimation = this.attackAnimation;
        }
        else {
            this.currentAnimation = this.idleAnimation;
        }
        
        // this.runAnimation.isFlipped = false;
        this.velocity = [0, 0];

        this.currentAnimation.xPostion = this.x;
        this.currentAnimation.yPosition = this.y;
        this.currentAnimation.update();

    }
    draw() {
        //
        this.currentAnimation.play();
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



let player = new Player();

/**********
 * Events
 **********/
window.addEventListener("keydown", (keypressed) => {
    let leftKey = "ArrowLeft";
    let rightKey = "ArrowRight";
    let upKey = "ArrowUp";
    let attackKey = "f";

    // switch statement that returns the key that was pressed
    switch (keypressed.key) {
        case leftKey:
            player.movingLeft = true; // to change the x position by 5 pixels left
            break;
        case rightKey:
            player.movingRight = true; // to change the x position by 5 pixels right
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

    // switch statement that returns the key that was pressed
    switch (keyreleased.key) {
        case leftKey:
            player.movingLeft = false;
            break;
        case rightKey:
            player.movingRight = false;
            break;
        case attackKey:
            player.attacking = false;
    }
});

// draw the character
// let spriteSheet = new Image();
// spriteSheet.src = "SpriteSheets/Idle_and_running.png";
// let count = 0;
// let frameIndex = 0;




// let animate = () => {

//     // play()
//     context.drawImage(spriteSheet, frameIndex * 64, 1* 64, 64, 64, 20, 20, 64, 64);

//     // put in an update function
//     count++;
//     if (count > 10) {
//         frameIndex++;
//         count = 0;
//     };
    
//     if (frameIndex > 7) {
//         frameIndex = 0;
//     };
// }


let runGame = () => {
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    player.update();
    player.draw();
    window.requestAnimationFrame(runGame);
}

