'use strict'
// elements

const startGameBtn = document.getElementById('start-game-btn');
const endGameBtn = document.getElementById('end-game-btn');
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const userChoiceEls = document.querySelectorAll('.user-choice');
const messageEl = document.querySelector('.message-box');


// variables
const choices = ['rock', 'paper', 'scissor', 'lizard', 'spock'];
let activeComputerInterval;

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
//functions
const game = (value) => {
  const computerChoice = choices[Math.floor(Math.random() * 5)];

  console.log('user', value);
  console.log('computer', computerChoice);
  if (computerChoice === value) {
    console.log("it's a draw!");
  }
  else if (logic[value][computerChoice]) {
    console.log('user wins!');

  }
  else if (!logic[value][computerChoice]) {
    console.log('computer wins!');
  }
}
const activeComputer = () => {
  let counter = 1;
  activeComputerInterval = setInterval(() => {

    if (counter % 2 === 0) {
      document.getElementById('computer-1').src = "./assets/computer-off.png";
      document.getElementById('computer-2').src = "./assets/computer-on.png";
      console.log('on');
    }
    else if(counter !==0) {
      document.getElementById('computer-1').src = "./assets/computer-on.png";
      document.getElementById('computer-2').src = "./assets/computer-off.png";
      console.log('off');
    }
    
    counter++;
    console.log(counter);
  }, 300)
  

}
// Events
startGameBtn.addEventListener('click', () => {
  document.querySelector('.versus').classList.add('versus-animation');
  document.querySelector('.user-score-plate').style.display = "flex";
  document.querySelector('.computer-score-plate').style.display = "flex";
  document.querySelector('.user-inputs').style.display = 'flex';
  document.querySelector('.starting-message').style.display = 'none';
  document.querySelector('.versus').style.cssText += 'width:25rem';
  messageEl.style.display='flex';
  startGameBtn.style.display = 'none';
  endGameBtn.style.display = 'block';
  

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
  messageEl.style.display='none';
  endGameBtn.style.display = 'none';
  

  clearInterval(activeComputerInterval);
  
})


