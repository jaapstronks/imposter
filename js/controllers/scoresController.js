import { resetGameState } from '../state.js';
import { showScreen } from '../ui/navigation.js';

export function newGame() {
  resetGameState();
  showScreen('setup');
}


