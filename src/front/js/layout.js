import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";

import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Posts } from './pages/Posts.jsx';
import { CreatePost }  from './pages/CreatePost.jsx';
import { UserPosts } from './pages/UserPosts.jsx';
import { UserProfile } from './pages/UserProfile.jsx';

import { Navbar } from './component/Navbar.jsx';
import { Footer } from "./component/Footer.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route  path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/create-post" element={<CreatePost />} />
                        <Route path="/user-posts" element={<UserPosts />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
