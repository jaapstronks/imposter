// Game state
let gameState = {
    players: [],
    currentRound: 1,
    currentPlayerIndex: 0,
    hintMode: true,
    imposters: [],
    currentWord: '',
    scores: {},
    gamePhase: 'setup', // setup, reveal, playing, scoring, ended
    allWordsRevealed: false,
    selectedWinners: new Set() // Track multiple winners per round
};

// Dutch words database
const dutchWords = [
    // Everyday objects
    { word: 'tafel', hint: 'meubelstuk' },
    { word: 'stoel', hint: 'zitmeubel' },
    { word: 'lamp', hint: 'verlichting' },
    { word: 'boek', hint: 'te lezen' },
    { word: 'pen', hint: 'schrijfgereedschap' },
    { word: 'telefoon', hint: 'communicatie' },
    { word: 'computer', hint: 'technologie' },
    { word: 'fiets', hint: 'vervoermiddel' },
    { word: 'auto', hint: 'voertuig' },
    { word: 'sleutel', hint: 'opent deuren' },
    { word: 'tas', hint: 'draagbaar' },
    { word: 'horloge', hint: 'tijd' },
    { word: 'bril', hint: 'zicht' },
    { word: 'paraplu', hint: 'regen' },
    { word: 'spiegel', hint: 'reflectie' },
    
    // Food items
    { word: 'appel', hint: 'fruit' },
    { word: 'banaan', hint: 'geel fruit' },
    { word: 'brood', hint: 'bakkerijproduct' },
    { word: 'kaas', hint: 'zuivelproduct' },
    { word: 'melk', hint: 'wit drankje' },
    { word: 'pizza', hint: 'Italiaans' },
    { word: 'koffie', hint: 'warme drank' },
    { word: 'thee', hint: 'warme drank' },
    { word: 'chocolade', hint: 'zoet' },
    { word: 'ijs', hint: 'koud dessert' },
    { word: 'koekje', hint: 'zoete snack' },
    { word: 'vis', hint: 'zwemt' },
    { word: 'vlees', hint: 'van dieren' },
    { word: 'salade', hint: 'gezond' },
    { word: 'soep', hint: 'warme maaltijd' },
    
    // Animals
    { word: 'hond', hint: 'trouw dier' },
    { word: 'kat', hint: 'miauwd' },
    { word: 'paard', hint: 'groot dier' },
    { word: 'koe', hint: 'geeft melk' },
    { word: 'varken', hint: 'roze dier' },
    { word: 'vogel', hint: 'vliegt' },
    { word: 'vis', hint: 'zwemt' },
    { word: 'olifant', hint: 'groot en grijs' },
    { word: 'leeuw', hint: 'koning van jungle' },
    { word: 'tijger', hint: 'gestreept' },
    
    // Well-known artists/people
    { word: 'Rembrandt', hint: 'Nederlandse schilder' },
    { word: 'Van Gogh', hint: 'schilder met één oor' },
    { word: 'Picasso', hint: 'kubistische schilder' },
    { word: 'Mozart', hint: 'klassieke componist' },
    { word: 'Beatles', hint: 'Britse band' },
    { word: 'Einstein', hint: 'slimme wetenschapper' },
    { word: 'Napoleon', hint: 'Franse keizer' },
    
    // Activities/concepts
    { word: 'zwemmen', hint: 'in water' },
    { word: 'lopen', hint: 'beweging' },
    { word: 'slapen', hint: 'rust' },
    { word: 'eten', hint: 'voeding' },
    { word: 'lezen', hint: 'boeken' },
    { word: 'schrijven', hint: 'tekst maken' },
    { word: 'tekenen', hint: 'kunst maken' },
    { word: 'zingen', hint: 'muziek maken' },
    { word: 'dansen', hint: 'beweging op muziek' },
    { word: 'spelen', hint: 'plezier hebben' },
    
    // Colors
    { word: 'rood', hint: 'kleur' },
    { word: 'blauw', hint: 'kleur van lucht' },
    { word: 'groen', hint: 'kleur van gras' },
    { word: 'geel', hint: 'kleur van zon' },
    { word: 'paars', hint: 'gemengde kleur' },
    { word: 'oranje', hint: 'kleur van fruit' },
    { word: 'roze', hint: 'lichte kleur' },
    { word: 'zwart', hint: 'donkerste kleur' },
    { word: 'wit', hint: 'lichtste kleur' }
];

// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const wordScreen = document.getElementById('word-screen');
const gameScreen = document.getElementById('game-screen');
const scoresScreen = document.getElementById('scores-screen');

// Setup elements
const hintModeCheckbox = document.getElementById('hint-mode');
const playerCountInput = document.getElementById('player-count');
const playerNamesDiv = document.getElementById('player-names');
const startGameBtn = document.getElementById('start-game');

// Word reveal elements
const currentPlayerSpan = document.getElementById('current-player');
const tapArea = document.getElementById('tap-area');
const wordReveal = document.getElementById('word-reveal');
const wordContent = document.getElementById('word-content');
const nextPlayerBtn = document.getElementById('next-player');
const startRoundBtn = document.getElementById('start-round');

// Game elements
const roundNumberSpan = document.getElementById('round-number');
const gameWordSpan = document.getElementById('game-word');
const starterPlayerSpan = document.getElementById('starter-player');
const scoringOptions = document.getElementById('scoring-options');
const nextRoundBtn = document.getElementById('next-round');
const endGameBtn = document.getElementById('end-game');

// Scores elements
const finalScores = document.getElementById('final-scores');
const newGameBtn = document.getElementById('new-game');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    generatePlayerInputs();
});

