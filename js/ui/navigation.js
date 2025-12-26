import { dom } from '../dom.js';
import { renderWordScreen } from '../views/wordView.js';
import { renderGameScreen } from '../views/gameView.js';
import { renderScoresScreen } from '../views/scoresView.js';

export function showScreen(screenName) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
  });

  switch (screenName) {
    case 'setup':
      dom.setupScreen.classList.add('active');
      break;
    case 'word':
      dom.wordScreen.classList.add('active');
      renderWordScreen();
      break;
    case 'game':
      dom.gameScreen.classList.add('active');
      renderGameScreen();
      break;
    case 'scores':
      dom.scoresScreen.classList.add('active');
      renderScoresScreen();
      break;
  }
}


