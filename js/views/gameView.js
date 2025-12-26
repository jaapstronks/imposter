import { dom } from '../dom.js';
import { gameState } from '../state.js';
import { toggleScoring } from '../controllers/gameScoring.js';

export function renderGameScreen() {
  dom.roundNumberSpan.textContent = gameState.currentRound;
  dom.gameWordSpan.textContent = gameState.currentWord;

  // Select random starter (stable for the round, even if you go back and forth)
  if (!gameState.starterPlayer) {
    gameState.starterPlayer =
      gameState.players[Math.floor(Math.random() * gameState.players.length)];
  }
  dom.starterPlayerSpan.textContent = gameState.starterPlayer;

  // Show starter vs scoring phase based on state (so going back/forth doesn't reset)
  if (gameState.gameStep === 'scoring') {
    dom.starterPhase.classList.add('hidden');
    dom.scoringPhase.classList.remove('hidden');
  } else {
    dom.starterPhase.classList.remove('hidden');
    dom.scoringPhase.classList.add('hidden');
  }

  // Generate scoring options (but don't show yet)
  renderScoringOptions();
}

function renderScoringOptions() {
  dom.scoringOptions.innerHTML = '';

  if (gameState.imposters.length === 0) {
    // No imposters - all players get points if they realize this
    gameState.players.forEach((player) => {
      const playerWin = document.createElement('div');
      playerWin.className = 'score-btn';
      playerWin.innerHTML = `${player} begreep dat er geen imposters waren`;
      playerWin.addEventListener('click', () =>
        toggleScoring(playerWin, 'player', player)
      );
      dom.scoringOptions.appendChild(playerWin);
    });
  } else {
    // Normal scoring with imposters
    const impostersWin = document.createElement('div');
    impostersWin.className = 'score-btn';
    if (gameState.imposters.length === 1) {
      impostersWin.innerHTML = `Imposter wint: ${gameState.imposters[0]} (niet ontdekt)`;
    } else {
      impostersWin.innerHTML = `Imposters winnen: ${gameState.imposters.join(
        ', '
      )} (niet ontdekt)`;
    }
    impostersWin.addEventListener('click', () =>
      toggleScoring(impostersWin, 'imposters')
    );
    dom.scoringOptions.appendChild(impostersWin);

    // Add option for imposter declaring themselves and guessing word
    const impostersGuessed = document.createElement('div');
    impostersGuessed.className = 'score-btn';
    if (gameState.imposters.length === 1) {
      impostersGuessed.innerHTML = `Imposter wint: ${gameState.imposters[0]} (bekende zichzelf & raadde woord)`;
    } else {
      impostersGuessed.innerHTML = `Imposters winnen: ${gameState.imposters.join(
        ', '
      )} (bekenden zichzelf & raadden woord)`;
    }
    impostersGuessed.addEventListener('click', () =>
      toggleScoring(impostersGuessed, 'imposters')
    );
    dom.scoringOptions.appendChild(impostersGuessed);

    // Options for each regular player
    gameState.players.forEach((player) => {
      if (!gameState.imposters.includes(player)) {
        const playerWin = document.createElement('div');
        playerWin.className = 'score-btn';
        if (gameState.imposters.length === 1) {
          playerWin.innerHTML = `${player} raadde de imposter`;
        } else {
          playerWin.innerHTML = `${player} raadde de imposters`;
        }
        playerWin.addEventListener('click', () =>
          toggleScoring(playerWin, 'player', player)
        );
        dom.scoringOptions.appendChild(playerWin);
      }
    });
  }
}


