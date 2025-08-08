import { useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Firebase.config";

const MakeAnnouncement = () => {
    const [user] = useAuthState(auth);
    const [form, setForm] = useState({ title: "", description: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/announcements`, {
                ...form,
                authorEmail: user?.email,
                authorName: user?.displayName,
                authorImage: user?.photoURL,
            });
            alert("Announcement posted");
            setForm({ title: "", description: "" });
        } catch (error) {
            console.error("Failed to post announcement:", error);
            alert("Failed to post announcement");
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h2 className="text-2xl text-white font-bold mb-4">Make Announcement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-white/60"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white placeholder-white/60"
                    required
                ></textarea>
                <button className="bg-purple-600 text-white px-4 py-2 rounded">Post</button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
