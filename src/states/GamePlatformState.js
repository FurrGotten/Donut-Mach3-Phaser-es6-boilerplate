import {getRemovableDonuts, formatTime, generateField, FIELD_COLUMNS, FIELD_ROWS} from "./helpers";

const DONUT_SIZE = 100;
const ALLOWED_DONUT_TYPES = ['donut-01', 'donut-02', 'donut-03', 'donut-04', 'donut-05', 'donut-06'];

const LOSE_TIME = 300;
const WIN_SCORE = 300;

let backgroundMusic;
let backgroundMusicState = 'on';
let missSound;
let killSound;
let score;

let emitter;
const PARTICLES = ['particle-1', 'particle-2','particle-3'];

let selDonutIndex;

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
        this.load.audio('soundTrack', 'assets/audio/background.mp3');
        this.load.audio('missSound', 'assets/audio/miss-sound.mp3');
        this.load.audio('killSound', 'assets/audio/kill.mp3');
        this.load.audio('select-1', 'assets/audio/select-1.mp3');
        this.load.audio('select-2', 'assets/audio/select-2.mp3');
        this.load.audio('select-3', 'assets/audio/select-3.mp3');
        this.load.audio('select-4', 'assets/audio/select-4.mp3');
        this.load.audio('select-5', 'assets/audio/select-5.mp3');
        this.load.audio('select-6', 'assets/audio/select-6.mp3');
        this.load.audio('select-7', 'assets/audio/select-7.mp3');
        this.load.audio('select-8', 'assets/audio/select-8.mp3');
        this.load.audio('select-9', 'assets/audio/select-9.mp3');
        this.load.image('particle-1', 'assets/images/particles/particle_ex1.png');
        this.load.image('particle-2', 'assets/images/particles/particle_ex2.png');
        this.load.image('particle-3', 'assets/images/particles/particle_ex3.png');
    }

    create() {
        const { centerX, centerY } = this.world;

        this.stage.backgroundColor = '#fffcad';
        let backgroundImage = this.add.sprite(0, 0, 'background');
        backgroundImage.height = 1100;

        let scoreTable = this.add.sprite(centerX - 200, 10, 'scoreTable');
        scoreTable.anchor.setTo(0.5, 0);
        score = 0;
        const scoreText = this.add.text(centerX - 190, 70, `0`, { font: "64px Fredoka One", fill: "#ff3030", align: "center" });

        const donuts = this.add.group();
        generateField(donuts, ALLOWED_DONUT_TYPES);
        donuts.align(FIELD_COLUMNS, -1, DONUT_SIZE, DONUT_SIZE);
        donuts.x = centerX - (DONUT_SIZE * FIELD_COLUMNS) / 2;
        donuts.y = centerY + 100 - (DONUT_SIZE * FIELD_ROWS) / 2;
        donuts.setAll('inputEnabled', true);
        donuts.setAll('input.useHandCursor', true);
        donuts.callAll('events.onInputDown.add', 'events.onInputDown', item => {this.clickHandler(item, scoreText)}, this);

        selDonutIndex = null;

        missSound = this.add.audio('missSound');
        backgroundMusic = this.add.audio('soundTrack');
        backgroundMusic.loop = true;
        backgroundMusic.play();

        const mute = this.add.button(900, 50, 'mute', () => {
            if (backgroundMusicState === 'on') {
                backgroundMusic.stop();
                backgroundMusicState = 'off';
            } else {
                backgroundMusic.play();
                backgroundMusicState = 'on'
            }
        });
        mute.onInputDown.add(this.tint, mute);
        mute.onInputUp.add(this.unTint, mute);

        this.time.events.add(Phaser.Timer.SECOND * LOSE_TIME, () => {
            this.state.start('EndGameStateLose');
            backgroundMusic.destroy();
            this.cache.removeSound('soundTrack');
        }, this);
        let rawSecondsTimer = LOSE_TIME;
        const timeText = this.add.text(centerX + 100, 100, formatTime(rawSecondsTimer), { font: "64px Fredoka One", fill: "#ff3030", align: "center" });
        this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            rawSecondsTimer--;
            timeText.setText(formatTime(rawSecondsTimer));
        }, this);
    }

    update() {
    }

    render() {

    }

    clickHandler(curDonut, scoreText) {
        const curDonutIndex = curDonut.parent.getChildIndex(curDonut);
        if (selDonutIndex === null){
            // виділяємо елемент, якщо ще не виділенний
            curDonut.height = 120;
            curDonut.width = 120;
            curDonut.x -= 10;
            curDonut.y -= 10;
            selDonutIndex = curDonutIndex;
        } else if (curDonutIndex === selDonutIndex){
            // знімаємо виділення, якщо клікаємо по вже виділеному елементу
            curDonut.height = 100;
            curDonut.width = 100;
            curDonut.x += 10;
            curDonut.y += 10;
            selDonutIndex = null;
        } else {
            // у будь-якому випадку знімаємо виділення з поточного виділеного елементу
            const selDonut = curDonut.parent.getChildAt(selDonutIndex);
            selDonut.height = 100;
            selDonut.width = 100;
            selDonut.x += 10;
            selDonut.y += 10;

            // перевіряємо чи можна зробити перестановку та робимо її
            let donutKeys = curDonut.parent.children.map(sprite => sprite.key);
            let removableIndexes = getRemovableDonuts(donutKeys, selDonutIndex, curDonutIndex);
            if(!removableIndexes.length){
                // перестановка неможлива або елементи не сусідні, відтворюємо відповідний звук
                missSound.play();
            } else {
                // перестановка можлива, міняємо елементи місцями
                const t = selDonut.key;
                selDonut.loadTexture(curDonut.key);
                curDonut.loadTexture(t);
                // повторюємо поки є можливість видаляти елементи
                let iter = 1;
                while (removableIndexes.length) {
                    // для анімації потрібні самі елементи за вказаними індексами
                    const removableElements = removableIndexes.map(i => curDonut.parent.getChildAt(i));
                    this.animateRemoval(removableElements, iter);
                    score += (iter * removableIndexes.length);
                    scoreText.setText(`${score}`);
                    // замінити текстури в видалених елементів на нові рандомні
                    removableElements.forEach(el => el.loadTexture(Phaser.ArrayUtils.getRandomItem(ALLOWED_DONUT_TYPES)));
                    // перевірити чи можливе ще видалення після додання нових
                    donutKeys = curDonut.parent.children.map(sprite => sprite.key);
                    removableIndexes = getRemovableDonuts(donutKeys);
                    // маємо лише 9 звуків для кожної ітерації
                    if (iter<= 9) iter++;
                }
            }
            selDonutIndex = null;
        }
            if (score >= WIN_SCORE){
                this.state.start('EndGameStateWin');
                backgroundMusic.destroy();
                this.cache.removeSound('soundTrack');
            }
    }

    animateRemoval(elements, iter){
        // програвати на кожній ітерації вищий звук
        killSound = this.add.audio(`select-${iter}`);
        killSound.volume = 0.5;
        killSound.play();

        const middleElement = elements[Math.floor(elements.length / 2)];

        emitter = this.add.emitter(50, 50, 100);
        emitter.makeParticles(PARTICLES);
        middleElement.addChild(emitter);
        emitter.minParticleSpeed.setTo(-600, -600);
        emitter.maxParticleSpeed.setTo(600, 600);
        emitter.gravity = 0;
        emitter.start(true, 1000, null, 10);
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


export default GamePlatformState;
