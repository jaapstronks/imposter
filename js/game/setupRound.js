import { dutchWords } from '../data/dutchWords.js';
import { gameState } from '../state.js';

function shuffled(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sampleUniqueWords(count) {
  const pool = [...dutchWords];
  // Fisher–Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function pickRandomPlayers(count) {
  return shuffled(gameState.players).slice(0, count);
}

function pickRandomPlayer() {
  return gameState.players[Math.floor(Math.random() * gameState.players.length)];
}

function setAllButOneImposter() {
  gameState.trolAllButOneImposter = true;
  gameState.trolNonImposter = pickRandomPlayer();
  gameState.imposters = gameState.players.filter(
    (p) => p !== gameState.trolNonImposter
  );
}

function makeDistinctHints(baseHint, count) {
  // Keep it vague, but make each imposter see a *different* hint string.
  // We vary phrasing rather than changing the underlying association.
  const templates = [
    (h) => `Iets met: ${h}`,
    (h) => `Denk aan: ${h}`,
    (h) => `Je komt uit bij: ${h}`,
    (h) => `Vage link: ${h}`,
    (h) => `Bijzaak: ${h}`,
    (h) => `Detail: ${h}`,
    (h) => `Randding: ${h}`,
    (h) => `In de buurt van: ${h}`,
    (h) => `Associatie: ${h}`,
    (h) => `Kleine hint: ${h}`,
    (h) => `${h} (vaag)`,
  ];

  const variants = shuffled(templates)
    .slice(0, Math.max(1, count))
    .map((t) => t(baseHint));

  // Ensure we can always return `count` entries, even if count > templates.length.
  while (variants.length < count) {
    variants.push(`${baseHint} (${variants.length + 1})`);
  }

  return variants;
}

export function setupRound() {
  // Select random word
  const wordData = dutchWords[Math.floor(Math.random() * dutchWords.length)];
  gameState.currentWord = wordData.word;
  gameState.currentHint = wordData.hint;
  gameState.starterPlayer = '';
  gameState.gameStep = 'starter';
  gameState.trolAllDifferentWords = false;
  gameState.trolAllButOneImposter = false;
  gameState.trolNonImposter = '';
  gameState.playerWords = {};
  gameState.imposterHints = {};

  // Assign imposters based on mode
  const playerCount = gameState.players.length;
  gameState.imposters = [];

  if (gameState.trolMode) {
    // Troll mode rules:
    // - 2/3 of rounds: "regular" troll (mostly 1-2 imposters)
    // - 1/3 of rounds: "overboard" (3 imposters, 4 imposters, everyone, or everyone different word)

    const isOverboard = Math.random() < 1 / 3;

    if (isOverboard) {
      const overboardOptions = ['allDifferent', 'allButOneImposter', '3', '4'];
      const pick =
        overboardOptions[Math.floor(Math.random() * overboardOptions.length)];

      if (pick === 'allDifferent') {
        gameState.trolAllDifferentWords = true;
        const samples = sampleUniqueWords(playerCount);
        for (let i = 0; i < playerCount; i++) {
          gameState.playerWords[gameState.players[i]] = samples[i].word;
        }
        // Keep `imposters` empty for this twist
        gameState.currentWord = 'Iedereen had een ander woord';
        gameState.currentHint = '';
      } else if (pick === 'allButOneImposter') {
        setAllButOneImposter();
      } else {
        const requested = pick === '4' ? 4 : 3;
        const imposterCount = Math.min(requested, playerCount - 1);
        if (imposterCount >= playerCount - 1) {
          setAllButOneImposter();
        } else {
          gameState.imposters = pickRandomPlayers(imposterCount);
        }
      }
    } else {
      // Regular troll rounds: usually 1 imposter, sometimes 2.
      const imposterCount = Math.random() < 0.7 ? 1 : 2;
      gameState.imposters = pickRandomPlayers(Math.min(imposterCount, playerCount));
    }
  } else {
    // Normal mode: always exactly 1 imposter
    const randomIndex = Math.floor(Math.random() * gameState.players.length);
    gameState.imposters.push(gameState.players[randomIndex]);
  }

  // If there are multiple imposters (but not everyone), give each imposter a different hint.
  if (
    gameState.hintMode &&
    gameState.imposters.length > 1 &&
    gameState.imposters.length < gameState.players.length
  ) {
    const hints = makeDistinctHints(
      gameState.currentHint,
      gameState.imposters.length
    );
    for (let i = 0; i < gameState.imposters.length; i++) {
      gameState.imposterHints[gameState.imposters[i]] = hints[i];
    }
  }

  gameState.currentPlayerIndex = 0;
  gameState.allWordsRevealed = false;
}


