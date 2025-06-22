/* Class Declarations */
class Item {
    constructor() {
        this.itemID = 14;
        this.category = 4;
        this.itemName = 'Gem';
    };

    assignNewItem(itemID) {
        let name = '';
        let category = 4;
        switch(itemID) {
            case 14:
                name = 'Gem';
                category = 4;
                break;
            case 13:
                name = '7';
                category = 3;
                break;
            case 12:
                name = '3';
                category = 3;
                break;
            case 11:
                name = '$';
                category = 2;
                break;
            case 10:
                name = '¥';
                category = 2;
                break;
            case 9:
                name = '€';
                category = 2;
                break;
            case 8:
                name = 'Spade';
                category = 1;
                break;
            case 7:
                name = 'Diamond';
                category = 1;
                break;
            case 6:
                name = 'Club';
                category = 1;
                break;
            case 5:
                name = 'Heart';
                category = 1;
                break;
            case 4:
                name = 'Cherry';
                category = 0;
                break;
            case 3:
                name = 'Watermelon';
                category = 0;
                break;
            case 2:
                name = 'Lemon';
                category = 0;
                break;
            case 1:
                name = 'Orange';
                category = 0;
                break;
            case 0:
                name = 'Blackberry';
                category = 0;
                break;
            default:
                name = 'null';
                category = -1;
                break;
        };
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
const TUMBLER_COUNT = 5;
let tumblerValues = [];
for (let i = 0; i < TUMBLER_COUNT; i++) {
    tumblerValues.push(new Item);
}
let balance = 100000000;
let bet = 25;

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
    };
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

function getTumblerItem(item, index, arr) {
    let randomID = getRandomValInRange(0,14);
    arr[index].assignNewItem(randomID);
};

function countCategories() {
    let maxCount = 0;
    let categoryOfMax = 0;
    categoryMap = new Map();
    for (let i = 0; i < TUMBLER_COUNT; i++) {
        if (categoryMap.has(tumblerValues[i].getItemCategory())) {
            let categoryCount = categoryMap.get(tumblerValues[i].getItemCategory());
            categoryCount++;
            categoryMap.set(tumblerValues[i].getItemCategory(), categoryCount);
        }
        else {
            categoryMap.set(tumblerValues[i].getItemCategory(), 1);
        };
    };
    categoryArray = Array.from(categoryMap);
    categoryArray.forEach((category) => {
        categoryID = category[0];
        categoryCount = category[1];
        if (categoryCount > maxCount) {
            maxCount = categoryCount;
            categoryOfMax = categoryID;
        }
        else if ((categoryCount == maxCount) & (categoryID > categoryOfMax)) {
            categoryOfMax = categoryID;
        };
    });
    return [categoryOfMax, maxCount];
};

function countItems() {
    let maxCount = 0;
    let itemIDOfMax = 0;
    itemMap = new Map();
    for (let i = 0; i < TUMBLER_COUNT; i++) {
        if (itemMap.has(tumblerValues[i].getItemID())) {
            let itemCount = itemMap.get(tumblerValues[i].getItemID());
            itemCount++;
            itemMap.set(tumblerValues[i].getItemID(), itemCount);
        }
        else {
            itemMap.set(tumblerValues[i].getItemID(), 1);
        };
    };
    itemArray = Array.from(itemMap);
    itemArray.forEach((item) => {
        itemID = item[0];
        itemCount = item[1];
        if (itemCount > maxCount) {
            maxCount = itemCount;
            itemIDOfMax = itemID;
        }
        else if ((itemCount == maxCount) & (itemID > itemIDOfMax)) {
            itemIDOfMax = itemID;
        };
    });
    return [itemIDOfMax, maxCount];
};

/* Core Gameplay Functions */
function rollTumblers() {
    tumblerValues.forEach(getTumblerItem);
    return;
};

function scoreTumblers() {
    let [maxCategoryID, maxCategoryCount] = countCategories();
    let [maxItemID, maxItemCount] = countItems();
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
    scoreTumblers();
    return;
});

/* Page Initialization */
displayTumblers();
displayScore(balance);
displayBet(bet);
