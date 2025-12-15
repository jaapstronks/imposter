// Game state
let gameState = {
  players: [],
  currentRound: 1,
  currentPlayerIndex: 0,
  hintMode: true,
  trolMode: false,
  imposters: [],
  currentWord: '',
  scores: {},
  gamePhase: 'setup', // setup, reveal, playing, scoring, ended
  allWordsRevealed: false,
  selectedWinners: new Set(), // Track multiple winners per round
};

// Dutch words database
const dutchWords = [
  // Everyday objects
  { word: 'tafel', hint: 'eten' },
  { word: 'stoel', hint: 'rust' },
  { word: 'lamp', hint: 'lezen' },
  { word: 'boek', hint: 'verhaal' },
  { word: 'pen', hint: 'gedachten' },
  { word: 'telefoon', hint: 'gesprek' },
  { word: 'computer', hint: 'werk' },
  { word: 'fiets', hint: 'milieu' },
  { word: 'auto', hint: 'reizen' },
  { word: 'sleutel', hint: 'toegang' },
  { word: 'tas', hint: 'meenemen' },
  { word: 'horloge', hint: 'punctueel' },
  { word: 'bril', hint: 'wazig' },
  { word: 'paraplu', hint: 'nat' },
  { word: 'spiegel', hint: 'uiterlijk' },

  // Food items
  { word: 'appel', hint: 'gezond' },
  { word: 'banaan', hint: 'potassium' },
  { word: 'brood', hint: 'ontbijt' },
  { word: 'kaas', hint: 'calcium' },
  { word: 'melk', hint: 'wit' },
  { word: 'pizza', hint: 'Italië' },
  { word: 'koffie', hint: 'wakker' },
  { word: 'thee', hint: 'ceremonie' },
  { word: 'chocolade', hint: 'troost' },
  { word: 'ijs', hint: 'koud' },
  { word: 'koekje', hint: 'zoet' },
  { word: 'vis', hint: 'omega' },
  { word: 'vlees', hint: 'eiwitten' },
  { word: 'salade', hint: 'dieet' },
  { word: 'soep', hint: 'warm' },

  // Animals
  { word: 'hond', hint: 'trouw' },
  { word: 'kat', hint: 'onafhankelijk' },
  { word: 'paard', hint: 'kracht' },
  { word: 'koe', hint: 'veld' },
  { word: 'varken', hint: 'slim' },
  { word: 'vogel', hint: 'vrijheid' },
  { word: 'vis', hint: 'stil' },
  { word: 'olifant', hint: 'geheugen' },
  { word: 'leeuw', hint: 'koning' },
  { word: 'tijger', hint: 'solo' },

  // Places/Names/Brands
  { word: 'Rotterdam', hint: 'haven' },
  { word: 'Amsterdam', hint: 'grachten' },
  { word: 'schermtijd', hint: 'ogen' },
  { word: 'Playstation', hint: 'controller' },

  // Activities/concepts
  { word: 'zwemmen', hint: 'fitness' },
  { word: 'lopen', hint: 'beweging' },
  { word: 'slapen', hint: 'rust' },
  { word: 'eten', hint: 'smaak' },
  { word: 'lezen', hint: 'ontsnapping' },
  { word: 'schrijven', hint: 'creativiteit' },
  { word: 'tekenen', hint: 'expressie' },
  { word: 'zingen', hint: 'emotie' },
  { word: 'dansen', hint: 'ritme' },
  { word: 'spelen', hint: 'plezier' },

  // Colors
  { word: 'rood', hint: 'passie' },
  { word: 'blauw', hint: 'kalm' },
  { word: 'groen', hint: 'hoop' },
  { word: 'geel', hint: 'vrolijk' },
  { word: 'paars', hint: 'mystiek' },
  { word: 'oranje', hint: 'energie' },
  { word: 'roze', hint: 'romantiek' },
  { word: 'zwart', hint: 'elegantie' },
  { word: 'wit', hint: 'puurheid' },

  // Dutch Culture & Traditions
  { word: 'Sinterklaas', hint: 'december' },
  { word: 'pepernoten', hint: 'kruidnootjes' },
  { word: 'stroopwafel', hint: 'siroop' },
  { word: 'hagelslag', hint: 'chocolate' },
  { word: 'poffertjes', hint: 'klein' },
  { word: 'oliebollen', hint: 'nieuwjaar' },
  { word: 'bitterballen', hint: 'kroket' },
  { word: 'drop', hint: 'zoet' },
  { word: 'Zwarte Piet', hint: 'roetveegpiet' },
  { word: 'tulpen', hint: 'bollenvelden' },

  // Household Items
  { word: 'pantoffels', hint: 'comfort' },
  { word: 'schoenveters', hint: 'verbinden' },
  { word: 'wc-papier', hint: 'zachtheid' },
  { word: 'tandenborstel', hint: 'routine' },
  { word: 'wasmachine', hint: 'schoon' },
  { word: 'stofzuiger', hint: 'stilte' },
  { word: 'magnetron', hint: 'snel' },
  { word: 'koelkast', hint: 'bewaren' },
  { word: 'waterkoker', hint: 'thee' },
  { word: 'afstandsbediening', hint: 'controle' },

  // Fun & Games
  { word: 'klappertjespistool', hint: 'knallen' },
  { word: 'waterpistool', hint: 'zomer' },
  { word: 'springtouw', hint: 'springen' },
  { word: 'voetbal', hint: 'trappen' },
  { word: 'monopoly', hint: 'bankroet' },
  { word: 'puzzel', hint: 'stukjes' },
  { word: 'lego', hint: 'blokjes' },
  { word: 'knikkerbaan', hint: 'rollen' },
  { word: 'glijbaan', hint: 'playground' },
  { word: 'schommel', hint: 'heen' },

  // Weather & Seasons
  { word: 'hagel', hint: 'ijsballetjes' },
  { word: 'mist', hint: 'damp' },
  { word: 'regenboog', hint: 'kleuren' },
  { word: 'onweer', hint: 'donder' },
  { word: 'sneeuwpop', hint: 'wortel' },
  { word: 'ijzel', hint: 'glad' },
  { word: 'zonneschijn', hint: 'warm' },
  { word: 'wolken', hint: 'grijs' },

  // Transportation
  { word: 'bromfiets', hint: 'puffen' },
  { word: 'skateboard', hint: 'wielen' },
  { word: 'step', hint: 'afzetten' },
  { word: 'bakfiets', hint: 'kinderen' },
  { word: 'vrachtwagen', hint: 'groot' },
  { word: 'ambulance', hint: 'sirene' },
  { word: 'brandweerauto', hint: 'ladder' },
  { word: 'helikopter', hint: 'propeller' },

  // Body Parts
  { word: 'elleboog', hint: 'buigen' },
  { word: 'knieën', hint: 'hurken' },
  { word: 'teenagels', hint: 'knippen' },
  { word: 'wimpers', hint: 'knipperen' },
  { word: 'kuiten', hint: 'spieren' },
  { word: 'schouders', hint: 'ophalen' },
  { word: 'polsen', hint: 'draaien' },

  // School & Work
  { word: 'puntenslijper', hint: 'scherp' },
  { word: 'gum', hint: 'wissen' },
  { word: 'meetlat', hint: 'centimeter' },
  { word: 'schoolbord', hint: 'krijt' },
  { word: 'pauze', hint: 'rust' },
  { word: 'huiswerk', hint: 'thuis' },
  { word: 'diploma', hint: 'geslaagd' },

  // Technology
  { word: 'toetsenbord', hint: 'communicatie' },
  { word: 'koptelefoon', hint: 'luisteren' },
  { word: 'webcam', hint: 'videobellen' },
  { word: 'usb', hint: 'overdragen' },
  { word: 'wifi', hint: 'verbinding' },
  { word: 'bluetooth', hint: 'paren' },

  // Random Fun Stuff
  { word: 'bellenblaas', hint: 'zeep' },
  { word: 'kauwgom', hint: 'kauwen' },
  { word: 'snorharen', hint: 'kat' },
  { word: 'schaduw', hint: 'donker' },
  { word: 'echo', hint: 'herhalen' },
  { word: 'knuffel', hint: 'zacht' },
  { word: 'nachtmerrie', hint: 'slapen' },
  { word: 'kietelaar', hint: 'lachen' },
];

// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const wordScreen = document.getElementById('word-screen');
const gameScreen = document.getElementById('game-screen');
const scoresScreen =
  document.getElementById('scores-screen');

// Setup elements
const toggleRulesBtn =
  document.getElementById('toggle-rules');
const rulesContent =
  document.getElementById('rules-content');
const hintModeCheckbox =
  document.getElementById('hint-mode');
const trolModeCheckbox =
  document.getElementById('trol-mode');
const playerCountInput =
  document.getElementById('player-count');
const playerNamesDiv =
  document.getElementById('player-names');
const startGameBtn = document.getElementById('start-game');

// Word reveal elements
const currentPlayerSpan = document.getElementById(
  'current-player'
);
const tapArea = document.getElementById('tap-area');
const wordReveal = document.getElementById('word-reveal');
const wordContent = document.getElementById('word-content');
const playerNavigation = document.getElementById(
  'player-navigation'
);
const backPlayerBtn =
  document.getElementById('back-player');
const nextPlayerBtn =
  document.getElementById('next-player');
const startRoundBtn =
  document.getElementById('start-round');

// Game elements
const roundNumberSpan =
  document.getElementById('round-number');
const gameWordSpan = document.getElementById('game-word');
const starterPlayerSpan = document.getElementById(
  'starter-player'
);
const starterPhase =
  document.getElementById('starter-phase');
