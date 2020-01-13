export const FIELD_COLUMNS = 10;
export const FIELD_ROWS = 8;

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
// заповнюємо ігрове поле, слідкуючі, що ніякі 3 або більше однакових елемента не генерувалися підряд
// donutTypes містить масив тих елементів, які можна розмістити на полі
export function generateField(donutsGroup, donutTypes) {
    for (let i = 0; i < FIELD_ROWS; i++) {
        for (let j = 0; j < FIELD_COLUMNS; j++) {
            const randomKey = Phaser.ArrayUtils.getRandomItem(removeDuplicates(donutsGroup.children, donutTypes, i, j));
            donutsGroup.create(0, 0, randomKey);
        }
    }
}

// знайти індекси всіх елементів які можна видалити
// на поточному полі або на полі яке виникає якщо переставити місцями елементи swapA i swapB
export function getRemovableDonuts(donuts, swapA, swapB) {
    // створюємо копію ігрового поля щоб провести перевірку перед перстановкою swapA i swapB
    const donutsCopy = [...donuts];
    if (swapA && swapB){
        // перевірка чи є елементи сусідніми для перестановки, якщо ні,
        // то перестановка неможлива і повертається порожній массив
        const diff = Math.abs(swapA - swapB);
        if (diff !== 1 && diff !== FIELD_COLUMNS){
            return [];
        }
        const t = donutsCopy[swapA];
        donutsCopy[swapA] = donutsCopy[swapB];
        donutsCopy[swapB] = t;
    }
    // допоможній массив з нулів і одиниць, одиниці ставимо для елементів, які можна видалити
    const removeList = new Array(donuts.length).fill(0);
    for (let i = 0; i < FIELD_ROWS; i++) {
        for (let j = 0; j < FIELD_COLUMNS; j++) {
            const curIndex = i * FIELD_COLUMNS + j;
            // перевірка трьох сусідніх елементів по горизонталі
            if (j > 1 && donutsCopy[curIndex] === donutsCopy[curIndex - 1] && donutsCopy[curIndex] === donutsCopy[curIndex - 2]){
                removeList[curIndex] = 1;
                removeList[curIndex - 1] = 1;
                removeList[curIndex - 2] = 1;
            }
            // перевірка трьох сусідніх елементів по вертикалі
            if (i > 1 && donutsCopy[curIndex] === donutsCopy[curIndex - FIELD_COLUMNS] && donutsCopy[curIndex] === donutsCopy[curIndex - FIELD_COLUMNS*2]){
                removeList[curIndex] = 1;
                removeList[curIndex - FIELD_COLUMNS] = 1;
                removeList[curIndex - FIELD_COLUMNS * 2] = 1;
            }
        }
    }
    // перетворюємо масив з одиниць і нулів в массив індексів потрібних нам елементів
    const retValue = [];
    removeList.forEach((v, i) => {
        if (v){
            retValue.push(i);
        }
    });
    return retValue;
}

export function formatTime(sec) {
    const s = String(sec % 60).padStart(2, '0');
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    return m + ':' + s;
}
