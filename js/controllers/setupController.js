import { dom } from '../dom.js';
import { MAX_PLAYERS, MIN_PLAYERS } from '../constants.js';
import { gameState } from '../state.js';
import { setupRound } from '../game/setupRound.js';
import { showScreen } from '../ui/navigation.js';

export function generatePlayerInputs() {
  const count = getValidatedPlayerCount();
  dom.playerNamesDiv.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const playerInput = document.createElement('div');
    playerInput.className = 'player-input';
    playerInput.innerHTML = `
            <label for="player-${i}">Speler ${i + 1}:</label>
            <input type="text" placeholder="Naam" id="player-${i}" required>
        `;
    dom.playerNamesDiv.appendChild(playerInput);

    const input = /** @type {HTMLInputElement|null} */ (
      playerInput.querySelector(`#player-${i}`)
    );
    if (!input) continue;

    // Make tapping the row/label reliably focus the input (mobile-friendly)
    playerInput.addEventListener('click', (e) => {
      if (e.target !== input) input.focus();
    });

    // Keyboard UX: Enter moves to next input (or to Start button on last)
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const next = /** @type {HTMLInputElement|null} */ (
        document.getElementById(`player-${i + 1}`)
      );
      if (next) next.focus();
      else dom.startGameBtn.focus();
    });
  }
}

export function getValidatedPlayerCount() {
  const raw = parseInt(dom.playerCountInput.value, 10);
  const safe = Number.isFinite(raw) && raw > 0 ? raw : MIN_PLAYERS;
  const clamped = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, safe));
  if (String(clamped) !== String(dom.playerCountInput.value)) {
    dom.playerCountInput.value = String(clamped);
  }
  return clamped;
}

export function startGame() {
  const count = getValidatedPlayerCount();
  const players = [];

  // Validate player names
  for (let i = 0; i < count; i++) {
    const nameInput = document.getElementById(`player-${i}`);
    const name = nameInput.value.trim();
    if (!name) {
      alert('Vul alle speler namen in!');
      return;
    }
    players.push(name);
  }

  // Initialize game state
  gameState.players = players;
  gameState.hintMode = dom.hintModeCheckbox.checked;
  gameState.trolMode = dom.trolModeCheckbox.checked;
  gameState.currentRound = 1;
  gameState.currentPlayerIndex = 0;
  gameState.scores = {};
  gameState.allWordsRevealed = false;
  gameState.selectedWinners.clear();

  // Initialize scores
  players.forEach((player) => {
    gameState.scores[player] = 0;
  });

  // Start first round
  setupRound();
  showScreen('word');
}

export function toggleRules() {
  dom.rulesContent.classList.toggle('hidden');
  const isExpanded = !dom.rulesContent.classList.contains('hidden');
  dom.toggleRulesBtn.textContent = isExpanded
    ? '📖 Spelregels ▲'
    : '📖 Spelregels';
}


