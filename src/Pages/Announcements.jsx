import React, { useEffect, useState } from "react";
import axios from "axios";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/announcements`);
                setAnnouncements(res.data || []);
            } catch (err) {
                setError("Failed to load announcements.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) return <p className="text-white">Loading announcements...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (announcements.length === 0) return <p className="text-white">No announcements found.</p>;

    return (
        <div
            className="min-h-screen bg-cover bg-center relative p-6"

        >

            <div className="absolute inset-0 "></div>

            {/* Content */}
            <div className="relative max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-blue-400">📢 Announcements</h2>
                <ul className="space-y-6">
                    {announcements.map(({ _id, title, description, createdAt, authorEmail }) => (
                        <li
                            key={_id}
                            className="p-5 border rounded shadow-md"
                            style={{
                                backgroundImage: "url('https://i.ibb.co/q3HbMqxC/Gemini-Generated-Image-yha1skyha1skyha1.png')",
                            }}
                        >
                            <h3 className="text-xl font-semibold text-purple-700 mb-1">{title}</h3>
                            <p className="text-gray-800 ">{description}</p>
                            <div className="mt-3 text-sm text-gray-800">
                                <span>📧 {authorEmail}</span>
                                <span className="ml-4">🕒 {new Date(createdAt).toLocaleString()}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Announcements;
