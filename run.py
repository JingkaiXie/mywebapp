from flask import Flask, render_template

app = Flask(__name__, template_folder='./app/views', static_folder='./app/static_assets')


@app.route('/')
def home_page():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
