import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../../styles/auth.css";

export const Register = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        surname: "",
        password: "",
        avatar: ""
    });
    const [creatingUser, setCreatingUser] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!formData.username) {
            errors.username = 'Username is required';
        }
        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.surname) {
            errors.surname = 'Surname is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });

        if (name === 'password') {
            evaluatePasswordStrength(value);
        }
    };

    const evaluatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[\W_]/.test(password)) strength += 1;

        setPasswordStrength(strength);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
            setCreatingUser(true);
            try {
                const response = await actions.register(formData);
                if (response.success) {
                    setFormData({
                        username: "",
                        name: "",
                        surname: "",
                        password: "",
                        avatar: ""
                    });
                    setCreatingUser(false);
                    navigate("/login");
                } else {
                    setErrors({ common: response.error });
                    setCreatingUser(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setErrors({ common: "An error occurred. Please try again." });
                setCreatingUser(false);
            }
        }
    };

    const getPasswordStrengthColor = (strength) => {
        switch (strength) {
            case 1:
                return "red";
            case 2:
                return "orange";
            case 3:
                return "yellow";
            case 4:
                return "lightgreen";
            case 5:
                return "green";
            default:
                return "red";
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h4 className="card-title text-center mb-4">Register</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <input
                            type="text"
                            className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                        />
                        {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">Avatar URL</label>
                        <input
                            type="text"
                            className={`form-control`}
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </span>
                        </div>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        <div className="password-strength">
                            <div 
                                className="password-strength-bar" 
                                style={{ 
                                    width: `${(passwordStrength / 5) * 100}%`, 
                                    backgroundColor: getPasswordStrengthColor(passwordStrength) 
                                }}
                            />
                        </div>
                        <p className="password-recommendations">
                            Password should be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.
                        </p>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
                    {creatingUser && <p className="text-center mt-3">
                        <span className="dot-flashing-container">
                            <span className="dot-flashing"></span>
                        </span>
                    </p>}
                </form>
                <div className="auth-footer">
                    <p className="mb-0">Already have an account? <Link to="/login" className="btn btn-link">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};
