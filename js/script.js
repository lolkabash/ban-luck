//* css card library taken from https://replit.com/@SEIStudent/How-to-Use-CSS-Card-Library#index.html

/*----- constants -----*/
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const endScreen = document.querySelector("#end-screen");

const playerHand = document.querySelector("#player-hand");
const dealerHand = document.querySelector("#dealer-hand");
const hands = document.querySelectorAll(".hand");

const startButton = document.querySelector("#start-button");
const hitButton = document.querySelector("#hit-button");
const standButton = document.querySelector("#stand-button");
const runButton = document.querySelector("#run-button");
const continueButton = document.querySelector("#continue-button");
const exitButton = document.querySelector("#exit-button");

const suits = ["s", "c", "d", "h"];
const ranks = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const originalDeck = buildOriginalDeck();

/*----- state variables -----*/
let playerBalance = 1000;
let betValue = 0;
// result 0 = draw, 1 = player wins, 2 = player loses, 3 = player runs
let gameResult = 0;

let playerHandValue = 0;
let dealerHandValue = 0;

const newShuffledDeck = [];

/*----- cached elements  -----*/
gameScreen.style.display = "none";
endScreen.style.display = "none";

runButton.disabled = true;

/*----- event listeners -----*/
startButton.addEventListener("click", startGame);
hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);
runButton.addEventListener("click", run);
continueButton.addEventListener("click", continueGame);
exitButton.addEventListener("click", exitGame);

/*----- functions -----*/
//* game state------------------------
function renderStartScreen() {
  const playerB = document.querySelector("#player-balance");
  playerB.innerHTML = "";
  const playerBal = document.createElement("p");
  playerBal.innerText = `Your current balance is ${playerBalance}`;
  playerB.append(playerBal);
}

function bet() {
  betValue = document.querySelector("input").value;
  if (betValue > playerBalance) {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    return alert(
      "Your bet cannot be more than your current balance! Please enter a lower bet."
    );
  } else if (betValue <= 0) {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    return alert(
      "Your bet cannot be negative or zero. Please enter a higher bet."
    );
  }
  return betValue;
}

function startGame() {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  bet();
  dealHands();
}

function dealHands() {
  getNewShuffledDeck();

  const playerCardOne = newShuffledDeck[0];
  const playerCardTwo = newShuffledDeck[1];
  const dealerCardOne = newShuffledDeck[2];
  const dealerCardTwo = newShuffledDeck[3];

  const playerStartHand = [playerCardOne, playerCardTwo];
  const dealerStartHand = [dealerCardOne, dealerCardTwo];

  playerHand.innerHTML = "";
  dealerHand.innerHTML = "";

  playerStartHand.forEach(function (card) {
    let cardHtml = "";
    cardHtml += `<div class="card ${card.face}"></div>`;
    playerHand.append(cardHtml);
  });

  dealerStartHand.forEach(function (card) {
    let cardHtml = "";
    cardHtml += `<div class="card ${card.face}"></div>`;
    dealerHand.append(cardHtml);
  });

  playerHandValue = playerCardOne.value + playerCardTwo.value;
  dealerHandValue = dealerCardOne.value + dealerCardTwo.value;

  if (playerHandValue === 15) {
    standButton.disabled = true;
    runButton.disabled = false;
  } else if (playerHandValue < 16) {
    standButton.disabled = true;
  }
}

function hit() {
  if (playerHandValue > 21 || playerHand.length === 5) {
    hitButton.disabled = true;
  }
}

function stand() {
  determineResult();
}

function run() {
  gameResult = 3;
  endGame();
}

function determineResult() {
  if (
    playerHandValue > 21 ||
    (dealerHandValue <= 21 && dealerHandValue > playerHandValue)
  ) {
    gameResult = 2;
  } else if (dealerHandValue > 21 || playerHandValue > dealerHandValue) {
    gameResult = 1;
  } else {
    gameResult = 0;
  }
  endGame();
}

function renderEndScreen() {
  const endState = document.querySelector("#end-state");
  endState.innerText = "";
  const gameRes = document.createElement("p");
  if (gameResult === 1) {
    gameRes.innerText = `Congratulations! You won`;
  } else if (gameResult === 2) {
    gameRes.innerText = `Oh no! You lost`;
  } else if (gameResult === 3) {
    gameRes.innerText = `You decided to run! Let's go again!`;
  } else {
    gameRes.innerText = `It's a draw!`;
  }
  const playerBal = document.createElement("p");
  playerBal.innerText = `Your new balance is ${playerBalance}`;
  endState.append(gameRes);
  endState.append(playerBal);
  return playerBal;
}

function endGame() {
  gameScreen.style.display = "none";
  endScreen.style.display = "block";
  renderEndScreen();
}

function continueGame() {
  endScreen.style.display = "none";
  startScreen.style.display = "block";
  renderStartScreen();
}

function exitGame() {
  endScreen.style.display = "none";
  startScreen.style.display = "block";
  playerBalance = 1000;
  renderStartScreen();
}

//* card library-----------------------
function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack
        value: Number(rank) || (rank === "A" ? 11 : 10),
      });
    });
  });
  return deck;
}

function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

// function renderDeckInContainer(deck, container) {
//   container.innerHTML = "";
//   // Let's build the cards as a string of HTML
//   let cardsHtml = "";
//   deck.forEach(function (card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   container.innerHTML = cardsHtml;
// }

renderStartScreen();
renderEndScreen();
