

class EndGameStateWin extends Phaser.State {
	preload() {
		this.load.image('background', 'assets/images/backgrounds/background.jpg');
	}
	create() {
		const { centerX, centerY } = this.world;
        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 0, 'background');
        backgroundImage.height = 1100;
	}
}

export default EndGameStateWin;
