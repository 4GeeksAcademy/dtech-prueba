import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ExportImportPosts from "../component/ExportImportPosts.jsx";
import "../../styles/posts.css";
import { FaHeart } from "react-icons/fa";

export const Posts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchPosts();
    }, []);

    const handleLike = (postId) => {
        actions.likePost(postId);
    };

    return (
        <div className="posts-container">
            <div className="posts-list">
                {store.searchResults.length > 0 ? (
                    store.searchResults.map(post => (
                        <div key={post.id} className="post-item">
                            <div className="post-header">
                                <img src={post.author.avatar} alt={`${post.author.username}'s avatar`} className="avatar" />
                                <div className="post-author">
                                    <span>{post.author.username}</span>
                                    <span className="post-location mx-2">{post.location}</span>
                                </div>
                            </div>
                            <img src={post.image} alt="Post" className="post-image" />
                            <p>{post.message}</p>
                            <div className="post-meta">
                                <span className="post-likes">
                                    <FaHeart onClick={() => handleLike(post.id)} />
                                    {post.likes.length}
                                </span>
                                <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    store.posts.map(post => (
                        <div key={post.id} className="post-item">
                            <div className="post-header">
                                <img src={post.author.avatar} alt={`${post.author.username}'s avatar`} className="avatar" />
                                <div className="post-author">
                                    <span>{post.author.username}</span>
                                    <span className="post-location mx-2">{post.location}</span>
                                </div>
                            </div>
                            <img src={post.image} alt="Post" className="post-image" />
                            <p>{post.message}</p>
                            <div className="post-meta">
                                <span className="post-likes">
                                    <FaHeart onClick={() => handleLike(post.id)} />
                                    {post.likes.length}
                                </span>
                                <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
