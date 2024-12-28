from flask import Flask
from flask_cors import CORS
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Sarvesh12@localhost/sdg'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

import routes

if __name__ == '__main__':
    app.run(debug=True)