# game.py
from flask import Flask, render_template

app = Flask(__name__)

# Define a route to serve the static files (CSS, JS, images, etc.)
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
