import { dom } from './dom.js';
import {
  generatePlayerInputs,
  startGame,
  toggleRules,
} from './controllers/setupController.js';
import {
  backPlayer,
  backToGame,
  hideWord,
  nextPlayer,
  showWord,
  startRound,
} from './controllers/wordController.js';
import {
  backToWords,
  continueToWord,
  endGame,
  nextRound,
  revealScoring,
} from './controllers/gameController.js';
import { newGame } from './controllers/scoresController.js';
import { preventContextMenu } from './controllers/globalController.js';

function setupEventListeners() {
  // Setup screen
  dom.toggleRulesBtn.addEventListener('click', toggleRules);
  dom.playerCountInput.addEventListener('change', generatePlayerInputs);
  dom.startGameBtn.addEventListener('click', startGame);

  // Word reveal screen
  dom.tapArea.addEventListener('mousedown', showWord);
  dom.tapArea.addEventListener('mouseup', hideWord);
  dom.tapArea.addEventListener('mouseleave', hideWord);
  dom.tapArea.addEventListener('touchstart', showWord);
  dom.tapArea.addEventListener('touchend', hideWord);

  dom.backPlayerBtn.addEventListener('click', backPlayer);
  dom.nextPlayerBtn.addEventListener('click', nextPlayer);
  dom.startRoundBtn.addEventListener('click', startRound);
  dom.backToGameBtn.addEventListener('click', backToGame);

  // Game screen
  dom.backToWordsBtn.addEventListener('click', backToWords);
  dom.revealScoringBtn.addEventListener('click', revealScoring);
  dom.nextRoundBtn.addEventListener('click', nextRound);
  dom.endGameBtn.addEventListener('click', endGame);
  dom.continueToWordBtn.addEventListener('click', continueToWord);

  // Scores screen
  dom.newGameBtn.addEventListener('click', newGame);

  // Prevent context menu on long press
  document.addEventListener('contextmenu', preventContextMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  generatePlayerInputs();
});


