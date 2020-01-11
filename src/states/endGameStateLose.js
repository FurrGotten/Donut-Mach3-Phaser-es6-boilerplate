import {centerX, centerY} from "./common";


class endGameStateLose extends Phaser.State {
	preload() {
		this.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.load.image('loseText', 'assets/images/text-timeup.png');
	}
	create() {
        this.stage.backgroundColor = '#bbb980';
        let backgroundImage = this.add.sprite(0, 190, 'background');
		let loseText = this.add.sprite(centerX, centerY, 'loseText');
		loseText.anchor.setTo(0.5, 0.5);
		backgroundImage.tint = 0xbbbbbb;
	}
}


export default endGameStateLose;
