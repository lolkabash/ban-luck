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
const deck = [];

/*----- state variables -----*/
let playerBalance = 1000;
let betValue = 0;
// result 0 = draw, 1 = player wins, 2 = player loses, 3 = player runs
let gameResult = 0;
let betResult = 0;

let playerHandArr = [];
let dealerHandArr = [];
let playerHandValue = 0;
let dealerHandValue = 0;
let playerAceCount = 0;
let dealerAceCount = 0;

/*----- cached elements  -----*/
gameScreen.style.display = "none";
endScreen.style.display = "none";

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
  playerBal.innerText = `Your current balance is $${playerBalance}`;
  playerB.append(playerBal);
}
renderStartScreen();

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
  buildOriginalDeck();
  shuffleDeck();
  dealPlayerHand();
  dealDealerHand();
  renderGameScreen();
  checkInstant();
}

function renderHands(cards, container) {
  container.innerHTML = "";
  let cardHtml = "";
  cards.forEach(function (card) {
    cardHtml += `<div class="card ${card.face}"></div>`;
  });
  container.innerHTML = cardHtml;
}

function checkAce(card) {
  if (card.rank === "A") {
    return 1;
  }
  return 0;
}

function reduceAce(handValue, aceCount) {
  while (handValue > 21 && aceCount > 0) {
    handValue -= 10;
    aceCount -= 1;
  }
  return handValue;
}

function dealPlayerHand() {
  playerHandArr = [];
  playerHandValue = 0;
  playerAceCount = 0;
  for (i = 0; i < 2; i++) {
    let card = deck.pop();
    playerHandValue += card.value;
    playerAceCount += checkAce(card);
    playerHandArr.push(card);
  }
}

function dealDealerHand() {
  dealerHandArr = [];
  dealerHandValue = 0;
  for (i = 0; i < 2; i++) {
    let card = deck.pop();
    dealerHandValue += card.value;
    dealerAceCount += checkAce(card);
    dealerHandArr.push(card);
  }
}

function renderGameScreen() {
  hitButton.disabled = false;
  standButton.disabled = false;
  runButton.disable = true;
  renderHands(playerHandArr, playerHand);
  renderHands(dealerHandArr, dealerHand);

  if (playerHandValue === 15) {
    standButton.disabled = true;
    runButton.disabled = false;
  } else if (playerHandValue < 16) {
    standButton.disabled = true;
  }
}

function checkInstant() {
  if (playerHandValue === 21 && dealerHandValue !== 21) {
    betResult = parseInt(betValue) * 2;
    playerBalance = playerBalance + betResult;
    gameResult = 1;
    endGame();
  } else if (
    playerHandArr[0].rank === "A" &&
    playerHandArr[1].rank === "A" &&
    dealerHandArr[0].rank !== "A" &&
    dealerHandValue !== 21
  ) {
    betResult = parseInt(betValue) * 3;
    playerBalance = playerBalance + betResult;
    gameResult = 1;
    endGame();
  } else if (dealerHandValue === 21 && playerHandValue !== 21) {
    betResult = parseInt(betValue) * 2;
    playerBalance = playerBalance - betResult;
    gameResult = 2;
    endGame();
  } else if (
    dealerHandArr[0].rank === "A" &&
    dealerHandArr[1].rank === "A" &&
    playerHandArr[0].rank !== "A" &&
    playerHandValue !== 21
  ) {
    betResult = parseInt(betValue) * 3;
    playerBalance = playerBalance + betResult;
    gameResult = 2;
    endGame();
  } else if (playerHandValue === 21 && dealerHandValue === 21) {
    gameResult = 0;
    endGame();
  } else if (
    playerHandArr[0].rank === "A" &&
    playerHandArr[1].rank === "A" &&
    dealerHandArr[0].rank === "A" &&
    dealerHandArr[1].rank === "A"
  ) {
    gameResult = 0;
    endGame();
  }
}

