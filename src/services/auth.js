import { jwtDecode } from "jwt-decode";

const setToken = (token) => localStorage.setItem('token', token);

const getToken = () => localStorage.getItem('token');

const getUserEmail = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.sub;
    }
    return null;
};

const getUserRole = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.role;
    }
    return null;
};

const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return Date.now() < payload.exp * 1000;
    }
    return false;
};

const SignIn = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/login", { email, password });
        const token = response.data.token;
        setToken(token);
        return response.data;
    } catch (error) {
        throw new Error('Login failed: ' + (error.response?.data || 'An error occurred'));
    }
};

const SignOut = () => localStorage.clear();

export const authService = { getToken, setToken, getUserEmail, getUserRole, isLoggedIn, SignIn, SignOut };
