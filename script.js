const Cell = function (){
    let value = "E";
    const getValue = () => value;
    const setValue = (playerMark) => value = playerMark;
    return {getValue, setValue};
};

const gameBoard = (function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board.push([]);
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

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

    return {displayBoard, placeMark};
})();