const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: localStorage.getItem("token") || null,
            user: localStorage.getItem("user") || null,
            posts: [],
			userPosts: []
        },
        actions: {
            register: async formData => {
                console.log("Antes de fetch: ", formData);
                try {
                    const response = await fetch("https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (response.ok) {
                        console.log("Form sent successfully");
                        return { success: true };
                    } else {
                        if (data.error === 'Email already exists.') {
                            console.error("Email already exists.");
                            return { success: false, error: 'Email already exists.' };
                        } else {
                            console.error("Error submitting form:", data.error || data.message);
                            return { success: false, error: data.error || data.message };
                        }
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return { success: false, error: "An error occurred. Please try again." };
                }
            },
            
            login: async loginData => {
                try {
                    const response = await fetch("https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(loginData)
                    });

                    if (response.headers.get("content-type").includes("application/json")) {
                        const data = await response.json();
                        if (response.ok) {
                            localStorage.setItem("token", data.access_token);
                            setStore({ token: data.access_token, user: loginData.username });
                            return { success: true, error: null };
                        } else {
                            return { success: false, error: data.error };
                        }
                    } else {
                        throw new Error("Response is not JSON");
                    }
                } catch (error) {
                    return { success: false, error: "Request error: " + error.message };
                }
            },

            getUserInfo: async () => {
                const store = getStore();
                try {
                    const response = await fetch("https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/user", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${store.token}`,
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ user: data });
                        return data;
                    } else {
                        throw new Error("Error fetching user info");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return null;
                }
            },

            createPost: async (image, message, location, status) => {
                const store = getStore();
                try {
                    const response = await fetch('https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        },
                        body: JSON.stringify({ image, message, location, status })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data.message);
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error(errorData.message);
                        return false;
                    }
                } catch (error) {
                    console.error('Error:', error);
                    return false;
                }
            },

            fetchPosts: async () => {
                const store = getStore();
                try {
                    const response = await fetch('https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/posts', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        if (response.headers.get("content-type").includes("application/json")) {
                            const data = await response.json();
                            setStore({ posts: data });
                        } else {
                            console.error('Response is not JSON');
                            const errorText = await response.text();
                            console.error('Response text:', errorText);
                        }
                    } else {
                        const errorData = await response.json();
                        console.error('Error fetching posts:', errorData);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            },

            likePost: async (postId) => {
                const store = getStore();
                try {
                    const response = await fetch(`https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/posts/${postId}/like`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data.message);
                        return true;
                    } else {
                        const errorData = await response.json();
                        console.error(errorData.message);
                        return false;
                    }
                } catch (error) {
                    console.error('Error:', error);
                    return false;
                }
            },

			fetchUserPosts: async () => {
                const store = getStore();
                try {
                    const response = await fetch('https://refactored-disco-xgx4rqr6pwv26g7-3001.app.github.dev/api/user/posts', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ userPosts: data });
                    } else {
                        console.error('Error fetching user posts');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            },

            logout: () => {
                localStorage.removeItem('token');
				localStorage.removeItem('user');
                setStore({ token: null, user: null, posts: [] });
            }
        }
    };
};

export default getState;
