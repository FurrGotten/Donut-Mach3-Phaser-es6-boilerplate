

class TutorialState extends Phaser.State {
	preload() {
		this.load.image('background', 'assets/images/backgrounds/background.jpg');
		this.load.image('playButton','assets/images/btn-play.png');
	}
	create() {
		const { centerX, centerY } = this.world;
        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 0, 'background');
        backgroundImage.height = 1100;

		const tutorHeader = this.add.text(centerX, 100, 'TUTORIAL', { font: "100px Fredoka One", fill: "#000000", align: "center" });
		tutorHeader.anchor.setTo(0.5, 0.5);
		const tutorPart1 = this.add.text(centerX, 200, 'In the main menu press "play"', { font: "60px Fredoka One", fill: "#000000", align: "center" });
		tutorPart1.anchor.setTo(0.5, 0.5);
		const tutorPart2 = this.add.text(centerX, 300, 'Now, when you are on the playground, do following:', { font: "40px Fredoka One", fill: "#000000", align: "center" });
		tutorPart2.anchor.setTo(0.5, 0.5);
		const tutorPart3 = this.add.text(centerX, 400, 'You need to mach 3 or more donuts in line', { font: "50px Fredoka One", fill: "#000000", align: "center" });
		tutorPart3.anchor.setTo(0.5, 0.5);
		const tutorPart4 = this.add.text(centerX, 500, 'Choose one donut by clicking on him', { font: "60px Fredoka One", fill: "#000000", align: "center" });
		tutorPart4.anchor.setTo(0.5, 0.5);
		const tutorPart5 = this.add.text(centerX, 600, 'Click on a close donut to try a mach', { font: "60px Fredoka One", fill: "#000000", align: "center" });
		tutorPart5.anchor.setTo(0.5, 0.5);
		const tutorPart6 = this.add.text(centerX, 700, 'For every mach you get points, more in one go - better', { font: "40px Fredoka One", fill: "#000000", align: "center" });
		tutorPart6.anchor.setTo(0.5, 0.5);
		const tutorPart7 = this.add.text(centerX, 800, 'Get to 300 and YOU will WIN!', { font: "60px Fredoka One", fill: "#000000", align: "center" });
		tutorPart7.anchor.setTo(0.5, 0.5);
		const backToMenu = this.add.text(centerX, 1000, 'back to main menu', { font: "80px Fredoka One", fill: "#000000", align: "center" });
		backToMenu.anchor.setTo(0.5);
		backToMenu.inputEnabled = true;
		backToMenu.events.onInputUp.add(() => {this.state.start('MainMenuState')}, this);

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

export default TutorialState;
