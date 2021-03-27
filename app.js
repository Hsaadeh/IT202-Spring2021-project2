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
    window.onclick = init;
})

// key pressed function
let GetKeyPressed = () => {
    window.addEventListener("keydown", (keypressed) => {
        // console.log(keypressed);
        // setting the values of the keys that are used as controls in the game
        let leftKey = "ArrowLeft";
        let rightKey = "ArrowRight";
        let upKey = "ArrowUp";
        let aKey = "a";
        let sKey = "s";
        let dKey = "d";

        // switch statement that returns the key that was pressed
        switch (keypressed.key) {
            case leftKey:
                console.log("moving left");
                return leftKey;
            case rightKey:
                console.log("moving right");
                return rightKey;
            case upKey:
                console.log("jump");
                return upKey;
            case aKey:
                console.log("high attack");
                return aKey;
            case sKey:
                console.log("mid attack");
                return sKey;
            case dKey:
                console.log("low attack");
                return dKey;
        }
    })
}

GetKeyPressed();



function init(){
    gameCanvas;
    context;

    // initial frame
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(CurrentTime){
    draw();

    // new frame requests
    window.requestAnimationFrame(gameLoop);
}

function draw(){
    let randomColor = Math.random() > 0.5? '#ff8080' : '#0099b0';
    context.fillStyle = randomColor;
    context.fillRect(100, 50, 200, 175);
    console.log("Drawing");
}