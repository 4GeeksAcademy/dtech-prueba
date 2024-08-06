import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const PostItem = ({ post }) => {
    const { actions } = useContext(Context);

    const handleLike = async () => {
        await actions.likePost(post.id);
        // Actualiza la lista de publicaciones para reflejar el nuevo like
        actions.fetchPosts();
    };

    return (
        <div className="post-item">
            <div className="post-header">
                <img src={post.author.avatar} alt={`${post.author.username}'s avatar`} className="avatar" />
                <div className="post-author">
                    <span>{post.author.username}</span>
                    <span className="post-location">{post.location}</span>
                </div>
            </div>
            <img src={post.image} alt="Post" className="post-image" />
            <div className="post-content">
                <div className="post-info">
                    <span>{post.author.username}</span>
                    <span>{post.message}</span>
                </div>
                <div className="post-footer">
                    <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                    <button className="like-button" onClick={handleLike}>❤️ {post.likes.length}</button>
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        likes: PropTypes.array.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
        created_at: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
    }).isRequired,
};

export default PostItem;
