import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PostItem from "../component/PostItem.jsx";
import "../../styles/posts.css";

export const Posts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchPosts();
    }, []);

    return (
        <div className="posts-container">
            {store.posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                store.posts.map(post => <PostItem key={post.id} post={post} />)
            )}
        </div>
    );
};


