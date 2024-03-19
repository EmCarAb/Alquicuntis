from app.app import start_app
from flask_cors import CORS

app = start_app()
CORS(app)
if __name__ == '__main__':
    app.run(debug=True)
