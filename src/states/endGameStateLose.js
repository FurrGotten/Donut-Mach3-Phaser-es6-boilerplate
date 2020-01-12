import {centerX, centerY} from "./common";


class EndGameStateLose extends Phaser.State {
	preload() {
		this.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.load.image('loseText', 'assets/images/text-timeup.png');
		this.load.image('playButton','assets/images/btn-play.png');
	}
	create() {
        this.stage.backgroundColor = '#bbb980';
		let backgroundImage = this.add.sprite(0, 200, 'background');
		backgroundImage.height = 1100;
		let loseText = this.add.sprite(centerX, centerY, 'loseText');
		loseText.anchor.setTo(0.5, 0.5);
		backgroundImage.tint = 0xbbbbbb;
		const playButton = this.add.button(centerX, centerY + 170, 'playButton', () => {
			this.state.start('GamePlatformState', true, false, { score: 200 });
		});
		playButton.anchor.setTo(0.5, 0.5);
		playButton.onInputDown.add(this.tint, playButton);
		playButton.onInputUp.add(this.unTint, playButton);
	}
	tint() {
		this.tint = 0xbbbbbb;
		// sound.play('');
	};
	unTint() {
		this.tint = 0xFFFFFF;
		// sound.play('');
	}
}


export default EndGameStateLose;