function hit() {
  let card = deck.pop();
  playerHandValue += card.value;
  playerAceCount += checkAce(card);
  playerHandValue = reduceAce(playerHandValue, playerAceCount);
  playerHandArr.push(card);
  renderHands(playerHandArr, playerHand);

  // if (playerHandArr.length === 5 && playerHandValue <= 21) {
  //   betResult = parseInt(betValue) * 2;
  //   playerBalance = playerBalance + betResult;
  //   gameResult = 1;
  //   endGame();
  // }
  if (
    playerHandArr.length === 3 &&
    playerHandArr[0].rank === "07" &&
    playerHandArr[1].rank === "07" &&
    playerHandArr[2].rank === "07"
  ) {
    betResult = parseInt(betValue) * 7;
    playerBalance = playerBalance + betResult;
    gameResult = 1;
    endGame();
  }

  if (playerHandValue >= 16) {
    standButton.disabled = false;
  }
  if (playerHandValue > 21 || playerHandArr.length === 5) {
    hitButton.disabled = true;
  }
}

function stand() {
  playerHandValue = reduceAce(playerHandValue, playerAceCount);
  dealerHandValue = reduceAce(dealerHandValue, dealerAceCount);
  determineResult();
}

function run() {
  gameResult = 3;
  endGame();
}

function dealerTurn() {
  while (dealerHandValue < 16) {
    let card = deck.pop();
    dealerHandValue += card.value;
    dealerAceCount += checkAce(card);
    dealerHandValue = reduceAce(dealerHandValue, dealerAceCount);
    dealerHandArr.push(card);
    renderHands(dealerHandArr, dealerHand);
  }
}

function determineResult() {
  dealerTurn();
  if (
    playerHandValue > 21 ||
    (dealerHandValue <= 21 && dealerHandValue > playerHandValue)
  ) {
    betResult = parseInt(betValue);
    playerBalance = playerBalance - betResult;
    gameResult = 2;
  } else if (
    dealerHandValue > 21 ||
    (playerHandValue <= 21 && playerHandValue > dealerHandValue)
  ) {
    betResult = parseInt(betValue);
    playerBalance = playerBalance + betResult;
    gameResult = 1;
  } else {
    gameResult = 0;
  }
  endGame();
}

function endGame() {
  endScreen.style.display = "block";
  renderEndScreen();
}

function renderEndScreen() {
  hitButton.disabled = true;
  standButton.disabled = true;
  runButton.disabled = true;
  const endState = document.querySelector("#end-state");
  endState.innerText = "";
  const gameRes = document.createElement("p");
  if (gameResult === 1) {
    gameRes.innerText = `Congratulations! You won $${betResult} :)`;
  } else if (gameResult === 2) {
    gameRes.innerText = `Oh no! You lost $${betResult} :(`;
  } else if (gameResult === 3) {
    gameRes.innerText = `You decided to run! Let's go again!`;
  } else {
    gameRes.innerText = `It's a draw!`;
  }
  const playerBal = document.createElement("p");
  playerBal.innerText = `Your new balance is $${playerBalance}`;
  endState.append(gameRes);
  endState.append(playerBal);
  return playerBal;
}

function continueGame() {
  gameScreen.style.display = "none";
  endScreen.style.display = "none";
  startScreen.style.display = "block";
  renderStartScreen();
}

function exitGame() {
  gameScreen.style.display = "none";
  endScreen.style.display = "none";
  startScreen.style.display = "block";
  playerBalance = 1000;
  renderStartScreen();
}

//* card library-----------------------
function buildOriginalDeck() {
  // Use nested forEach to generate card objects
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack
        value: Number(rank) || (rank === "A" ? 11 : 10),
        rank: rank,
      });
    });
  });
  return deck;
}

function shuffleDeck() {
  for (i = 0; i < deck.length; i++) {
    const rndIdx = Math.floor(Math.random() * deck.length);
    let tempDeck = deck[i];
    deck[i] = deck[rndIdx];
    deck[rndIdx] = tempDeck;
  }
}