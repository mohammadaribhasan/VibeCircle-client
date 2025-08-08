import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router";
import { valueConText } from "../RootLayout/RootLayout";
import axios from "axios";
import toast from "react-hot-toast";

const PostForm = () => {
    const { user } = useContext(valueConText);
    const navigate = useNavigate();

    const [selectedTags, setSelectedTags] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [tagOptions, setTagOptions] = useState([]);

    // ✅ Fetch tags from backend
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tags`);
                const tagList = res.data.map((tag) => ({
                    value: tag.name,
                    label: tag.name,
                }));
                setTagOptions(tagList);
            } catch (err) {
                console.error("Failed to fetch tags", err);
                toast.error("Failed to load tags");
            }
        };

        fetchTags();
    }, []);

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title: formData.title,
            description: formData.description,
            tags: selectedTags.map((tag) => tag.value),
            upVote: 0,
            downVote: 0,
            createdAt: new Date().toISOString(),
            authorEmail: user.email,
            author: {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
            },
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/posts`,
                postData
            );

            if (res.data.insertedId || res.data.acknowledged) {
                toast.success("Post added successfully");
                setFormData({ title: "", description: "" });
                setSelectedTags([]);
                navigate("/dashboard/my-posts");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add post");
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl font-semibold text-red-500">
                    Please log in to add a post.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-bold mb-6">Add New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="font-medium block">Author Name</label>
                    <input
                        type="text"
                        value={user.displayName}
                        disabled
                        className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="font-medium block">Author Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="font-medium block">Author Image</label>
                    <input
                        type="text"
                        value={user.photoURL}
                        disabled
                        className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div>
                    <label className="font-medium block">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="font-medium block">Post Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="font-medium block mb-1 text-white">Tags</label>
                    <Select
                        isMulti
                        options={tagOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        placeholder="Select tags..."
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: '#000',
                                color: '#fff',
                                borderColor: '#333',
                            }),
                            menu: (base) => ({
                                ...base,
                                backgroundColor: '#000',
                                color: '#fff',
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? '#222' : '#000',
                                color: '#fff',
                                cursor: 'pointer',
                            }),
                            multiValue: (base) => ({
                                ...base,
                                backgroundColor: '#222',
                                color: '#fff',
                            }),
                            multiValueLabel: (base) => ({
                                ...base,
                                color: '#fff',
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: '#aaa',
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '#fff',
                            }),
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;
