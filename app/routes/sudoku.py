from flask import Blueprint, render_template, request, jsonify
from ..models import sudoku

sudoku_blueprint = Blueprint('sudoku', __name__, template_folder='../views', static_folder='../assets')

sudoku_helper = sudoku.Sudoku()


@sudoku_blueprint.route('/')
def sudoku():
    return render_template('sudoku.html')


@sudoku_blueprint.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    board = data['board']
    is_correct = sudoku_helper.is_correct(board)
    return jsonify({"isCorrect": is_correct})


@sudoku_blueprint.route('/new', methods=['Get'])
def new_game():
    board = sudoku_helper.generate()
    return jsonify(board)
