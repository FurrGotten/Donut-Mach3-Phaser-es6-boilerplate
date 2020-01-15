import * as WebFont from 'webfontloader';
import MainMenuState from 'states/MainMenuState.js';
import GamePlatformState from 'states/GamePlatformState.js';
import EndGameStateWin from 'states/EndGameStateWin.js';
import EndGameStateLose from 'states/EndGameStateLose.js';
import TutorialState from 'states/TutorialState.js';

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
        this.state.add('TutorialState', TutorialState, false);
        switch (sessionStorage.getItem('curState')) {
            case 'GamePlatformState':
                this.state.start('GamePlatformState');
                break;
            case 'EndGameStateWin':
                this.state.start('EndGameStateWin');
                break;
            case 'EndGameStateLose':
                this.state.start('EndGameStateLose');
                break;
            case 'TutorialState':
                this.state.start('TutorialState');
                break;
            default:
                this.state.start('MainMenuState');
        }
    }
}

new Game();
