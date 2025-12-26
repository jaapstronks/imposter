import { dutchWords } from '../data/dutchWords.js';
import { gameState } from '../state.js';

function sampleUniqueWords(count) {
  const pool = [...dutchWords];
  // Fisher–Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function setupRound() {
  // Select random word
  const wordData = dutchWords[Math.floor(Math.random() * dutchWords.length)];
  gameState.currentWord = wordData.word;
  gameState.currentHint = wordData.hint;
  gameState.starterPlayer = '';
  gameState.gameStep = 'starter';
  gameState.trolAllDifferentWords = false;
  gameState.playerWords = {};

  // Assign imposters based on mode
  const playerCount = gameState.players.length;
  gameState.imposters = [];

  if (gameState.trolMode) {
    // 1 in 3 rounds: everyone has a different word (no imposters)
    if (Math.random() < 1 / 3) {
      gameState.trolAllDifferentWords = true;
      const samples = sampleUniqueWords(playerCount);
      for (let i = 0; i < playerCount; i++) {
        gameState.playerWords[gameState.players[i]] = samples[i].word;
      }
      // Keep `imposters` empty for this twist
      gameState.currentWord = 'Iedereen had een ander woord';
      gameState.currentHint = '';
    } else {
    // Trol mode: random number of imposters (0 to all players)
    const possibilities = [];

    // Add possibility of 0 imposters (10% chance)
    for (let i = 0; i < 1; i++) possibilities.push(0);

    // Add possibilities of 1 to all imposters
    for (let count = 1; count <= playerCount; count++) {
      const weight = count === 1 ? 4 : count === 2 ? 2 : 1; // Favor 1-2 imposters
      for (let w = 0; w < weight; w++) possibilities.push(count);
    }

    const imposterCount =
      possibilities[Math.floor(Math.random() * possibilities.length)];

    if (imposterCount > 0) {
      const availablePlayers = [...gameState.players];
      for (let i = 0; i < imposterCount; i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length);
        const imposter = availablePlayers.splice(randomIndex, 1)[0];
        gameState.imposters.push(imposter);
      }
    }
    }
  } else {
    // Normal mode: always exactly 1 imposter
    const randomIndex = Math.floor(Math.random() * gameState.players.length);
    gameState.imposters.push(gameState.players[randomIndex]);
  }

  gameState.currentPlayerIndex = 0;
  gameState.allWordsRevealed = false;
}


