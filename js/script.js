/*----- constants -----*/
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#end-screen");
const startButton = document.querySelector("#start-button");
const exitButton = document.querySelector("#exit-button");

/*----- state variables -----*/
gameScreen.style.display = "none";
endScreen.style.display = "none";

/*----- cached elements  -----*/

/*----- event listeners -----*/
startButton.addEventListener("click", startGame);
exitButton.addEventListener("click", endGame);

/*----- functions -----*/
function startGame () {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
};

function endGame () {
  gameScreen.style.display = "none";
  endScreen.style.display = "block";
  
};
