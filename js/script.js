//* css card library taken from https://replit.com/@SEIStudent/How-to-Use-CSS-Card-Library#index.html

/*----- constants -----*/
const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const resultScreen = document.querySelector("#result-screen");

const playerHand = document.querySelector("#player-hand");
const dealerHand = document.querySelector("#dealer-hand");

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

/*----- state variables -----*/
let gameResult = 0; // 0 = draw, 1 = player wins, 2 = player loses, 3 = player runs
let deck = [];

const player = { handArr: [], handValue: 0, aceCount: 0, balance: 1000 };
const dealer = { handArr: [], handValue: 0, aceCount: 0 };

const bet = { value: 0, result: 0 };

/*----- event listeners -----*/
startButton.addEventListener("click", startGame);
hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);
runButton.addEventListener("click", run);
continueButton.addEventListener("click", continueGame);
exitButton.addEventListener("click", exitGame);

/*----- functions -----*/
//* deck functions-----------------------
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

//* game state---------------------------
function init() {
  gameScreen.style.display = "none";
  resultScreen.style.display = "none";
  const playerBal = document.querySelector("#player-balance");
  playerBal.innerHTML = "";
  playerBal.innerText = `Your current balance is $${player.balance}`;
}

init();

function startGame() {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  player.handArr = [];
  player.handValue = 0;
  player.aceCount = 0;
  dealer.handArr = [];
  dealer.handValue = 0;
  dealer.aceCount = 0;
  deck = [];
  betting();
  buildDeck();
  shuffleDeck();
  dealHands(player);
  dealHands(dealer);
  renderGameScreen();
  checkInstant();
}

function betting() {
  const errorMessage = document.querySelector("#error-message");
  errorMessage.innerText = "";
  bet.value = document.querySelector("input").value;
  if (bet.value > player.balance) {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    resultScreen.style.display = "none";
    errorMessage.innerText = `Your bet cannot be more than your current balance! Please enter a lower bet.`;
  } else if (bet.value <= 0) {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    resultScreen.style.display = "none";
    errorMessage.innerText = `Your bet is invalid. Please enter a whole number greater than zero.`;
  }
  return bet.value;
}

function dealHands(person) {
  for (i = 0; i < 2; i++) {
    let card = deck.pop();
    person.handValue += card.value;
    person.aceCount += checkAce(card);
    person.handArr.push(card);
  }
}

function checkAce(card) {
  if (card.rank === "A") {
    return 1;
  }
  return 0;
}

function renderGameScreen() {
  hitButton.disabled = false;
  standButton.disabled = false;
  runButton.disabled = true;
  renderHands(player.handArr, playerHand);
  renderDealerStartHand(dealer.handArr, dealerHand);

  if (player.handValue === 15) {
    standButton.disabled = true;
    runButton.disabled = false;
  } else if (player.handValue < 16) {
    standButton.disabled = true;
  }
}

function renderHands(cards, container) {
  container.innerHTML = "";
  let cardHtml = "";
  cards.forEach(function (card) {
    cardHtml += `<div class="card ${card.face}"></div>`;
  });
  container.innerHTML = cardHtml;
}

function renderDealerStartHand(cards, container) {
  container.innerHTML = "";
  let hiddenCardHtml = "";
  let cardHtml = "";
  hiddenCardHtml += `<div class="card back-blue"></div>`;
  for (i = 1; i < cards.length; i++) {
    cardHtml += `<div class="card ${cards[i].face}"></div>`;
  }
  container.innerHTML = hiddenCardHtml + cardHtml;
}

function checkInstant() {
  if (player.handValue === 21 && dealer.handValue !== 21) {
    bet.result = parseInt(bet.value) * 2;
    player.balance = player.balance + bet.result;
    gameResult = 1;
    displayResult();
  } else if (
    player.handArr[0].rank === "A" &&
    player.handArr[1].rank === "A" &&
    dealer.handArr[0].rank !== "A" &&
    dealer.handValue !== 21
  ) {
    bet.result = parseInt(bet.value) * 3;
    player.balance = player.balance + bet.result;
    gameResult = 1;
    displayResult();
  } else if (dealer.handValue === 21 && player.handValue !== 21) {
    bet.result = parseInt(bet.value) * 2;
    player.balance = player.balance - bet.result;
    gameResult = 2;
    displayResult();
  } else if (
    dealer.handArr[0].rank === "A" &&
    dealer.handArr[1].rank === "A" &&
    player.handArr[0].rank !== "A" &&
    player.handValue !== 21
  ) {
    bet.result = parseInt(bet.value) * 3;
    player.balance = player.balance - bet.result;
    gameResult = 2;
    displayResult();
  } else if (player.handValue === 21 && dealer.handValue === 21) {
    gameResult = 0;
    displayResult();
  } else if (
    player.handArr[0].rank === "A" &&
    player.handArr[1].rank === "A" &&
    dealer.handArr[0].rank === "A" &&
    dealer.handArr[1].rank === "A"
  ) {
    gameResult = 0;
    displayResult();
  }
}

