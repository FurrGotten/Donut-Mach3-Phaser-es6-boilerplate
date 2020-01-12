import {centerX, centerY} from "./common";


class GamePlatformState extends Phaser.State {
    preload() {
        this.load.image('background', 'assets/images/backgrounds/background.jpg');
        this.load.image('scoreTable', 'assets/images/bg-score.png');
        this.load.image('gem-01', 'assets/images/game/gem-01.png');
        this.load.image('gem-02', 'assets/images/game/gem-02.png');
        this.load.image('gem-03', 'assets/images/game/gem-03.png');
        this.load.image('gem-04', 'assets/images/game/gem-04.png');
        this.load.image('gem-05', 'assets/images/game/gem-05.png');
        this.load.image('gem-06', 'assets/images/game/gem-06.png');
        this.load.image('gem-07', 'assets/images/game/gem-07.png');
        this.load.image('gem-08', 'assets/images/game/gem-08.png');
        this.load.image('gem-09', 'assets/images/game/gem-09.png');
        this.load.image('gem-10', 'assets/images/game/gem-10.png');
        this.load.image('gem-11', 'assets/images/game/gem-11.png');
        this.load.image('gem-12', 'assets/images/game/gem-12.png');
        this.load.image('hand', 'assets/images/game/hand.png');
    }
    create() {
        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 190, 'background');
        let scoreTable = this.add.sprite( centerX - 200, 10, 'scoreTable');
        scoreTable.anchor.setTo(0.5, 0);
        this.time.events.add(Phaser.Timer.SECOND * 5, lose, this);
    }
    update() {
    }
    render() {
    }
}
function lose() {
    this.state.start('EndGameStateLose');
}
export default GamePlatformState;
