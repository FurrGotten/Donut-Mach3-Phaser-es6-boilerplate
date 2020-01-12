

const FIELD_COLUMNS = 13;
const FIELD_ROWS = 11;
const DONUT_SIZE = 100;

const LOSE_TIME = 300;
let timeCounter;

let music;
let musicState = 'on';

let selDonutIndex = null;

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
        const { centerX, centerY } = this.world;
        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 200, 'background');
        backgroundImage.height = 1100;
        let scoreTable = this.add.sprite(centerX - 200, 10, 'scoreTable');
        scoreTable.anchor.setTo(0.5, 0);

        const donuts = this.add.group();
        generateField(donuts, ['donut-01', 'donut-02', 'donut-04', 'donut-05', 'donut-06']);
        donuts.align(FIELD_COLUMNS, -1, DONUT_SIZE, DONUT_SIZE);
        donuts.x = centerX - (DONUT_SIZE * FIELD_COLUMNS) / 2;
        donuts.y = centerY + 100 - (DONUT_SIZE * FIELD_ROWS) / 2;
        donuts.setAll('inputEnabled', true);
        donuts.setAll('input.useHandCursor', true);
        donuts.callAll('events.onInputDown.add', 'events.onInputDown', this.clickHandler);

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
        timeCounter = LOSE_TIME;
        const timeText = this.add.text(centerX + 100, 100, `00:${timeCounter}`, { font: "64px Fredoka One", fill: "#ff3030", align: "center" });
        this.game.time.events.loop(Phaser.Timer.SECOND, () => { this.updateTimeCounter(timeText) }, this);
    }

    update() {

    }

    render() {

    }

    clickHandler(item) {
        const curDonutIndex = item.parent.getChildIndex(item);
        if (!selDonutIndex){
            item.height = 120;
            item.width = 120;
            item.x -= 10;
            item.y -= 10;
            selDonutIndex = curDonutIndex;
        } else if (curDonutIndex === selDonutIndex){
            item.height = 100;
            item.width = 100;
            item.x += 10;
            item.y += 10;
            selDonutIndex = null;
        } else {
            const donutKeys = item.parent.children.map(sprite => sprite.key);
            const removable = getRemovableDonuts(donutKeys, selDonutIndex, curDonutIndex);
            if(!removable.length){
                const selDonut = item.parent.getChildAt(selDonutIndex);
                selDonut.height = 100;
                selDonut.width = 100;
                selDonut.x += 10;
                selDonut.y += 10;
                selDonutIndex = null;
            }
        }
    }

    tint() {
        this.tint = 0xbbbbbb;
        // sound.play('');
    };

    unTint() {
        this.tint = 0xFFFFFF;
        // sound.play('');
    }
    updateTimeCounter(timeText) {
        timeCounter--;
        timeText.setText(`00:${timeCounter}`)
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

function generateField(donutsGroup, donutTypes) {
    for (let i = 0; i < FIELD_ROWS; i++) {
        for (let j = 0; j < FIELD_COLUMNS; j++) {
            const randomKey = Phaser.ArrayUtils.getRandomItem(removeDuplicates(donutsGroup.children, donutTypes, i, j));
            donutsGroup.create(0, 0, randomKey);
        }
    }
}

function getRemovableDonuts(donuts, swapA, swapB) {
    const donutsCopy = [...donuts];
    if (swapA && swapB){
        const t = donutsCopy[swapA];
        donutsCopy[swapA] = donutsCopy[swapB];
        donutsCopy[swapB] = t;
    }
    const removeList = new Array(donuts.length).fill(0);
    for (let i = 0; i < FIELD_ROWS; i++) {
        for (let j = 0; j < FIELD_COLUMNS; j++) {
            const curIndex = i * FIELD_COLUMNS + j;
            if (j > 1 && donutsCopy[curIndex] === donutsCopy[curIndex - 1] && donutsCopy[curIndex] === donutsCopy[curIndex - 2]){
                removeList[curIndex] = 1;
                removeList[curIndex - 1] = 1;
                removeList[curIndex - 2] = 1;
            }
            if (i > 1 && donutsCopy[curIndex] === donutsCopy[curIndex - FIELD_COLUMNS] && donutsCopy[curIndex] === donutsCopy[curIndex - FIELD_COLUMNS*2]){
                removeList[curIndex] = 1;
                removeList[curIndex - FIELD_COLUMNS] = 1;
                removeList[curIndex - FIELD_COLUMNS * 2] = 1;
            }
        }
    }
    const retValue = [];
    removeList.forEach((v, i) => {
        if (v){
            retValue.push(i);
        }
    });
    return retValue;
}

export default GamePlatformState;
