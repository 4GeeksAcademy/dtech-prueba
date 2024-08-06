from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=True)
    surname = db.Column(db.String(120), unique=True, nullable=True)
    avatar = db.Column(db.String(120), unique=True, nullable=True)

    posts = db.relationship('Post', backref='author', lazy=True)
    likes = db.relationship('PostLike', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "surname": self.surname,
            "avatar": self.avatar
        }

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    location = db.Column(db.String(30), nullable=False)
    status = db.Column(db.String(10), nullable=False, default='drafted')

    likes = db.relationship('PostLike', backref='post', lazy=True)

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "image": self.image,
            "message": self.message,
            "author": self.author.serialize(),
            "created_at": self.created_at,
            "location": self.location,
            "status": self.status,
            "likes": [like.user.serialize() for like in self.likes]
        }


class PostLike(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<PostLike {self.user_id} likes {self.post_id}>'

    def serialize(self):
        return {
            "user_id": self.user_id,
            "post_id": self.post_id,
            "timestamp": self.timestamp
        }
