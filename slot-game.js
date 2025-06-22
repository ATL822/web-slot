/* Class Declarations */
class Item {
    constructor() {
        this.itemID = 0;
        this.category = 0;
        this.itemName = 'Gem';
    };

    assignNewItem(itemID) {
        let name = '';
        let category = 0;
        switch(itemID) {
            case 0:
                name = 'Gem';
                category = 0;
                break;
            case 1:
                name = '7';
                category = 1;
                break;
            case 2:
                name = '3';
                category = 1;
                break;
            case 3:
                name = '$';
                category = 2;
                break;
            case 4:
                name = '¥';
                category = 2;
                break;
            case 5:
                name = '€';
                category = 2;
                break;
            case 6:
                name = 'Spade';
                category = 3;
                break;
            case 7:
                name = 'Diamond';
                category = 3;
                break;
            case 8:
                name = 'Club';
                category = 3;
                break;
            case 9:
                name = 'Heart';
                category = 3;
                break;
            case 10:
                name = 'Cherry';
                category = 4;
                break;
            case 11:
                name = 'Watermelon';
                category = 4;
                break;
            case 12:
                name = 'Lemon';
                category = 4;
                break;
            case 13:
                name = 'Orange';
                category = 4;
                break;
            case 14:
                name = 'Blackberry';
                category = 4;
                break;
            default:
                name = 'null';
                category = -1;
                break;
        }
        this.itemID = itemID;
        this.itemName = name;
        this.category = category;
    };

    getItemID() {
        return this.itemID;
    };

    getItemCategory() {
        return this.category;
    };

    getItemName() {
        return this.itemName;
    };
};

/* Variable Declarations */
let tumblerValues = [new Item(), new Item(), new Item(), new Item(), new Item()]; // init to all Gems
let balance = 100000000;
let bet = 0;

/* DOM Manipulation functions */
function displayTumblers() {
    for (let i = 0; i < 5; i++) {
        let tumbler = document.querySelector(`#tumbler-${i}`);
        tumbler.textContent = tumblerValues[i].getItemName();
    }
    return;
};

function displayBet(bet) {
    let currentBet = document.querySelector('.bet-adjustment-panel p');
    currentBet.textContent = ('00' + bet).slice(-3);
    return;
};

function displayScore(balance) {
    let currentBalance = document.querySelector('.point-read-out p');
    currentBalance.textContent = ('000000000' + balance).slice(-9);
};


/* Gameplay Support Functions */
function incrementBet(amount) {
    newBet = bet + amount;
    if (newBet >= 0 & newBet < 1000) {
        bet += amount;
    }
    console.log(bet);
    return;
};

function incrementBalance(amount) {
    balance += amount;
    displayScore(balance);
};

function decrementBalance(amount) {
    balance -= amount;
    displayScore(balance);
};

function getRandomValInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

function getTumblerSymbol(item, index, arr) {
    let randomID = getRandomValInRange(0,14);
    arr[index].assignNewItem(randomID);
    console.log(`item ${index} assigned ${item.getItemName()}`);
};

/* Core Gameplay Functions */
function rollTumblers() {
    tumblerValues.forEach(getTumblerSymbol);
    console.log(tumblerValues);
    return;
};

/* Event Listener Bindings */
const incrementButtons = document.querySelectorAll('.bet-adjustment-buttons button');
incrementButtons.forEach((button) => {
    button.addEventListener('click', () => {
        incrementBet(Number(button.id));
        displayBet(bet);
    });
});

let playButton = document.querySelector('.play-button');
playButton.addEventListener('click', () => {
    decrementBalance(bet);
    rollTumblers();
    displayTumblers();
    return;
});

/* Page Initialization */
displayTumblers();
displayScore(balance);
