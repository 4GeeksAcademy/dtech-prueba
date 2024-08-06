"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, PostLike
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    new_user = User(
        username=data['username'],
        password=hashed_password.decode('utf-8'),  # Guardamos la contraseña encriptada como string
        name=data['name'],
        surname=data['surname'],
        avatar=data.get('avatar')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful!', 'access_token': access_token}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401


@api.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    current_user_id = get_jwt_identity()  # Obtiene el ID del usuario autenticado
    data = request.get_json()
    new_post = Post(
        image=data['image'],
        message=data['message'],
        author_id=current_user_id,  # Usar el ID del usuario autenticado
        location=data['location'],
        status=data['status']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully!'}), 201

@api.route('/posts', methods=['GET'])
@jwt_required()
def get_posts():
    current_user_id = get_jwt_identity()  # Obtiene el ID del usuario autenticado
    posts = Post.query.filter_by(author_id=current_user_id).order_by(Post.created_at.desc()).all()
    return jsonify([post.serialize() for post in posts]), 200


@api.route('/posts/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    current_user_id = get_jwt_identity()  # Obtiene el ID del usuario autenticado
    post = Post.query.get_or_404(post_id)

    if any(like.user_id == current_user_id for like in post.likes):
        return jsonify({'message': 'You have already liked this post!'}), 400

    new_like = PostLike(user_id=current_user_id, post_id=post_id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify({'message': 'Post liked successfully!'}), 201