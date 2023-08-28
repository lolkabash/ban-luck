/*----- constants -----*/
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#end-screen");

const dealerHand = document.querySelector("#dealer-hand");
const playerHand = document.querySelector("#player-hand");

const startButton = document.querySelector("#start-button");
const drawButton = document.querySelector("#draw-button");
const stopButton = document.querySelector("#stop-button");
const runButton = document.querySelector("#run-button");
const exitButton = document.querySelector("#exit-button");

/*----- state variables -----*/
gameScreen.style.display = "none";
endScreen.style.display = "none";

let dealerHandValue = 0;
let playerHandValue = 0;

/*----- cached elements  -----*/

/*----- event listeners -----*/
startButton.addEventListener("click", startGame);
exitButton.addEventListener("click", endGame);

/*----- functions -----*/
function bet() {
  const betValue = document.querySelector("input").value;
  console.log(betValue);
  return betValue;
}

function startGame () {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  bet();
};

function endGame () {
  gameScreen.style.display = "none";
  endScreen.style.display = "block";
  
};
