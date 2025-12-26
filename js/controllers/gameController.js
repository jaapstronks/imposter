import { dom } from '../dom.js';
import { gameState } from '../state.js';
import { setupRound } from '../game/setupRound.js';
import { showScreen } from '../ui/navigation.js';
import {
  hideRoundSummaryModal,
  showRoundSummaryModal,
} from '../views/roundSummaryView.js';

export function revealScoring() {
  gameState.gameStep = 'scoring';
  // Hide starter phase, show scoring phase
  dom.starterPhase.classList.add('hidden');
  dom.scoringPhase.classList.remove('hidden');
}

export function backToWords() {
  showScreen('word');
}

export function nextRound() {
  // Award points to all selected winners
  gameState.selectedWinners.forEach((winner) => {
    gameState.scores[winner]++;
  });

  // Clear selections for next round
  gameState.selectedWinners.clear();

  // Setup next round (word/imposters), but show the score first
  gameState.currentRound++;
  setupRound();
  showRoundSummaryModal();
}

export function continueToWord() {
  hideRoundSummaryModal();
  showScreen('word');
}

export function endGame() {
  showScreen('scores');
}


