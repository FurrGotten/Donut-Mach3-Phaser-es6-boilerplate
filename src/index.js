import * as WebFont from 'webfontloader';

import mainMenuState from 'states/mainMenuState.js';
import gamePlatformState from 'states/gamePlatformState.js';
import endGameStateWin from 'states/endGameStateWin.js';
import endGameStateLose from 'states/endGameStateLose.js';
class Game extends Phaser.Game {

	constructor() {
		super(1280, 1150, Phaser.AUTO, 'content', null);
		WebFont.load({
			google: {
				families: ['Fredoka One']
			}
		});
		this.state.add('mainMenuState', mainMenuState, false);
		this.state.add('gamePlatformState', gamePlatformState, false);
		this.state.add('endGameStateWin', endGameStateWin, false);
		this.state.add('endGameStateLose', endGameStateLose, false);
		this.state.start('mainMenuState');
	}

}

new Game();
