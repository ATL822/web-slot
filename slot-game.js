function getRandomValInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getTumblerSymbol(item, index, arr) {
    let randomVal = getRandomValInRange(1,15);

    switch(randomVal) {
        case 1:
            item = 'Gem';
            break;
        case 2:
            item = '7';
            break;
        case 3:
            item = '3';
            break;
        case 4:
            item = '$';
            break;
        case 5:
            item = '¥‎';
            break;
        case 6:
            item = '€‎';
            break;
        case 7:
            item = 'Spade';
            break;
        case 8:
            item = 'Diamond';
            break;
        case 9:
            item = 'Club';
            break;
        case 10:
            item = 'Heart';
            break;
        case 11:
            item = 'Cherry';
            break;
        case 12:
            item = 'Watermelon';
            break;
        case 13:
            item = 'Lemon';
            break;
        case 14:
            item = 'Orange';
            break;
        case 15:
            item = 'Blackberry';
            break;
    }
    arr[index] = item;
    console.log(`item ${index} assigned ${item}`);
}

let tumblerValues = ['Gem','Gem','Gem','Gem','Gem'];
function rollTumblers() {
    tumblerValues.forEach(getTumblerSymbol);
    console.log(tumblerValues);
    return;
}

function displayTumblers() {
    for (let i = 0; i < 5; i++) {
        let tumbler = document.querySelector(`#tumbler-${i}`);
        tumbler.textContent = tumblerValues[i];
    }
    return;
}

let playButton = document.querySelector('.play-button');
playButton.addEventListener('click', () => {
    rollTumblers();
    displayTumblers();
    return;
});