const Cell = function (){
    let value = "E";
    const getValue = () => value;
    const setValue = (playerMark) => value = playerMark;
    return {getValue, setValue};
};

const Player = function (name, mark){
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
};

function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board.push([]);
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getRows = () => rows;
    const getColumns = () => columns;
    const getBoard = () => board;

    const displayBoard = () => {
        for(let i = 0; i < rows; i++){
            let stringOuput = "";
            for(let k = 0; k < columns; k++){
                stringOuput += board[i][k].getValue() + " ";
            }
            console.log(stringOuput);
        }
    };
    const placeMark = (row, column, playerMark) => {
        --row;
        --column;
        board[row][column].setValue(playerMark);
    };

    return {displayBoard, placeMark, getRows, getColumns, getBoard};
};

function GameController(gameBoard){
    const players = [Player("player1", "X"), Player("player2", "O")];

    let activePlayer = players[0];

    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? 
    players[1] : players[0];

    const welcomePlayers = () => {
        console.log("Welcome to Tic Tac Toe! The game will begin immediately.");
        console.log("*note that 'E' denotes an empty cell to place your mark");
    };

    const displayCongratsMessage = () => {
        console.log(`Congratulations to ${activePlayer.getName()} for winning!`);
    };

    const displayTieMessage = () => console.log("Nobody won... there was a tie!");

    const checkThreeInARow = (mark) => {
        let numberOfMarksInSuccession = 0;
        
        for(let i = 0; i < gameBoard.getRows(); i++){
            for(let k = 0; k < gameBoard.getColumns(); k++){
                if(gameBoard.getBoard()[i][k].getValue() === mark) numberOfMarksInSuccession++;
            }

            if(numberOfMarksInSuccession === gameBoard.getColumns()){
                return true;
            }else {
                numberOfMarksInSuccession = 0;
            }
        }
        return false;
    }

    const checkThreeInAColumn = (mark) => {
        let numberOfMarksInSuccession = 0;
        
        for(let i = 0; i < gameBoard.getColumns(); i++){
            for(let k = 0; k < gameBoard.getRows(); k++){
                if(gameBoard.getBoard()[k][i].getValue() === mark) numberOfMarksInSuccession++;
            }

            if(numberOfMarksInSuccession === gameBoard.getRows()){
                return true;
            }else {
                numberOfMarksInSuccession = 0;
            }
        }
        return false;
    };

    const hasLeftToRightDiagonal = (board, mark) => {
        return board[0][0].getValue() === mark &&
        board[1][1].getValue() === mark &&
        board[2][2].getValue() === mark;
    };

    const hasRightToLeftDiagonal = (board, mark) => {
        return board[0][2].getValue() === mark &&
        board[1][1].getValue() === mark &&
        board[2][0].getValue() === mark;
    };

    const checkThreeInADiagonal = (mark) => {
        const copyOfBoard = gameBoard.getBoard();
        return hasLeftToRightDiagonal(copyOfBoard, mark) || hasRightToLeftDiagonal(copyOfBoard, mark); 
    };

    const checkIfActivePlayerWon = (activePlayer) => {
        const mark = activePlayer.getMark();
        return checkThreeInARow(mark) || checkThreeInAColumn(mark) || checkThreeInADiagonal(mark);
    };

    const isFilled = () => {
        const boardArray = gameBoard.getBoard();
        for(let i = 0; i < gameBoard.getRows(); i++){
            for(let k = 0; k < gameBoard.getColumns(); k++){
                if(boardArray[i][k].getValue() === "E") return false;
            }
        }
        return true;
    };

    const checkForATie = (activePlayer) => !checkIfActivePlayerWon(activePlayer) && isFilled();

    const getMarkLocationFor = (dimensionOfBoard) => {
        return prompt(`${activePlayer.getName()}, which ${dimensionOfBoard} will you place your mark?`, "1");
    };

    const playTurn = () => {
        gameBoard.displayBoard();
        let userRow = getMarkLocationFor("row");
        let userColumn = getMarkLocationFor("column");
        gameBoard.placeMark(userRow, userColumn, activePlayer.getMark());
    };

    const playFullGame = () => {
        welcomePlayers();
        playTurn();
        console.log("");
        while(!checkIfActivePlayerWon(activePlayer) && !checkForATie(activePlayer)){
            switchActivePlayer();
            playTurn();
            console.log("");
        }
        if(checkIfActivePlayerWon(activePlayer)){
            gameBoard.displayBoard();
            displayCongratsMessage();
            return;
        }
        gameBoard.displayBoard();
        displayTieMessage();
    };

    return {playFullGame};
};

GameController(GameBoard()).playFullGame();