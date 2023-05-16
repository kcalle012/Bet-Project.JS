// 1. Deposit money
// 2. Determine lines
// 3. Collect Bet Amount
// 4. Spin
// 5. Check if user won
// 6. Give user their winnings.
// Play again 

const prompt = require("prompt-sync")();



const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 3,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOLS_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){ 
        for (let i=0; i < count; i++){
            symbols.push(symbol);

        }
    }
        const reels = [];
        for (let i = 0; i < COLS; i++) {
            reels.push([]);
            const reelSymbols = [...symbols];
            for (let j = 0; j < ROWS; j++){
                const randomIndex = Math.floor(Math.random()*reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex,1);
            }
        }
    return reels;
};

const deposit = () => {
    while (true) {
    const depositAmount = prompt("Enter a deposit amount: $");
    const numberDepositAmount = parseFloat (depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('Invalid deposit amount, try again')
        }else {
            return numberDepositAmount;
        }
    }
};

const getNumberofLines = () => {
    while (true) {
        const linesAmount = prompt('Enter the amount of lines you would like to bet on (1-3): ');
        const numberLinesAmount = parseFloat (linesAmount);
            if (isNaN(numberLinesAmount) || numberLinesAmount<0||numberLinesAmount > 3){
                console.log('Invalid number of lines, try again: ');

            }else{
                return numberLinesAmount;
            }
    }
};

const getBet = (balance, numberLinesAmount) => {
    while (true){
        const betAmount = prompt('Enter the amount you would lke to bet on each line: $');
        const numBetAmountPerLine = parseFloat (betAmount);
        if (isNaN(numBetAmountPerLine)|| numBetAmountPerLine < 0 || numBetAmountPerLine*numberLinesAmount > balance){
            console.log('Invalid bet amount. Enter another number. ')
        }else {
            return numBetAmountPerLine;
        }
    
    }
};

//main

const transpose = (reels) => {
    const rows = [];
    for (let i=0;i < ROWS; i++){
        rows.push([]);
        for (let j=0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString +=symbol
            if (i!=row.length -1) {
                rowString += ' | '
            }
        }
        console.log(rowString);
    }
}

const checkWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true
        for (let symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }

        }

        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;

}

const playAgain = () => {
    const ask = prompt('Do you want to pay again? Press y for yes and n for no: ')
    if (ask == 'y') {
        return true
    }
    else if (ask == 'n') {
        return false
    }
    else {
        console.log('Invalid answer, please type a valid answer. ')
        playAgain()
    }
}


//main
let play = true

while (play){
    let balance = deposit();
    const numberLinesAmount = getNumberofLines();
    const getBetAmount = getBet(balance, numberLinesAmount);
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows)
    const winnings = checkWinnings(rows, getBetAmount, numberLinesAmount)
    console.log('You won, $' + winnings.toString());
    play = playAgain()
    
}



