import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Firebase.config";
import axios from "axios";
import { useEffect, useState } from "react";
import PostForm from "../../Component/PostForm";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const [user] = useAuthState(auth);
    const [postCount, setPostCount] = useState(0);
    const [isGoldMember, setIsGoldMember] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app";

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                // ✅ Get user posts
                const postRes = await axios.get(`${baseURL}/api/posts/user/${user.email}`);
                setPostCount(postRes.data.length);

                // ✅ Get membership data
                const userRes = await axios.get(`${baseURL}/api/users/${user.email}`);
                const userData = userRes.data;
                const isGold =
                    userData?.membership === "gold" || userData?.member === true;
                setIsGoldMember(isGold);
            } catch (err) {
                console.error("Error fetching user info:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    // ✅ Show loading
    if (!user || loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] p-6 text-center">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
                    Loading...
                </p>
            </div>
        );
    }

    // ✅ Restrict only free users after 5 posts
    if (!isGoldMember && postCount >= 5) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[60vh] text-center p-6 max-w-xl mx-auto">
                <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">
                    You’ve reached your post limit. Become a member to add more posts.
                </p>
                <button
                    onClick={() => navigate("/membership")}
                    className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                    Become a Member
                </button>
            </div>
        );
    }


    return (
        <div className="px-4 py-8 max-w-3xl mx-auto">
            <PostForm user={user} />
        </div>
    );
};

export default AddPost;
