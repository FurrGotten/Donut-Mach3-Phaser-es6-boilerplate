import * as WebFont from 'webfontloader';

import MainMenuState from 'states/mainMenuState.js';
import GamePlatformState from 'states/gamePlatformState.js';
import EndGameStateWin from 'states/endGameStateWin.js';
import EndGameStateLose from 'states/endGameStateLose.js';
class Game extends Phaser.Game {

	constructor() {
		super(1090, 1100, Phaser.AUTO, 'content', null);
		WebFont.load({
			google: {
				families: ['Fredoka One']
			}
		});
		this.state.add('MainMenuState', MainMenuState, false);
		this.state.add('GamePlatformState', GamePlatformState, false);
		this.state.add('EndGameStateWin', EndGameStateWin, false);
		this.state.add('EndGameStateLose', EndGameStateLose, false);
		this.state.start('MainMenuState');
	}

}

new Game();
