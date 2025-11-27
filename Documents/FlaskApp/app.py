from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    # Returns the required message when accessing the root of the site [cite: 6, 7]
    return "Hello, World!"

if __name__ == "__main__":
    # Runs the application on port 5000 [cite: 25]
    app.run(host='0.0.0.0', port=5000)
