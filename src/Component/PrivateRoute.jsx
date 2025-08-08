import React, { useContext } from 'react';

import { valueConText } from '../RootLayout/RootLayout';
import { Navigate, useLocation } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/Firebase.config';

const PrivateRoute = ({ children }) => {
    const [user] = useAuthState(auth);
    const { loading } = useContext(valueConText);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
                Checking authentication...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/loginfirst" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
