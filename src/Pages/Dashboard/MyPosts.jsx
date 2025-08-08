import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../../Firebase/Firebase.config";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app";

    useEffect(() => {
        if (!user) return;

        axios
            .get(`${baseURL}/api/posts/user/${user.email}`)
            .then((res) => setPosts(res.data))
            .catch((err) => console.error(err));
    }, [user]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseURL}/api/posts/${id}`);
            setPosts(posts.filter((p) => p._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleComments = (postId) => {
        navigate(`/comments/${postId}`);
    };

    return (
        <div className="overflow-x-auto mt-10">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-white">Title</th>
                        <th className="text-white">Votes</th>
                        <th className="text-white">Comment</th>
                        <th className="text-white">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post._id}>
                            <td>{post.title}</td>
                            <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                            <td>
                                <button onClick={() => handleComments(post._id)} className="btn">💬</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(post._id)} className="btn">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPosts;
