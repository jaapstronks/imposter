import { dom } from '../dom.js';
import { gameState } from '../state.js';

export function renderWordScreen() {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  dom.currentPlayerSpan.textContent = currentPlayer;

  // Reset tap area
  dom.tapArea.classList.remove('pressed');
  dom.wordReveal.classList.add('hidden');
  dom.startRoundBtn.classList.add('hidden');
  dom.backToGameBtn.classList.add('hidden');

  // Navigation should always be available, even after the game started (people forget their word)
  dom.playerNavigation.classList.remove('hidden');
  dom.backPlayerBtn.disabled = gameState.currentPlayerIndex === 0;
  dom.nextPlayerBtn.disabled =
    gameState.currentPlayerIndex >= gameState.players.length - 1;

  // Only show "Start Ronde" when we're still in the reveal flow and at the last player
  const isLastPlayer =
    gameState.currentPlayerIndex === gameState.players.length - 1;
  if (isLastPlayer && !gameState.allWordsRevealed) {
    dom.startRoundBtn.classList.remove('hidden');
  }

  // Once the round has started, offer a way back to the game screen
  if (gameState.allWordsRevealed) {
    dom.backToGameBtn.classList.remove('hidden');
  }
}


