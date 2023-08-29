document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("sudoku-board");

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

    // Create the Sudoku board
    function createSudokuBoard() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement("div");
                cell.classList.add("sudoku-cell");

                // Set initial values
                if (sudokuData[row][col] !== 0) {
                    cell.textContent = sudokuData[row][col];
                    cell.classList.add("user-input");
                    cell.setAttribute("contenteditable", "false");
                } else {
                    cell.setAttribute("contenteditable", "true");
                }

                board.appendChild(cell);
            }
        }
    }

    // Create the Sudoku board on page load
    createSudokuBoard();

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
});
