import { dom } from '../dom.js';
import { gameState } from '../state.js';

export function renderWordScreen() {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  dom.currentPlayerSpan.textContent = currentPlayer;

  // Reset tap area
  dom.tapArea.classList.remove('pressed');
  dom.wordReveal.classList.add('hidden');
  dom.playerNavigation.classList.add('hidden');
  dom.startRoundBtn.classList.add('hidden');

  // Reset next player button visibility (fix for second round bug)
  dom.nextPlayerBtn.style.display = '';

  // Show appropriate navigation
  if (gameState.currentPlayerIndex < gameState.players.length - 1) {
    // More players to go - show navigation with back button
    dom.playerNavigation.classList.remove('hidden');
    dom.backPlayerBtn.disabled = gameState.currentPlayerIndex === 0;
  } else if (!gameState.allWordsRevealed) {
    // Last player, show start round button
    dom.startRoundBtn.classList.remove('hidden');
    // Also show back button for last player
    dom.playerNavigation.classList.remove('hidden');
    dom.backPlayerBtn.disabled = false;
    dom.nextPlayerBtn.style.display = 'none';
  }
}


