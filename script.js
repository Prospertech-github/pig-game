'use strict';

// Variable declaration
var scores, roundScore, activePlayer, gamePlaying;

init();

// ROLL BUTTON FUNCTION
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    // Generate Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';

    diceDOM.src = 'dice-' + dice + '.png';

    // Check if score is equal to one 
    if (dice !== 1) {
      // Add score to roundscore
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
})


// HOLD BUTTON FUNCTION
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    
    // check if player won
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name--' + activePlayer).textContent = 'WINNER!!';
      // Hide dice
      document.querySelector('.dice').style.display = 'none'; 
      // Add winner class
      document.querySelector('.player--' + activePlayer).classList.add('player-winner');
      document.querySelector('.player--' + activePlayer).classList.remove('player--active');
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
  document.querySelector('.dice').style.display = 'none';
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

  document.querySelector('.dice').style.display = 'none';

};