import { dom } from '../dom.js';
import { gameState } from '../state.js';
import { renderWordScreen } from '../views/wordView.js';
import { showScreen } from '../ui/navigation.js';

export function showWord(e) {
  e.preventDefault();
  dom.tapArea.classList.add('pressed');
  dom.wordReveal.classList.remove('hidden');

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isImposter = gameState.imposters.includes(currentPlayer);

  if (isImposter) {
    if (gameState.hintMode) {
      dom.wordContent.innerHTML = `<div class="imposter">Je bent de IMPOSTER!<br><br>Hint: ${gameState.currentHint}</div>`;
    } else {
      dom.wordContent.innerHTML = `<div class="imposter">Je bent de IMPOSTER!</div>`;
    }
  } else {
    // Check if there are no imposters in trol mode
    if (gameState.imposters.length === 0) {
      dom.wordContent.innerHTML = `<div class="regular">${gameState.currentWord}<br><br><small>(Geen imposters deze ronde!)</small></div>`;
    } else {
      dom.wordContent.innerHTML = `<div class="regular">${gameState.currentWord}</div>`;
    }
  }
}

export function hideWord(e) {
  e.preventDefault();
  dom.tapArea.classList.remove('pressed');
  dom.wordReveal.classList.add('hidden');
}

export function backPlayer() {
  if (gameState.currentPlayerIndex > 0) {
    gameState.currentPlayerIndex--;
    renderWordScreen();

    // Reset start round button if we were at the last player
    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
      dom.nextPlayerBtn.style.display = '';
    }
  }
}

export function nextPlayer() {
  if (gameState.currentPlayerIndex < gameState.players.length - 1) {
    gameState.currentPlayerIndex++;
    renderWordScreen();
  }
}

export function startRound() {
  gameState.allWordsRevealed = true;
  showScreen('game');
}


