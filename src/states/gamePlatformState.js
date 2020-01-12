import {centerX, centerY} from "./common";

const FIELD_COLUMNS = 13;
const FIELD_ROWS = 11;
const DONUT_SIZE = 100;

const LOSE_TIME = 30;
let timeText;

let music;
let musicState = 'on';

class GamePlatformState extends Phaser.State {
    preload() {
        this.load.image('background', 'assets/images/backgrounds/background.jpg');
        this.load.image('scoreTable', 'assets/images/bg-score.png');
        this.load.image('donut-01', 'assets/images/game/gem-01.png');
        this.load.image('donut-02', 'assets/images/game/gem-02.png');
        this.load.image('donut-03', 'assets/images/game/gem-03.png');
        this.load.image('donut-04', 'assets/images/game/gem-04.png');
        this.load.image('donut-05', 'assets/images/game/gem-05.png');
        this.load.image('donut-06', 'assets/images/game/gem-06.png');
        this.load.image('donut-07', 'assets/images/game/gem-07.png');
        this.load.image('donut-08', 'assets/images/game/gem-08.png');
        this.load.image('donut-09', 'assets/images/game/gem-09.png');
        this.load.image('donut-10', 'assets/images/game/gem-10.png');
        this.load.image('donut-11', 'assets/images/game/gem-11.png');
        this.load.image('donut-12', 'assets/images/game/gem-12.png');
        this.load.image('hand', 'assets/images/game/hand.png');
        this.load.image('mute', 'assets/images/btn-sfx.png');
        this.load.audio('soundTrack', 'assets/audio/background.mp3')
    }

    create() {
        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 200, 'background');
        backgroundImage.height = 1100;
        let scoreTable = this.add.sprite(centerX - 200, 10, 'scoreTable');
        scoreTable.anchor.setTo(0.5, 0);

        const donuts = this.add.group();
        this.generateField(donuts, ['donut-01', 'donut-02', 'donut-04', 'donut-05', 'donut-06']);

        music = this.add.audio('soundTrack');
        music.loop = true;
        music.play();

        const mute = this.add.button(1100, 50, 'mute', () => {
            if (musicState === 'on') {
                music.stop();
                musicState = 'off';
            } else {
                music.play();
                musicState = 'on'
            }
        });
        mute.onInputDown.add(this.tint, mute);
        mute.onInputUp.add(this.unTint, mute);
        this.time.events.add(Phaser.Timer.SECOND * LOSE_TIME, () => {
            this.state.start('EndGameStateLose');
            music.destroy();
            this.cache.removeSound('soundTrack');
        }, this);

    }

    update() {

    }

    render() {

    }

    generateField(donutsGroup, donutTypes) {
        for (let i = 0; i < FIELD_ROWS; i++) {
            for (let j = 0; j < FIELD_COLUMNS; j++) {
                const randomIndex = Phaser.ArrayUtils.getRandomItem(removeDuplicates(donutsGroup.children, donutTypes, i, j));
                donutsGroup.create(0, 0, randomIndex);
            }
        }
        donutsGroup.align(FIELD_COLUMNS, -1, DONUT_SIZE, DONUT_SIZE);
        donutsGroup.x = centerX - (DONUT_SIZE * FIELD_COLUMNS) / 2;
        donutsGroup.y = centerY + 180 - (DONUT_SIZE * FIELD_ROWS) / 2;
        donutsGroup.setAll('inputEnabled', true);
        donutsGroup.setAll('input.useHandCursor', true);
        donutsGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.clickHandler)
    }

    clickHandler(item) {
        console.log('item', item)
        item.height = 110;
        item.width = 110;
        console.log('item', item, item.parent.getChildIndex(item))
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

function removeDuplicates(donuts, donutTypes, row, column) {
    let filtered = [...donutTypes];
    // Don't repeat donuts indexes horizontally more than two times
    if (column > 1) {
        const prevKey = donuts[donuts.length - 1].key;
        const prevPrevKey = donuts[donuts.length - 2].key;
        if (prevKey === prevPrevKey) filtered = filtered.filter(index => index !== prevKey);
    }
    // Don't repeat donuts indexes vertically more than two times
    if (row > 1) {
        const upperKey = donuts[(row - 1) * FIELD_COLUMNS + column].key;
        const upperUpperKey = donuts[(row - 2) * FIELD_COLUMNS + column].key;
        if (upperKey === upperUpperKey) filtered = filtered.filter(index => index !== upperKey);
    }
    return filtered;
}
export default GamePlatformState;
