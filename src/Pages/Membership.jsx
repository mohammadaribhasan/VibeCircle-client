import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase.config";

const Membership = () => {
    const [user] = useAuthState(auth);
    const [inputEmail, setInputEmail] = useState("");
    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch user info to check membership status
        if (user?.email) {
            setLoading(true);
            fetch(`${import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app"}/api/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsMember(data.membership === "gold" || data.member === true);
                })
                .catch(() => {
                    toast.error("Failed to fetch user membership info");
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleMembershipPayment = async () => {
        if (!user) {
            toast.error("Please log in first.");
            return;
        }

        if (inputEmail.trim().toLowerCase() !== user.email.toLowerCase()) {
            toast.error("Email doesn't match your logged-in account.");
            return;
        }

        if (isMember) {
            toast.success("You are already a Gold Member!");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app"}/api/users/member/${user.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (data.modifiedCount > 0) {
                toast.success("🎉 You are now a Gold Member! 😘");
                setIsMember(true); // Update state to reflect membership upgrade
            } else {
                toast.error("Membership upgrade failed 😢");
            }
        } catch (error) {
            toast.error("Something went wrong 😓");
            console.error(error);
        }
    };

    if (loading) return <p className="text-center mt-10 text-lg">Loading membership info...</p>;

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 max-w-lg text-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white"></h2>
                {isMember ? (
                    <>
                        <p className="text-lg text-green-600 dark:text-green-400 font-semibold">
                            You are already a Gold Member! 🎉
                        </p>
                        <img
                            className="mx-auto mt-4 w-24 h-24"
                            src="https://i.ibb.co/5g2KJXSQ/gold-removebg-preview.png"
                            alt="Gold Badge"
                        />
                    </>

                ) : (
                    <>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Pay <strong>100৳</strong> to unlock unlimited posts and receive a gold badge!
                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email to verify"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
                        />

                        <button
                            onClick={handleMembershipPayment}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-white px-6 py-3 rounded-xl font-semibold"
                        >
                            Pay & Upgrade
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Membership;
