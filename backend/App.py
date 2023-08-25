from bson import ObjectId
from flask import Flask, Response, request, jsonify, send_file
from flask_pymongo import PyMongo
from bson.binary import Binary
import os
import uuid
import urllib.parse
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# URL-encode the password
password = urllib.parse.quote_plus('mongodb123')

# Set the MONGO_URI with the encoded password
app.config['MONGO_URI'] = f'mongodb+srv://madhuram2modi3110:{password}@cluster0.i0wl1np.mongodb.net/images?retryWrites=true&w=majority'
mongo = PyMongo(app)
 
# Function to handle image upload and save it to MongoDB
def upload_image(file):
    if file:
        # Generate a unique file name
        unique_filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[-1]

        # Save the image to MongoDB
        image_data = Binary(file.read())
        image_collection = mongo.db.images
        image_collection.insert_one({'filename': unique_filename, 'data': image_data})

        # Record image metadata in a database (not shown in this example)
        return unique_filename
    else:
        return None
print("asfsd")
@app.route('/api/upload', methods=['POST'])
def upload_image_route():
    uploaded_file = request.files['image']
    filename = upload_image(uploaded_file)
    if filename:
        image_collection = mongo.db.images
        image_data = image_collection.find_one({'filename': filename})
        image_id = image_data['_id']
        print(image_id)
        # You can record image metadata in a database here.
        response_data = {'message': 'Image uploaded successfully', '_id': str(image_id)}
        return jsonify(response_data), 200
    else:
        response_data = {'message': 'Upload failed'}
        return jsonify(response_data), 400
    

@app.route('/api/gallery/<string:image_id>', methods=['GET'])
def get_image(image_id):
    image_collection = mongo.db.images

    # Ensure the provided image_id is a valid ObjectId
    try:
        image_id = ObjectId(image_id)
    except Exception as e:
        return jsonify({'message': 'Invalid image ID'}), 400

    image_data = image_collection.find_one({'_id': image_id})

    if image_data:
        # Retrieve the image data
        image_binary = image_data['data']

        # Create a response with the image data and content type
        response = Response(image_binary, content_type='image/jpeg')  # Adjust content type as needed

        return response
    else:
        return jsonify({'message': 'Image not found'}), 404


if __name__ == '__main__':
    app.run()