const scoringPhase =
  document.getElementById('scoring-phase');
const revealScoringBtn = document.getElementById(
  'reveal-scoring'
);
const scoringOptions = document.getElementById(
  'scoring-options'
);
const nextRoundBtn = document.getElementById('next-round');
const endGameBtn = document.getElementById('end-game');

// Scores elements
const finalScores = document.getElementById('final-scores');
const newGameBtn = document.getElementById('new-game');

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
  setupEventListeners();
  generatePlayerInputs();
});

function setupEventListeners() {
  // Setup screen
  toggleRulesBtn.addEventListener('click', toggleRules);
  playerCountInput.addEventListener(
    'change',
    generatePlayerInputs
  );
  startGameBtn.addEventListener('click', startGame);

  // Word reveal screen
  tapArea.addEventListener('mousedown', showWord);
  tapArea.addEventListener('mouseup', hideWord);
  tapArea.addEventListener('mouseleave', hideWord);
  tapArea.addEventListener('touchstart', showWord);
  tapArea.addEventListener('touchend', hideWord);

  backPlayerBtn.addEventListener('click', backPlayer);
  nextPlayerBtn.addEventListener('click', nextPlayer);
  startRoundBtn.addEventListener('click', startRound);

  // Game screen
  revealScoringBtn.addEventListener('click', revealScoring);
  nextRoundBtn.addEventListener('click', nextRound);
  endGameBtn.addEventListener('click', endGame);

  // Scores screen
  newGameBtn.addEventListener('click', newGame);
}

function generatePlayerInputs() {
  const count = parseInt(playerCountInput.value);
  playerNamesDiv.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const playerInput = document.createElement('div');
    playerInput.className = 'player-input';
    playerInput.innerHTML = `
            <label>Speler ${i + 1}:</label>
            <input type="text" placeholder="Naam" id="player-${i}" required>
        `;
    playerNamesDiv.appendChild(playerInput);
  }
}

function startGame() {
  const count = parseInt(playerCountInput.value);
  const players = [];

  // Validate player names
  for (let i = 0; i < count; i++) {
    const nameInput = document.getElementById(
      `player-${i}`
    );
    const name = nameInput.value.trim();
    if (!name) {
      alert('Vul alle speler namen in!');
      return;
    }
    players.push(name);
  }

  // Initialize game state
  gameState.players = players;
  gameState.hintMode = hintModeCheckbox.checked;
  gameState.trolMode = trolModeCheckbox.checked;
  gameState.currentRound = 1;
  gameState.currentPlayerIndex = 0;
  gameState.scores = {};
  gameState.allWordsRevealed = false;

  // Initialize scores
  players.forEach((player) => {
    gameState.scores[player] = 0;
  });

  // Start first round
  setupRound();
  showScreen('word');
}

