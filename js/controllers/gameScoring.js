import { gameState } from '../state.js';

export function toggleScoring(btn, type, player = null) {
  if (type === 'imposters') {
    // Imposters winning is exclusive - clear all other selections
    document.querySelectorAll('.score-btn').forEach((button) => {
      button.classList.remove('selected');
    });
    gameState.selectedWinners.clear();

    if (btn.classList.contains('selected')) {
      btn.classList.remove('selected');
    } else {
      btn.classList.add('selected');
      gameState.imposters.forEach((imposter) => {
        gameState.selectedWinners.add(imposter);
      });
    }
  } else {
    // Player selection - first clear imposters if selected
    const impostersBtn = document.querySelector('.score-btn');
    if (impostersBtn && impostersBtn.classList.contains('selected')) {
      impostersBtn.classList.remove('selected');
      gameState.selectedWinners.clear();
    }

    // Toggle this player
    if (btn.classList.contains('selected')) {
      btn.classList.remove('selected');
      gameState.selectedWinners.delete(player);
    } else {
      btn.classList.add('selected');
      gameState.selectedWinners.add(player);
    }
  }
}


