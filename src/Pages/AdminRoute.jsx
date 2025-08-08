import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { auth } from "../Firebase/Firebase.config";

const AdminRoute = ({ children }) => {
    const [user] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!user?.email) {
            setChecking(false);
            return;
        }

        console.log("🟢 Logged in user:", user.email);
        setChecking(true);

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/users/${user.email}`)
            .then((res) => {
                console.log("✅ Full backend user response:", res.data);
                if (res.data?.isAdmin === true) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch((error) => {
                console.error("❌ Error fetching user:", error);
                setIsAdmin(false);
            })
            .finally(() => {
                setChecking(false);
            });
    }, [user]);

    if (!user) {
        return <p className="text-center mt-10 text-lg">Please login first.</p>;
    }

    if (checking) {
        return <p className="text-center mt-10 text-lg">Checking admin status...</p>;
    }

    if (!isAdmin) {
        return (
            <p className="text-center mt-10 text-red-500 text-lg">
                Access Denied. You are not an admin.
            </p>
        );
    }

    return <>{children}</>;
};

export default AdminRoute;
