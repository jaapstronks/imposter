import { dom } from '../dom.js';
import { gameState } from '../state.js';

export function showRoundSummaryModal() {
  dom.roundSummaryScores.innerHTML = '';

  // Sort players by score
  const sortedPlayers = Object.entries(gameState.scores).sort(
    ([, a], [, b]) => b - a
  );

  const maxScore = Math.max(...Object.values(gameState.scores));

  sortedPlayers.forEach(([player, score]) => {
    const scoreItem = document.createElement('div');
    scoreItem.className = 'score-item';
    if (score === maxScore) {
      scoreItem.classList.add('winner');
    }
    scoreItem.innerHTML = `<span>${player}</span><span>${score} punten</span>`;
    dom.roundSummaryScores.appendChild(scoreItem);
  });

  dom.roundSummaryModal.classList.remove('hidden');
}

export function hideRoundSummaryModal() {
  dom.roundSummaryModal.classList.add('hidden');
}


