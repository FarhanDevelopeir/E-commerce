

import { selectLoggedInUser } from '../authSlice'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

export default function Protected({children}) {

    const user = useSelector(selectLoggedInUser);

    console.log(user)

     if (!user.token) {
        return <Navigate to="/login" replace />;
    }
    return children;

}