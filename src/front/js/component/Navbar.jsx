import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";

export const Navbar = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/posts" className="navbar-brand">
                    MyApp
                </Link>
                <div className="navbar-menu">
                    <Link to="/create-post" className="navbar-item">
                        Create Post
                    </Link>
                    <button onClick={handleLogout} className="navbar-item logout-button">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

