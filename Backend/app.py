from flask import Flask
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask app
app = Flask(__name__)

# Path to your Firebase Admin SDK service account key file
service_account_key_path = 'Backend/secret/transpense-firebase-adminsdk-u8q1s-bc0d0d9ab9.json'

# Initialize Firebase Admin SDK
cred = credentials.Certificate(service_account_key_path)
firebase_admin.initialize_app(cred)

# Get a reference to the Firestore service
db = firestore.client()

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