function setupRound() {
  // Select random word
  const wordData =
    dutchWords[
      Math.floor(Math.random() * dutchWords.length)
    ];
  gameState.currentWord = wordData.word;
  gameState.currentHint = wordData.hint;

  // Assign imposters based on mode
  const playerCount = gameState.players.length;
  gameState.imposters = [];

  if (gameState.trolMode) {
    // Trol mode: random number of imposters (0 to all players)
    const possibilities = [];

    // Add possibility of 0 imposters (10% chance)
    for (let i = 0; i < 1; i++) possibilities.push(0);

    // Add possibilities of 1 to all imposters
    for (let count = 1; count <= playerCount; count++) {
      const weight = count === 1 ? 4 : count === 2 ? 2 : 1; // Favor 1-2 imposters
      for (let w = 0; w < weight; w++)
        possibilities.push(count);
    }

    const imposterCount =
      possibilities[
        Math.floor(Math.random() * possibilities.length)
      ];

    if (imposterCount > 0) {
      const availablePlayers = [...gameState.players];
      for (let i = 0; i < imposterCount; i++) {
        const randomIndex = Math.floor(
          Math.random() * availablePlayers.length
        );
        const imposter = availablePlayers.splice(
          randomIndex,
          1
        )[0];
        gameState.imposters.push(imposter);
      }
    }
  } else {
    // Normal mode: always exactly 1 imposter
    const randomIndex = Math.floor(
      Math.random() * gameState.players.length
    );
    gameState.imposters.push(
      gameState.players[randomIndex]
    );
  }

  gameState.currentPlayerIndex = 0;
  gameState.allWordsRevealed = false;
}

function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
  });

  switch (screenName) {
    case 'setup':
      setupScreen.classList.add('active');
      break;
    case 'word':
      wordScreen.classList.add('active');
      updateCurrentPlayer();
      break;
    case 'game':
      gameScreen.classList.add('active');
      updateGameScreen();
      break;
    case 'scores':
      scoresScreen.classList.add('active');
      updateScoresScreen();
      break;
  }
}

function updateCurrentPlayer() {
  const currentPlayer =
    gameState.players[gameState.currentPlayerIndex];
  currentPlayerSpan.textContent = currentPlayer;

  // Reset tap area
  tapArea.classList.remove('pressed');
  wordReveal.classList.add('hidden');
  playerNavigation.classList.add('hidden');
  startRoundBtn.classList.add('hidden');

  // Reset next player button visibility (fix for second round bug)
  nextPlayerBtn.style.display = '';

  // Show appropriate navigation
  if (
    gameState.currentPlayerIndex <
    gameState.players.length - 1
  ) {
    // More players to go - show navigation with back button
    playerNavigation.classList.remove('hidden');
    backPlayerBtn.disabled =
      gameState.currentPlayerIndex === 0;
  } else if (!gameState.allWordsRevealed) {
    // Last player, show start round button
    startRoundBtn.classList.remove('hidden');
    // Also show back button for last player
    playerNavigation.classList.remove('hidden');
    backPlayerBtn.disabled = false;
    nextPlayerBtn.style.display = 'none';
  }
}

function showWord(e) {
  e.preventDefault();
  tapArea.classList.add('pressed');
  wordReveal.classList.remove('hidden');

  const currentPlayer =
    gameState.players[gameState.currentPlayerIndex];
  const isImposter =
    gameState.imposters.includes(currentPlayer);

  if (isImposter) {
    if (gameState.hintMode) {
      wordContent.innerHTML = `<div class="imposter">Je bent de IMPOSTER!<br><br>Hint: ${gameState.currentHint}</div>`;
    } else {
      wordContent.innerHTML = `<div class="imposter">Je bent de IMPOSTER!</div>`;
    }
  } else {
    // Check if there are no imposters in trol mode
    if (gameState.imposters.length === 0) {
      wordContent.innerHTML = `<div class="regular">${gameState.currentWord}<br><br><small>(Geen imposters deze ronde!)</small></div>`;
    } else {
      wordContent.innerHTML = `<div class="regular">${gameState.currentWord}</div>`;
    }
  }
}

function hideWord(e) {
  e.preventDefault();
  tapArea.classList.remove('pressed');
  wordReveal.classList.add('hidden');
}

