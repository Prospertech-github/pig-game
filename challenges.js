'use strict';

// Variable declaration
var scores, roundScore, activePlayer, gamePlaying;
var lastDice;
init();

// ROLL BUTTON FUNCTION
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // Generate Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    // Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';


    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // Check if score is equal to one 
     if (dice1 !== 1 && dice2 !== 1) {
      // Add score to roundscore
      roundScore += dice1 + dice2;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }


    /* if (dice === 6 && lastDice === 6) {
      // Player looses score
      scores[activePlayer] = 0;
      document.querySelector('#score--' + activePlayer).textContent = '0';
      nextPlayer();
      
    } else if (dice !== 1) {
      // Add score to roundscore
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
    
    lastDice = dice; */
  }
});


// HOLD BUTTON FUNCTION
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    
    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, null, 0, and "" are COERCED to false
    // Anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100; 
    }

    // check if player won 
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'WINNER!!';
      // Hide dice
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      
      // Add winner class
      document.querySelector('.player--' + activePlayer).classList.add('player-winner');
      document.querySelector('.player--' + activePlayer).classList.remove('player--active');
      document.querySelector('#current--0').textContent = '0';
      document.querySelector('#current--1').textContent = '0';
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    } 
  }
})

function nextPlayer() {
  // Change activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // reset score to 0
    roundScore = 0;
    document.getElementById('current--0').textContent = roundScore;
    document.getElementById('current--1').textContent = roundScore;
    
    // Change active class
    document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  
  // Hide dice
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
};

// NEW GAME
document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  // Variable assignment
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Reset game scores to 0
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.querySelector('#name--0').textContent = 'Player 1';
  document.querySelector('#name--1').textContent = 'Player 2';
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.add('player--active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

};