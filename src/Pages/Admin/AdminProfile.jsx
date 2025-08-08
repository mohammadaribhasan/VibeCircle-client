import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Firebase.config";
import axios from "axios";
import toast from "react-hot-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
    const [user] = useAuthState(auth);
    const [stats, setStats] = useState({ posts: 0, comments: 0, users: 0 });
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/admin/stats`)
            .then((res) => setStats(res.data))
            .catch((err) => console.error("Failed to fetch stats", err));
    }, []);

    // Fetch tags from backend
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tags`)
            .then((res) => setTags(res.data))
            .catch((err) => console.error("Failed to fetch tags", err));
    }, []);

    // Handle new tag submission
    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!newTag.trim()) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tags`, {
                name: newTag.trim(),
            });
            setTags([...tags, res.data]);
            setNewTag("");
            toast.success("Tag added successfully!");
        } catch (error) {
            console.error("Failed to add tag", error);
            toast.error("Failed to add tag.");
        }
    };

    const chartData = [
        { name: "Posts", value: stats.posts },
        { name: "Comments", value: stats.comments },
        { name: "Users", value: stats.users },
    ];

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            {/* Admin Profile */}
            <div className="flex items-center gap-4">
                <img src={user?.photoURL} className="w-16 h-16 rounded-full" alt="Admin Avatar" />
                <div>
                    <h2 className="text-xl text-white font-bold">{user?.displayName || "Admin"}</h2>
                    <p className="text-white">{user?.email}</p>
                </div>
            </div>

            {/* Stats Pie Chart */}
            <div className="w-full flex justify-center">
                <PieChart width={300} height={300}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>

            {/* Add New Tag */}
            <div className="border p-4 rounded-lg shadow bg-white dark:bg-gray-800">
                <h3 className="text-lg text-white font-semibold mb-2">Add New Tag</h3>
                <form onSubmit={handleAddTag} className="flex gap-2">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Enter new tag"
                        className="border px-3 py-2 rounded w-full  dark:text-white"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </form>

                {/* Display Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag._id}
                            className="px-3 py-1 text-sm rounded-full text-black bg-gray-200"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
