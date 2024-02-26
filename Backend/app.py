from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore
from vespa.application import Vespa
import random
import string
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)
# Path to your Firebase Admin SDK service account key file
service_account_key_path = 'Backend/secret/transpense-firebase-adminsdk-u8q1s-bc0d0d9ab9.json'

# Initialize Firebase Admin SDK
cred = credentials.Certificate(service_account_key_path)
firebase_admin.initialize_app(cred)



# Get a reference to the Firestore service
db = firestore.client()


endpoint = "https://f9665d92.be43d0bf.z.vespa-app.cloud/"
cert_path = "Backend/secret/data-plane-public-cert.pem"
key_path = "Backend/secret/data-plane-private-key.pem"

the_app = Vespa(endpoint, cert=cert_path, key=key_path)

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




@app.route('/v1/buildConversation', methods=['POST'])
def store_chunks():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        text = file.read().decode('utf-8')
        chunks = text.split('\n')

        vespa_feed = []
        for i, chunk in enumerate(chunks):
            id = ''.join(random.choices(string.ascii_uppercase +
                                         string.digits, k=20))
            vespa_feed.append({"id": id, "fields": {"title": chunk, "body": chunk}})

        def callback(response, id):
            if not response.is_successful():
                print(f"Error when feeding document {id}: {response.get_json()}")
            else:
                print(f"Document {id} stored successfully")

        for data in vespa_feed:
            the_app.feed_data_point(data_id=data["id"], fields=data["fields"], schema="doc",
                                    namespace="tutorial", callback=callback)

        return jsonify({"message": "Chunks stored successfully"}), 200

# Endpoint to query Vespa and return top 5 documents matching the query
@app.route('/v1/getConversation', methods=['POST'])
def query():
    data = request.json
    query = data['query']
    
    # res = the_app.query(yql='select documentid, id, title from sources * where userQuery()', query=query, ranking="bm25")
    res = the_app.query(
        yql="select * from sources * where userQuery() or ({targetHits:1000}nearestNeighbor(embedding,q)) limit 10", 
    query=query, 
    ranking="fusion", 
    body = {
      "input.query(q)": f"embed({query})"
    }
    )
    print(res.hits)
    ans = []
    for i in range(len(res.hits)):
        ans.append(res.hits[i]["fields"]['title'])
    # hits = res.hits
    # hits = [{'id': hit.fields['id'], 'title': hit.fields['title']} for hit in res.hits]
    
    return jsonify(ans), 200

if __name__ == '__main__':
    app.run(debug=True)
