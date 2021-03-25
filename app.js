// javascript functionality for the site

// global variables
menu = document.querySelector("#menu");
gameCanvas = document.querySelector("#gameCanvas");

// start button
startButton = document.querySelector("#startGame");
startButton.addEventListener("click", (event) => {
    // dont display the menu
    menu.style.display = "none";
    // display the game screen
    gameCanvas.style.display = "block";
    console.log("start");
})