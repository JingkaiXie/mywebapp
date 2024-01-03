document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("sudoku-board");
    const btnSolve = document.getElementById("btn-solve");
    const btnReset = document.getElementById("btn-reset");
    const btnNewGame = document.getElementById("btn-new-game");

    btnSolve.addEventListener("click", solveSudoku);
    btnReset.addEventListener("click", resetBoard);
    btnNewGame.addEventListener("click", newGame);

    // Sample Sudoku board (0 represents empty cells)
    const sudokuData = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // Create the Sudoku board on page load
    createSudokuBoard(sudokuData);

    // Function to create the Sudoku board
    function createSudokuBoard(sudokuData) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement("div");
                cell.classList.add("sudoku-cell");

                // Set initial values
                if (sudokuData[row][col] !== 0) {
                    cell.textContent = sudokuData[row][col];
                    cell.classList.add("initial-value");
                    cell.setAttribute("contenteditable", "false");
                } else {
                    cell.setAttribute("contenteditable", "true");
                }

                board.appendChild(cell);
            }
        }
    }

    // Handle user input
    board.addEventListener("input", function (event) {
        const cell = event.target;
        const inputValue = parseInt(cell.textContent);

        if (isValidInput(inputValue)) {
            // Ensure that the input is a valid number
            cell.textContent = inputValue;
            cell.classList.add("user-input");
        } else {
            // Clear the cell if the input is invalid
            cell.textContent = "";
            cell.classList.remove("user-input");
        }
    });

    // Function to check if user input is valid (between 1 and 9)
    function isValidInput(value) {
        return !isNaN(value) && value >= 1 && value <= 9;
    }

    function solveSudoku() {
        const currentBoard = getCurrentBoardState();

        fetch('/sudoku/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ board: currentBoard })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isCorrect) {
                alert("Congratulations! The solution is correct. Click on new game to try a new one");
            } else {
                alert("Incorrect solution. Please try again.");
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function newGame() {
        fetch('/sudoku/new')
            .then(response => response.json())
            .then(sudokuData => {
                // Clear the existing board
                while (board.firstChild) {
                    board.removeChild(board.firstChild);
                }
                // Create a new Sudoku board with the fetched data
                createSudokuBoard(sudokuData);
            })
            .catch(error => console.error('Error fetching new game:', error));
    }

    function resetBoard() {
        // Implement the logic to reset the board
        console.log("Reset board function called.");
        // Example: Resetting all cells
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.textContent = cell.classList.contains('initial-value') ? cell.textContent : '';
            cell.classList.remove('user-input');
        });
    }

    function getCurrentBoardState() {
        const boardState = [];
        const cells = document.querySelectorAll('.sudoku-cell');
        let row = [];

        cells.forEach((cell, index) => {
            const value = cell.textContent.trim() === '' ? 0 : parseInt(cell.textContent.trim());
            row.push(value);

            if ((index + 1) % 9 === 0) { // Each row has 9 cells
                boardState.push(row);
                row = [];
            }
        });

        return boardState;
    }
});
