import React, { useEffect, useState } from "react";
import axios from "axios";

const Tags = ({ onTagClick }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/tags`)
            .then((res) => setTags(res.data))
            .catch((err) => console.error("Failed to fetch tags", err));
    }, []);

    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Explore Tags</h2>
            <div className="flex flex-wrap gap-3 justify-center">
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => onTagClick(tag.name)}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition duration-200 text-sm"
                    >
                        #{tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tags;
