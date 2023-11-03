from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/product")
def renderProduct():
    return render_template("product.html")


@app.route("/about")
def renderAbout():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True)