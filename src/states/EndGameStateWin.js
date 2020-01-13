

class EndGameStateWin extends Phaser.State {
	preload() {
		this.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.load.image('playButton','assets/images/btn-play.png');
	}
	create() {
		const { centerX, centerY } = this.world;
        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 0, 'background');
        backgroundImage.height = 1100;
		backgroundImage.tint = 0xbbbbbb;
		const playButton = this.add.button(centerX, centerY + 170, 'playButton', () => {
			this.state.start('GamePlatformState', true, false, { score: 200 });
		});
		playButton.anchor.setTo(0.5, 0.5);
		playButton.onInputDown.add(this.tint, playButton);
		playButton.onInputUp.add(this.unTint, playButton);
		const winText = this.add.text(centerX, centerY - 300, 'YOU WIN!', { font: "160px Fredoka One", fill: "#ffffff", align: "center" });
		winText.anchor.setTo(0.5, 0.5)
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

export default EndGameStateWin;
