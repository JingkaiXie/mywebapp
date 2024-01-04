from flask import Flask, render_template
from app.routes.sudoku import sudoku_blueprint
from app.routes.home import home_blueprint

app = Flask(__name__, template_folder='./app/views', static_folder='./app/assets')

app.register_blueprint(home_blueprint, url_prefix='/')
app.register_blueprint(sudoku_blueprint, url_prefix='/sudoku')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