function backPlayer() {
  if (gameState.currentPlayerIndex > 0) {
    gameState.currentPlayerIndex--;
    updateCurrentPlayer();

    // Reset start round button if we were at the last player
    if (
      gameState.currentPlayerIndex <
      gameState.players.length - 1
    ) {
      nextPlayerBtn.style.display = '';
    }
  }
}

function nextPlayer() {
  if (
    gameState.currentPlayerIndex <
    gameState.players.length - 1
  ) {
    gameState.currentPlayerIndex++;
    updateCurrentPlayer();
  }
}

function startRound() {
  gameState.allWordsRevealed = true;
  showScreen('game');
}

function updateGameScreen() {
  roundNumberSpan.textContent = gameState.currentRound;
  gameWordSpan.textContent = gameState.currentWord;

  // Select random starter
  const randomPlayer =
    gameState.players[
      Math.floor(Math.random() * gameState.players.length)
    ];
  starterPlayerSpan.textContent = randomPlayer;

  // Show starter phase, hide scoring phase
  starterPhase.classList.remove('hidden');
  scoringPhase.classList.add('hidden');

  // Generate scoring options (but don't show yet)
  generateScoringOptions();
}

function generateScoringOptions() {
  scoringOptions.innerHTML = '';

  if (gameState.imposters.length === 0) {
    // No imposters - all players get points if they realize this
    gameState.players.forEach((player) => {
      const playerWin = document.createElement('div');
      playerWin.className = 'score-btn';
      playerWin.innerHTML = `${player} begreep dat er geen imposters waren`;
      playerWin.addEventListener('click', () =>
        toggleScoring(playerWin, 'player', player)
      );
      scoringOptions.appendChild(playerWin);
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
    scoringOptions.appendChild(impostersWin);

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
    scoringOptions.appendChild(impostersGuessed);

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
        scoringOptions.appendChild(playerWin);
      }
    });
  }
}

function toggleScoring(btn, type, player = null) {
  if (type === 'imposters') {
    // Imposters winning is exclusive - clear all other selections
    document
      .querySelectorAll('.score-btn')
      .forEach((button) => {
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
    const impostersBtn =
      document.querySelector('.score-btn');
    if (
      impostersBtn &&
      impostersBtn.classList.contains('selected')
    ) {
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

function revealScoring() {
  // Hide starter phase, show scoring phase
  starterPhase.classList.add('hidden');
  scoringPhase.classList.remove('hidden');
}

function nextRound() {
  // Award points to all selected winners
  gameState.selectedWinners.forEach((winner) => {
    gameState.scores[winner]++;
  });

  // Clear selections for next round
  gameState.selectedWinners.clear();

  // Setup next round
  gameState.currentRound++;
  setupRound();
  showScreen('word');
}

function endGame() {
  showScreen('scores');
}

function updateScoresScreen() {
  finalScores.innerHTML = '';

  // Sort players by score
  const sortedPlayers = Object.entries(
    gameState.scores
  ).sort(([, a], [, b]) => b - a);

  const maxScore = Math.max(
    ...Object.values(gameState.scores)
  );

  sortedPlayers.forEach(([player, score]) => {
    const scoreItem = document.createElement('div');
    scoreItem.className = 'score-item';
    if (score === maxScore) {
      scoreItem.classList.add('winner');
    }
    scoreItem.innerHTML = `<span>${player}</span><span>${score} punten</span>`;
    finalScores.appendChild(scoreItem);
  });
}

function toggleRules() {
  rulesContent.classList.toggle('hidden');
  const isExpanded =
    !rulesContent.classList.contains('hidden');
  toggleRulesBtn.textContent = isExpanded
    ? '📖 Spelregels ▲'
    : '📖 Spelregels';
}

function newGame() {
  // Reset game state
  gameState = {
    players: [],
    currentRound: 1,
    currentPlayerIndex: 0,
    hintMode: true,
    trolMode: false,
    imposters: [],
    currentWord: '',
    scores: {},
    gamePhase: 'setup',
    allWordsRevealed: false,
    selectedWinners: new Set(),
  };

  showScreen('setup');
}

// Prevent context menu on long press
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
