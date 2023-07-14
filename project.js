// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine 
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play Again 

//Create a function here

//function deposit(){
    
//}
// const x = deposit()

const prompt = require("prompt-sync")(); //this is my SCAN Func

//GLOBAL Variables
const ROWS = 3;
const COLS = 3;

//KEY MAPPING VARIABLE || Introduction to OBJECTS in JavaScripts
const SYMBOLS_COUNT =  {
    A: 2, 
    B: 4,
    C: 6,
    D: 8
};
//BET MULTIPLIERS FOR SLOT MACHINE
const SYMBOLS_VALUES = {
    A: 5, 
    B: 4,
    C: 3,
    D: 2
};

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit Amount : ");
        const numberDepositAmount = parseFloat(depositAmount);
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, Try Again FOOOO !! ");
        } else {
            return numberDepositAmount;
        }
    }
};
//deposit();
const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of Lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);
        
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid Number of Lines FOOOO !! ");
        }else{
            return numberOfLines;
        }
    }
};
const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the Bet amount per line: ");
        const numberBet = parseFloat(bet);
        if(isNaN(numberBet) || numberBet <= 0 ||numberBet > (balance/lines)){
            console.log("Invalid bet FOOOO, doesn't meet the balance !! ");
        }else{
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = []; //Use of Array  
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){ // pushing A,B,C,D symbols according to their count a=2,b=4
        //console.log(symbols, count);
        for(let i = 0; i < count; i++){
            symbols.push(symbol);  //push is used to insert something in Array

        }
    }
    const reels = [  ]; //Nested ARRAY // each array represents columns inside the slot machine for outputs
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j< ROWS; j++ ){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        } 
    }
    return reels;
    //console.log(symbols);
};

const transpose = (reels) => {
    const rows = [];

    for(i = 0; i < ROWS; i++){
        rows.push([]);
        
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])    
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}
const getWinning = (rows, bet, lines ) =>{
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]; 
        }
    }
    return winnings;
}

const game = () =>{
    let balance = deposit();      //Let allows us to keep updating or adjusting the value
    
    while(true){
        console.log("You have a Balance of : $"+ balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows); 

        const winnings = getWinning(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won : $" + winnings.toString()); 
        //console.log("Your profit : $" + (bet*numberOfLines).toString()); 

        if(balance <= 0){
            console.log("You ran out of MONEY FOOOO!! ");
            break;
        }
        const playAgain =prompt("Do you wanna play again FOOOO? (y/n) Nigga : ");
        if(playAgain != "y"){
            console.log("Broke Nigga!! ");
            break;
        }
    }
    //console.log(balance);
    //console.log(numberOfLines);
    //console.log(bet);
    //console.log(reels);
    //console.log(rows);
}
game();


