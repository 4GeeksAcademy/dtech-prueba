import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/auth.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [loggingIn, setLoggingIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setLoggingIn(true);
            const response = await actions.login(loginData);
            if (response.success) {
                setLoginData({ username: "", password: "" });
                setLoggingIn(false);
                navigate("/posts");
            } else {
                setErrors({ common: response.error });
                setLoggingIn(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors({ common: "An error occurred. Please try again." });
            setLoggingIn(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h4 className="card-title mb-4">Log In</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            name="username"
                            value={loginData.username}
                            onChange={handleInputChange}
                            aria-describedby="usernameHelp"
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className="mb-3 password-container">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errors.password || (errors.common && !loginData.password) ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleInputChange}
                            />
                            <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        {(errors.password || (errors.common && !loginData.password)) && <div className="invalid-feedback">{errors.password || "Password is required"}</div>}
                    </div>
                    {errors.common && !errors.password && <div className="alert alert-danger">{errors.common}</div>}
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    {loggingIn && <p className="text-center mt-3">
                        <span className="dot-flashing-container">
                            <span className="dot-flashing"></span>
                        </span>
                    </p>}
                </form>
                <div className="auth-footer">
                    <p className="mb-0">Don't have an account? <Link to="/register" className="btn btn-link">Register</Link></p>
                </div>
            </div>
        </div>
    );
};
