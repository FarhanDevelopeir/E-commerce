

import { selectLoggedInUser } from '../authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUser } from '../authSlice';

export default function Protected({ children }) {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    const token = getCookie('token');
    console.log(token);

    if (user.token || token) {
        if (!user.token && token) {
            dispatch(setUser({ token: token }));
        }
        return children;
    }

    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

