import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import SearchBar from "./SearchBar.jsx";
import "../../styles/navbar.css"; 

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    const handleExport = () => {
        actions.exportPosts();
    };

    const handleSearch = (term) => {
        actions.searchPosts(term);
    };

    if (!store.token) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/posts">MyInstagramApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto"> {/* Centramos el contenido */}
                        <li className="nav-item">
                        <SearchBar onSearch={handleSearch} />
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Post
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/create-post">Create Post</Link></li>
                                <li><Link className="dropdown-item" to="/user-posts">User Posts</Link></li>
                                <li><button className="dropdown-item" onClick={handleExport}>Export Post</button></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