function hit() {
  clickHit();
  checkHit();
}

function clickHit() {
  let card = deck.pop();
  player.handValue += card.value;
  player.aceCount += checkAce(card);
  let playerAce = reduceAce(player.handValue, player.aceCount);
  player.handValue = playerAce.handValue;
  player.aceCount = playerAce.aceCount;
  player.handArr.push(card);
  renderHands(player.handArr, playerHand);

  if (player.handValue >= 16) {
    standButton.disabled = false;
    runButton.disabled = true;
  }
  if (player.handValue > 21 || player.handArr.length === 5) {
    hitButton.disabled = true;
  }
}

function reduceAce(handValue, aceCount) {
  while (handValue > 21 && aceCount > 0) {
    handValue -= 10;
    aceCount--;
  }
  return { handValue, aceCount };
}

function checkHit() {
  if (player.handArr.length === 5 && player.handValue <= 21) {
    bet.result = parseInt(bet.value) * 2;
    player.balance = player.balance + bet.result;
    gameResult = 1;
    displayResult();
  } else if (
    player.handArr.length === 3 &&
    player.handArr[0].rank === "07" &&
    player.handArr[1].rank === "07" &&
    player.handArr[2].rank === "07"
  ) {
    bet.result = parseInt(bet.value) * 7;
    player.balance = player.balance + bet.result;
    gameResult = 1;
    displayResult();
  }
}

function stand() {
  determineResult();
}

function run() {
  gameResult = 3;
  displayResult();
}

function dealerTurn() {
  dealerHit();
  checkDealerHit();
}

function dealerHit() {
  while (dealer.handValue < 16 && dealer.handArr.length < 5) {
    let card = deck.pop();
    dealer.handValue += card.value;
    dealer.aceCount += checkAce(card);
    let dealerAce = reduceAce(dealer.handValue, dealer.aceCount);
    dealer.handValue = dealerAce.handValue;
    dealer.aceCount = dealerAce.aceCount;
    dealer.handArr.push(card);
  }
}

function checkDealerHit() {
  if (dealer.handArr.length === 5 && dealer.handValue <= 21) {
    bet.result = parseInt(bet.value) * 2;
    player.balance = player.balance - bet.result;
    gameResult = 2;
    displayResult();
  } else if (
    dealer.handArr.length === 3 &&
    dealer.handArr[0].rank === "07" &&
    dealer.handArr[1].rank === "07" &&
    dealer.handArr[2].rank === "07"
  ) {
    bet.result = parseInt(bet.value) * 7;
    player.balance = player.balance - bet.result;
    gameResult = 1;
    displayResult();
  }
}

function determineResult() {
  dealerTurn();
  bet.result = parseInt(bet.value);
  if (
    (player.handValue > 21 && dealer.handValue <= 21) ||
    (dealer.handValue <= 21 && dealer.handValue > player.handValue)
  ) {
    player.balance = player.balance - bet.result;
    gameResult = 2;
  } else if (
    (dealer.handValue > 21 && player.handValue <= 21) ||
    (player.handValue <= 21 && player.handValue > dealer.handValue)
  ) {
    player.balance = player.balance + bet.result;
    gameResult = 1;
  } else {
    gameResult = 0;
  }
  displayResult();
}

function displayResult() {
  renderHands(dealer.handArr, dealerHand);
  resultScreen.style.display = "block";
  hitButton.disabled = true;
  standButton.disabled = true;
  runButton.disabled = true;
  const result = document.querySelector("#result");
  result.innerText = "";
  if (gameResult === 1) {
    result.innerText = `Congratulations! You won $${bet.result} :)`;
  } else if (gameResult === 2) {
    result.innerText = `Oh no! You lost $${bet.result} :(`;
  } else if (gameResult === 3) {
    result.innerText = `You decided to run! Let's go again!`;
  } else {
    result.innerText = `It's a draw!`;
  }
  const playerBal = document.querySelector("#player-new-balance");
  playerBal.innerText = `Your new balance is $${player.balance}`;
}

function continueGame() {
  gameScreen.style.display = "none";
  resultScreen.style.display = "none";
  startScreen.style.display = "block";
  init();
}

function exitGame() {
  gameScreen.style.display = "none";
  resultScreen.style.display = "none";
  startScreen.style.display = "block";
  player.balance = 1000;
  init();
}
