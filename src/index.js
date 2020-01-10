import * as WebFont from 'webfontloader';

import GameState from 'states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(500, 500, Phaser.AUTO, 'content', null);
		WebFont.load({
			google: {
				families: ['Fredoka One']
			}
		});
		this.state.add('GameState', GameState, false);
		this.state.start('GameState');
	}

}

new Game();
