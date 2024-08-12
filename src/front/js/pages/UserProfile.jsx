import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/userProfile.css";

export const UserProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUserInfo();
        actions.fetchUserPosts();
    }, []);

    return (
        <div className="user-profile-container">
            {store.user && (
                <div className="user-info">
                    <img src={store.user.avatar || "default-avatar.png"} alt="User Avatar" className="user-avatar" />
                    <h2>{store.user.username}</h2>
                    <p>{store.user.name} {store.user.surname}</p>
                </div>
            )}
            <div className="user-posts">
                <h3>My Posts</h3>
                {store.userPosts.length > 0 ? (
                    store.userPosts.map(post => (
                        <div key={post.id} className="post-item">
                            <img src={post.image} alt="Post" className="post-image" />
                            <p>{post.message}</p>
                            <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No posts yet</p>
                )}
            </div>
        </div>
    );
};

