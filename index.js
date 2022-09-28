// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const tz = document.getElementById("target-zone");
const tt = document.getElementsByClassName("tooltiptext");
console.log(tt)
const diceImgs = [
  "/images/one.png",
  "/images/two.png",
  "/images/three.png",
  "/images/four.png",
  "/images/five.png",
  "/images/six.png",
  "/images/cow2.png",
  "/images/cow2.png",
  "/images/cow2.png",
];

function showResetButton() {
  rollBtn.style.display = "none";
  resetBtn.style.display = "block";

  player1Dice.classList.remove("active");
  player2Dice.classList.remove("active");
}

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener("click", function () {
  tt[0].style.visibility= "hidden"
  rollBtn.disabled = true;
  player1Dice.classList.remove("animate__shakeX");
  player2Dice.classList.remove("animate__shakeX");

  const randomNumber = Math.floor(Math.random() * 8) + 1;

  if (player1Turn) {
    const diceCycle = setInterval(function () {
      let randomIndex = Math.floor(Math.random() * 8) + 1;
      // console.log(randomIndex)
      player1Dice.innerHTML = `<img src=${diceImgs[randomIndex - 1]}>`;
    }, 100);

    player1Dice.classList.add("animate__shakeX");

    if (randomNumber === 7 || randomNumber === 8 || randomNumber === 9) {
   
      setTimeout(function () {
        tt[0].style.visibility= "visible"
        tt[0].textContent = "Oh, BOO HOO, I take 3 points away from you, Player 2"
        player2Score -= 3;
        player2Scoreboard.textContent = player2Score;
        clearInterval(diceCycle);
        player1Dice.innerHTML = `<img src=${diceImgs[randomNumber - 1]}>`;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
        player1Turn = !player1Turn;
        rollBtn.disabled = false;
      }, 800);
    } else {
      player1Score += randomNumber;

      setTimeout(function () {
        rollBtn.disabled = false;
        clearInterval(diceCycle);
        player1Scoreboard.textContent = player1Score;
        player1Dice.innerHTML = `<img src=${diceImgs[randomNumber - 1]}>`;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
        let win = checkForWin();
        if (!win) {
          player1Turn = !player1Turn;
        } else {
          player1Dice.textContent = "👑";
          player2Dice.textContent = "😭";
          message.textContent = "PLAYER 1 WINS!!!";
          showResetButton();
        }
      }, 800);
    }
  } else {
    const diceCycle = setInterval(function () {
      let randomIndex = Math.floor(Math.random() * 6) + 1;
      player2Dice.innerHTML = `<img src=${diceImgs[randomIndex - 1]}>`;
    }, 100);

    
    player2Dice.classList.add("animate__shakeX");

    if (randomNumber === 7 || randomNumber === 8 || randomNumber === 9) {



      setTimeout(function () {
        tt[0].style.visibility= "visible"
        tt[0].textContent = "DUN DUN DUN, 3 points have been taken from Player 1"
        player1Score -= 3;
        player1Scoreboard.textContent = player1Score;
        clearInterval(diceCycle);
        player2Dice.innerHTML = `<img src=${diceImgs[randomNumber - 1]}>`;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
        player1Turn = !player1Turn;
        rollBtn.disabled = false;
      }, 800);
    } else {
      player2Score += randomNumber;
      setTimeout(function () {
        rollBtn.disabled = false;
        clearInterval(diceCycle);
        player2Scoreboard.textContent = player2Score;
        player2Dice.innerHTML = `<img src=${diceImgs[randomNumber - 1]}>`;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
        let win = checkForWin();
        if (!win) {
          player1Turn = !player1Turn;
        } else {
          player2Dice.textContent = "👑";
          player1Dice.textContent = "😭";
          message.textContent = "PLAYER 2 WINS!!!";
          showResetButton();
        }
      }, 800);
    }
  }
});

resetBtn.addEventListener("click", function () {
  reset();
});

function checkForWin() {
  if (player1Score >= 20) {
    return "Player 1";
  } else if (player2Score >= 20) {
    return "Player 2";
  }
}

function reset() {
  player1Dice.classList.remove("animate__shakeX");
  player2Dice.classList.remove("animate__shakeX");
  player1Score = 0;
  player2Score = 0;
  player1Turn = true;
  player1Scoreboard.textContent = 0;
  player2Scoreboard.textContent = 0;
  player1Dice.textContent = "-";
  player2Dice.textContent = "-";
  message.textContent = "Player 1 Turn";
  resetBtn.style.display = "none";
  rollBtn.style.display = "block";
  player2Dice.classList.remove("active");
  player1Dice.classList.add("active");

  player2Dice.style.fontSize = "";
  player1Dice.style.fontSize = "";
}
