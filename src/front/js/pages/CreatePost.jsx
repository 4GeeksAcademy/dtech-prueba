import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/createPost.css";

export const CreatePost = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: "",
        message: "",
        location: "",
        status: "published"
    });
    const [error, setError] = useState("");

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const { image, message, location, status } = formData;
        if (!image || !message || !location) {
            setError("All fields are required.");
            return;
        }
        const success = await actions.createPost(image, message, location, status);
        if (success) {
            actions.fetchPosts();
            navigate("/posts");
        } else {
            setError("Failed to create post. Please try again.");
        }
    };

    useEffect(() => {
        actions.fetchPosts();
    }, []);

    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="published">Published</option>
                        <option value="drafted">Drafted</option>
                    </select>
                </div>
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

