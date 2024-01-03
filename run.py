from flask import Flask, render_template
from app.routes.sudoku import sudoku_blueprint

app = Flask(__name__, template_folder='./app/views', static_folder='./app/assets')

app.register_blueprint(sudoku_blueprint, url_prefix='/sudoku')


@app.route('/')
def home_page():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
