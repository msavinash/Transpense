from flask import Flask, jsonify, request
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

@app.route('/v1/transactions', methods=['GET'])
def get_transactions():
    transactions_ref = db.collection('transactions')
    docs = transactions_ref.stream()
    transactions = [doc.to_dict() for doc in docs]
    return jsonify(transactions), 200

@app.route('/v1/budget', methods=['GET'])
def get_budget():
    budget_ref = db.collection('budget')
    docs = budget_ref.stream()
    budgets = [doc.to_dict() for doc in docs]
    return jsonify(budgets), 200

@app.route('/v1/transactions', methods=['POST'])
def add_transaction():
    try:
        data = request.json
        # Add a new document in the transactions collection
        ref = db.collection('transactions').add(data)
        return jsonify({"success": True, "id": ref[1].id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/v1/budget', methods=['POST'])
def add_budget():
    try:
        data = request.json
        # Add a new document in the budget collection
        ref = db.collection('budget').add(data)
        return jsonify({"success": True, "id": ref[1].id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
