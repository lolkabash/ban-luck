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
  const playerBal = document.querySelector("#player-balance");
  playerBal.innerHTML = "";
  playerBal.innerText = `Your current balance is $${playerBalance}`;
}
renderStartScreen();

function bet() {
  const errorMessage = document.querySelector("#error-message");
  errorMessage.innerText = "";
  betValue = document.querySelector("input").value;
  if (betValue > playerBalance) {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    errorMessage.innerText= `Your bet cannot be more than your current balance! Please enter a lower bet.`;
    return;
  } else if (betValue <= 0) {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    errorMessage.innerText = `Your bet is invalid. Please enter a whole number greater than zero.`;
    return;
  }
  return betValue;
}

function startGame() {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  bet();
  buildDeck();
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
  dealerAceCount = 0;
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
  runButton.disabled = true;
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

function reduceAce(handValue, aceCount) {
  while (handValue > 21 && aceCount > 0) {
    handValue -= 10;
    aceCount--;
  }
  return {handValue, aceCount};
}

function clickHit() {
  let card = deck.pop();
  playerHandValue += card.value;
  playerAceCount += checkAce(card);
  let player = reduceAce(playerHandValue, playerAceCount);
  playerHandValue = player.handValue;
  playerAceCount = player.aceCount;
  playerHandArr.push(card);
  renderHands(playerHandArr, playerHand);

  if (playerHandValue >= 16) {
    standButton.disabled = false;
    runButton.disabled = true;
  }
  if (playerHandValue > 21 || playerHandArr.length === 5) {
    hitButton.disabled = true;
  }
}

function checkHit() {
  if (playerHandArr.length === 5 && playerHandValue <= 21) {
    betResult = parseInt(betValue) * 2;
    playerBalance = playerBalance + betResult;
    gameResult = 1;
    endGame();
  } else if (
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
}

function hit() {
  clickHit();
  checkHit();
}

function stand() {
  determineResult();
}

function run() {
  gameResult = 3;
  endGame();
}

function dealerTurn() {
  while (dealerHandValue < 16 && dealerHandArr.length < 5) {
    let card = deck.pop();
    dealerHandValue += card.value;
    dealerAceCount += checkAce(card);
    let dealer = reduceAce(dealerHandValue, dealerAceCount);
    dealerHandValue = dealer.handValue;
    dealerAceCount = dealer.aceCount;
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
  if (gameResult === 1) {
    endState.innerText = `Congratulations! You won $${betResult} :)`;
  } else if (gameResult === 2) {
    endState.innerText = `Oh no! You lost $${betResult} :(`;
  } else if (gameResult === 3) {
    endState.innerText = `You decided to run! Let's go again!`;
  } else {
    endState.innerText = `It's a draw!`;
  }
  const playerBal = document.querySelector("#player-new-balance");
  playerBal.innerText = `Your new balance is $${playerBalance}`;
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
function buildDeck() {
  suits.forEach(function (suit) {
    ranks.forEach(function (rank) {
      deck.push({
        face: `${suit}${rank}`,
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