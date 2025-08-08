import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Firebase.config";
import { useEffect, useState } from "react";
import axios from "axios";
import Badge from "../../Component/Badge";
import PostCard from "../PostCard";
import useMembershipBadge from "../../hooks/useMembershipBadge";

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const badge = useMembershipBadge(user?.email);
    const baseURL = import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app";

    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`${baseURL}/api/posts/user/${user.email}`)
            .then((res) => setPosts(res.data.slice(0, 3)))
            .catch((err) => console.error(err));
    }, [user]);

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <div className="flex items-center gap-4 mb-4 relative">
                <div className="relative">
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
                    />
                    <img
                        src={
                            badge === "gold"
                                ? "https://i.ibb.co/5g2KJXSQ/gold-removebg-preview.png"
                                : "https://i.ibb.co/TBSt0rWx/bronze-removebg-preview.png"
                        }
                        alt={`${badge} badge`}
                        className="w-6 h-6 absolute bottom-0 right-0 rounded-full bg-white p-1"
                        title={badge === "gold" ? "Gold Member" : "Bronze Member"}
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-bold">{user.displayName}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <Badge email={user.email} />
                </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">Recent Posts</h3>
            {posts.length > 0 ? (
                <PostCard posts={posts} />
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default MyProfile;
