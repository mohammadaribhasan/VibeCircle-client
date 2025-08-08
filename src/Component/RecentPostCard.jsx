import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ posts }) => {
    const navigate = useNavigate();

    if (!Array.isArray(posts) || posts.length === 0) {
        return <p className="text-center mt-10">No posts found 😢</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {posts.map((post) => {
                const voteCount = (post.upVote || 0) - (post.downVote || 0);
                const commentsCount = post.commentsCount || 0;
                const createdAt = new Date(post.createdAt);

                return (
                    <div
                        key={post._id}
                        onClick={() => navigate(`/posts/${post._id}`)}
                        className="relative rounded-lg shadow p-5 cursor-pointer overflow-hidden hover:shadow-md transition duration-200 transform hover:scale-105 bg-cover bg-center"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                navigate(`/posts/${post._id}`);
                            }
                        }}
                        style={{
                            backgroundImage: `url('https://i.ibb.co/q344sXY4/Gemini-Generated-Image-gm0xwkgm0xwkgm0x.png')`,
                        }}
                        aria-label={`View post titled ${post.title}`}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>


                        <div className="relative z-10 text-white flex flex-col h-full">
                            {/* Author Info */}
                            <div className="flex items-center gap-3 mb-3">
                                {post.author?.image ? (
                                    <img
                                        src={post.author.image}
                                        alt={post.author.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                                )}
                                <div>
                                    <p className="font-medium">
                                        {post.author?.name || "Unknown Author"}
                                    </p>
                                    <p className="text-sm text-gray-300 leading-tight">
                                        {createdAt.toLocaleDateString()} <br />
                                        <span className="text-xs text-gray-400">
                                            {createdAt.toLocaleTimeString()}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-xl font-semibold text-blue-300 mb-3 line-clamp-2">
                                {post.title}
                            </h2>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags?.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Footer: Comments + Votes */}
                            <div className="mt-auto flex justify-between text-sm text-white">
                                <span>💬 {commentsCount} Comments</span>
                                <span>📊 {voteCount} Votes</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PostCard;
