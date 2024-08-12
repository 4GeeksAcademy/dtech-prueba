import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PostItem from "../component/PostItem.jsx";
import "../../styles/posts.css";

export const UserPosts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchUserPosts();
    }, []);

    return (
        <div className="posts-container">
            {store.userPosts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                store.userPosts.map(post => <PostItem key={post.id} post={post} />)
            )}
        </div>
    );
};

