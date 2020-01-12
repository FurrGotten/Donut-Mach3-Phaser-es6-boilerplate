


class MainMenuState extends Phaser.State {
	preload() {
		this.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.load.image('bigDonut', 'assets/images/donut.png');
		this.load.image('bigShadow','assets/images/big-shadow.png');
		this.load.image('logo', 'assets/images/donuts_logo.png');
		this.load.image('playButton','assets/images/btn-play.png');
		this.load.image('soundControlButton','assets/images/btn-sfx.png');
	}
	create() {
		const { centerX, centerY } = this.world;
		this.stage.backgroundColor = '#fffcad';
		let backgroundImage = this.add.sprite(0, 200, 'background');
		backgroundImage.height = 1100;
		let bigDonutShadow = this.add.sprite( centerX, centerY, 'bigShadow');
		bigDonutShadow.anchor.setTo(0.5, 0.5);
		let bigDonut = this.add.sprite(centerX, centerY, 'bigDonut');
		bigDonut.anchor.setTo(0.5, 0.5);
		let logo = this.add.sprite(centerX, centerY - 150, 'logo');
		logo.anchor.setTo(0.5, 0.5);
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

export default MainMenuState;
