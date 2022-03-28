'use strict'
// elements

const startGameBtn = document.getElementById('start-game-btn');
const endGameBtn = document.getElementById('end-game-btn');
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const userChoiceEls = document.querySelectorAll('.user-choice');
const messageEl = document.querySelector('.message-box');

const timeCounterEl = document.querySelector('.time-counter');
const modalActiveGameEl = document.getElementById('modal-active-game');
const modalMessage = document.querySelector('.modal-message');

// sounds
const startGameSound = new Audio('./../assets/start-game-sound.mp3');
const winSound = new Audio('./../assets/win.mp3');
const loseSound = new Audio('./../assets/lose.mp3');
const drawSound = new Audio('./../assets/draw.mp3');

// variables
const choices = ['rock', 'paper', 'scissor', 'lizard', 'spock'];
let activeComputerInterval;
let userScore=0;
let computerScore=0;
const logic = {
  rock: {
    paper: false,
    scissor: true,
    lizard: true,
    spock: false,
  },
  paper: {
    rock: true,
    scissor: false,
    lizard: false,
    spock: true,
  },
  scissor: {
    rock: false,
    paper: true,
    lizard: true,
    spock: false,
  },
  lizard: {
    rock: false,
    scissor: false,
    paper: true,
    spock: true,
  },
  spock: {
    rock: true,
    scissor: true,
    lizard: false,
    paper: false,
  }
}

const weapons = {
  rock: '<i class="fa-solid fa-hand-back-fist">',
  paper: '<i class="fa-solid fa-hand"></i>',
  scissor: '<i class="fa-solid fa-hand-scissors"></i>',
  lizard: '<i class="fa-solid fa-hand-lizard"></i>',
  spock: '<i class="fa-solid fa-hand-spock"></i>'
}

//functions
const game = (value) => {

  document.querySelector('.container').classList.add('blur');
  document.querySelector('.user-turn').classList.add('game-on-animation-user');
  document.querySelector('.computer-turn').classList.add('game-on-animation-computer');
  modalActiveGameEl.style.display = 'flex';
  timeCounterEl.style.display='block';
  timeCounterEl.innerText='3';
  const computerChoice = choices[Math.floor(Math.random() * 5)];

  //active game animation
  setTimeout(() => {
    document.querySelector('.computer-turn').innerHTML = weapons[computerChoice];
    document.querySelector('.user-turn').innerHTML = weapons[value];
  }, 2200)
  //counter for game
  let i=2;
  const startCounter = setInterval(()=>{
    
    timeCounterEl.innerText=i;
    i--;
    if(i===-1){
      timeCounterEl.style.display='none';
      clearInterval(startCounter);
    }
  },700)

  //final message pop up(win/lose)
  setTimeout(() => {
    console.log('user', value);
    console.log('computer', computerChoice);
    if (computerChoice === value) {
      modalMessage.textContent="Boom 💥 It's a draw!";
      drawSound.play();
      drawSound.playbackRate=2;
    }
    else if (logic[value][computerChoice]) {
      modalMessage.textContent=" 🏆 You won!";
      winSound.play();
      userScore +=1;
      userScoreEl.innerText=userScore;
    }
    else if (!logic[value][computerChoice]) {
      modalMessage.textContent="Ops 😜 computer won";
      loseSound.play();
      computerScore +=1;
      computerScoreEl.innerText = computerScore;
    }
    console.log(1);
    modalMessage.style.display='flex';
  }, 3200)

  //final message pop out and reinitialize game component
  setTimeout(() => {
    modalMessage.style.display='none';
    modalActiveGameEl.style.display='none';
    document.querySelector('.container').classList.remove('blur');
    document.querySelector('.computer-turn').innerHTML = weapons['rock'];
    document.querySelector('.user-turn').innerHTML = weapons['rock'];
  }, 4500)
}

const activeComputer = () => {
  let counter = 1;
  activeComputerInterval = setInterval(() => {

    if (counter % 2 === 0) {
      document.getElementById('computer-1').src = "./assets/computer-off.png";
      document.getElementById('computer-2').src = "./assets/computer-on.png";

    }
    else if (counter !== 0) {
      document.getElementById('computer-1').src = "./assets/computer-on.png";
      document.getElementById('computer-2').src = "./assets/computer-off.png";

    }

    counter++;

  }, 300)
}



// Events
startGameBtn.addEventListener('click', () => {
  document.querySelector('.versus').classList.add('versus-animation');
  document.querySelector('.user-score-plate').style.display = "flex";
  document.querySelector('.computer-score-plate').style.display = "flex";
  document.querySelector('.user-inputs').style.display = 'flex';
  document.querySelector('.starting-message').style.display = 'none';
  // document.querySelector('.versus').style.cssText += 'width:25rem';
  messageEl.style.display = 'flex';
  startGameBtn.style.display = 'none';
  endGameBtn.style.display = 'block';
  computerScoreEl.innerText = computerScore;
  userScoreEl.innerText = userScore;
  startGameSound.play();
  activeComputer();
})
endGameBtn.addEventListener('click', () => {
  document.querySelector('.versus').classList.remove('versus-animation');
  document.querySelector('.user-score-plate').style.display = "none";
  document.querySelector('.computer-score-plate').style.display = "none";
  document.querySelector('.user-inputs').style.display = 'none';
  document.querySelector('.starting-message').style.display = 'flex';
  document.querySelector('.versus').style.cssText += 'width:5rem';
  startGameBtn.style.display = 'block';
  messageEl.style.display = 'none';
  endGameBtn.style.display = 'none';
  
  computerScore=0;
  userScore=0;

  clearInterval(activeComputerInterval);

})


