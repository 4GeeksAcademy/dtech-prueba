import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import SearchBar from "../component/SearchBar.jsx";
import ExportImportPosts from "../component/ExportImportPosts.jsx";
import "../../styles/posts.css";
import { FaHeart } from "react-icons/fa";

export const Posts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchPosts();
    }, []);

    const handleSearch = (term) => {
        actions.searchPosts(term);
    };

    const handleLike = (postId) => {
        actions.likePost(postId);
    };

    return (
        <div className="posts-container">
            <SearchBar onSearch={handleSearch} />
            <ExportImportPosts /> {/* Agrega el componente aquí */}
            <div className="posts-list">
                {store.searchResults.length > 0 ? (
                    store.searchResults.map(post => (
                        <div key={post.id} className="post-item">
                            <img src={post.image} alt="Post" className="post-image" />
                            <p>{post.message}</p>
                            <div className="post-meta">
                                <span className="post-likes">
                                    <FaHeart onClick={() => handleLike(post.id)} />
                                    {post.likes.length}
                                </span>
                                <span className="post-location">{post.location}</span>
                                <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    store.posts.map(post => (
                        <div key={post.id} className="post-item">
                            <img src={post.image} alt="Post" className="post-image" />
                            <p>{post.message}</p>
                            <div className="post-meta">
                                <span className="post-likes">
                                    <FaHeart onClick={() => handleLike(post.id)} />
                                    {post.likes.length}
                                </span>
                                <span className="post-location">{post.location}</span>
                                <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