function setupEventListeners() {
    // Setup screen
    playerCountInput.addEventListener('change', generatePlayerInputs);
    startGameBtn.addEventListener('click', startGame);
    
    // Word reveal screen
    tapArea.addEventListener('mousedown', showWord);
    tapArea.addEventListener('mouseup', hideWord);
    tapArea.addEventListener('mouseleave', hideWord);
    tapArea.addEventListener('touchstart', showWord);
    tapArea.addEventListener('touchend', hideWord);
    
    nextPlayerBtn.addEventListener('click', nextPlayer);
    startRoundBtn.addEventListener('click', startRound);
    
    // Game screen
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
    gameState.hintMode = hintModeCheckbox.checked;
    gameState.currentRound = 1;
    gameState.currentPlayerIndex = 0;
    gameState.scores = {};
    gameState.allWordsRevealed = false;
    
    // Initialize scores
    players.forEach(player => {
        gameState.scores[player] = 0;
    });
    
    // Start first round
    setupRound();
    showScreen('word');
}

function setupRound() {
    // Select random word
    const wordData = dutchWords[Math.floor(Math.random() * dutchWords.length)];
    gameState.currentWord = wordData.word;
    gameState.currentHint = wordData.hint;
    
    // Assign imposters (usually 1, occasionally 2)
    const playerCount = gameState.players.length;
    let imposterCount = 1;
    
    // 20% chance of 2 imposters if 5+ players
    if (playerCount >= 5 && Math.random() < 0.2) {
        imposterCount = 2;
    }
    
    // Select random imposters
    gameState.imposters = [];
    const availablePlayers = [...gameState.players];
    
    for (let i = 0; i < imposterCount; i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length);
        const imposter = availablePlayers.splice(randomIndex, 1)[0];
        gameState.imposters.push(imposter);
    }
    
    gameState.currentPlayerIndex = 0;
    gameState.allWordsRevealed = false;
}

function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    switch(screenName) {
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
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    currentPlayerSpan.textContent = currentPlayer;
    
    // Reset tap area
    tapArea.classList.remove('pressed');
    wordReveal.classList.add('hidden');
    nextPlayerBtn.classList.add('hidden');
    startRoundBtn.classList.add('hidden');
    
    // Show appropriate button
    if (gameState.currentPlayerIndex < gameState.players.length - 1) {
        // More players to go
        nextPlayerBtn.classList.remove('hidden');
    } else if (!gameState.allWordsRevealed) {
        // Last player, show start round button
        startRoundBtn.classList.remove('hidden');
    }
}

function showWord(e) {
    e.preventDefault();
    tapArea.classList.add('pressed');
    wordReveal.classList.remove('hidden');
    
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const isImposter = gameState.imposters.includes(currentPlayer);
    
    if (isImposter) {
        if (gameState.hintMode) {
            wordContent.innerHTML = `<div class="imposter">Je bent de IMPOSTER!<br><br>Hint: ${gameState.currentHint}</div>`;
        } else {
            wordContent.innerHTML = `<div class="imposter">Je bent de IMPOSTER!</div>`;
        }
    } else {
        wordContent.innerHTML = `<div class="regular">${gameState.currentWord}</div>`;
    }
}

function hideWord(e) {
    e.preventDefault();
    tapArea.classList.remove('pressed');
    wordReveal.classList.add('hidden');
}

function nextPlayer() {
    gameState.currentPlayerIndex++;
    updateCurrentPlayer();
}

function startRound() {
    gameState.allWordsRevealed = true;
    showScreen('game');
}

function updateGameScreen() {
    roundNumberSpan.textContent = gameState.currentRound;
    gameWordSpan.textContent = gameState.currentWord;
    
    // Select random starter
    const randomPlayer = gameState.players[Math.floor(Math.random() * gameState.players.length)];
    starterPlayerSpan.textContent = randomPlayer;
    
    // Generate scoring options
    generateScoringOptions();
}

function generateScoringOptions() {
    scoringOptions.innerHTML = '';
    
    // Option for imposters winning
    const impostersWin = document.createElement('div');
    impostersWin.className = 'score-btn';
    impostersWin.innerHTML = `Imposter(s) winnen: ${gameState.imposters.join(', ')}`;
    impostersWin.addEventListener('click', () => toggleScoring(impostersWin, 'imposters'));
    scoringOptions.appendChild(impostersWin);
    
    // Options for each regular player
    gameState.players.forEach(player => {
        if (!gameState.imposters.includes(player)) {
            const playerWin = document.createElement('div');
            playerWin.className = 'score-btn';
            playerWin.innerHTML = `${player} raadde correct`;
            playerWin.addEventListener('click', () => toggleScoring(playerWin, 'player', player));
            scoringOptions.appendChild(playerWin);
        }
    });
}

function toggleScoring(btn, type, player = null) {
    if (type === 'imposters') {
        // Imposters winning is exclusive - clear all other selections
        document.querySelectorAll('.score-btn').forEach(button => {
            button.classList.remove('selected');
        });
        gameState.selectedWinners.clear();
        
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected');
        } else {
            btn.classList.add('selected');
            gameState.imposters.forEach(imposter => {
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

function nextRound() {
    // Award points to all selected winners
    gameState.selectedWinners.forEach(winner => {
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
    const sortedPlayers = Object.entries(gameState.scores)
        .sort(([,a], [,b]) => b - a);
    
    const maxScore = Math.max(...Object.values(gameState.scores));
    
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

function newGame() {
    // Reset game state
    gameState = {
        players: [],
        currentRound: 1,
        currentPlayerIndex: 0,
        hintMode: true,
        imposters: [],
        currentWord: '',
        scores: {},
        gamePhase: 'setup',
        allWordsRevealed: false,
        selectedWinners: new Set()
    };
    
    showScreen('setup');
}

// Prevent context menu on long press
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});