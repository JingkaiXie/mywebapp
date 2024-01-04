import copy
import random


class Sudoku:
    def __init__(self):
        # This is a solved sudoku that we will use to generate sudoku problems. Fast but the variation is limited.
        self.board = [
            [3, 5, 1, 2, 9, 8, 6, 7, 4],
            [8, 9, 2, 6, 4, 7, 1, 3, 5],
            [7, 4, 6, 1, 5, 3, 2, 8, 9],
            [1, 7, 5, 9, 3, 2, 4, 6, 8],
            [6, 8, 4, 5, 7, 1, 9, 2, 3],
            [2, 3, 9, 4, 8, 6, 5, 1, 7],
            [5, 6, 7, 3, 1, 9, 8, 4, 2],
            [9, 1, 3, 8, 2, 4, 7, 5, 6],
            [4, 2, 8, 7, 6, 5, 3, 9, 1]
        ]

    def generate(self, k=40) -> list[list[int]]:
        board = self.shuffle()
        board = self.remove_cells(board, k)
        return board

    def is_correct(self, board) -> bool:
        # Check row
        for row in board:
            row_set = set()
            for n in row:
                if n in row_set:
                    return False
                else:
                    row_set.add(n)

        # Check column
        for col in range(len(board[0])):
            col_set = set()
            for row in range(len(board)):
                if board[row][col] in col_set:
                    return False
                else:
                    col_set.add(board[row][col])

        # Check 3x3
        for i in range(3):
            for j in range(3):
                square_set = set()
                for row in range(3):
                    for col in range(3):
                        if board[i * 3 + row][j * 3 + col] in square_set:
                            return False
                        else:
                            square_set.add(board[i * 3 + row][j * 3 + col])

        return True

    def shuffle(self) -> list[list[int]]:
        new_board = copy.deepcopy(self.board)

        def swap_rows(new_grid, subgrid):
            rows = random.sample(range(subgrid * 3, (subgrid + 1) * 3), 2)
            new_grid[rows[0]], new_grid[rows[1]] = new_grid[rows[1]], new_grid[rows[0]]

        def swap_columns(new_grid, subgrid):
            cols = random.sample(range(subgrid * 3, (subgrid + 1) * 3), 2)
            for row in new_grid:
                row[cols[0]], row[cols[1]] = row[cols[1]], row[cols[0]]

        # Shuffle rows and columns in each subgrid
        for i in range(3):
            swap_rows(new_board, i)
            swap_columns(new_board, i)

        return new_board

    def remove_cells(self, board, count) -> list[list[int]]:
        removed = 0
        while removed < count:
            row = random.randint(0, 8)
            col = random.randint(0, 8)

            # If the cell is not already empty, remove the number
            if board[row][col] != 0:
                board[row][col] = 0  # 0 is used for empty cells in frontend javascript.
                removed += 1

        return board
