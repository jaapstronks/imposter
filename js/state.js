export function createInitialGameState() {
  return {
    players: [],
    currentRound: 1,
    currentPlayerIndex: 0,
    hintMode: true,
    trolMode: false,
    imposters: [],
    currentWord: '',
    currentHint: '',
    scores: {},
    gamePhase: 'setup', // setup, reveal, playing, scoring, ended
    allWordsRevealed: false,
    selectedWinners: new Set(), // Track multiple winners per round
  };
}

// Live binding; modules importing this will see updates after reassignment.
export let gameState = createInitialGameState();

export function resetGameState() {
  gameState = createInitialGameState();
}


