import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase.config"; // adjust path as needed

const feedbackOptions = [
    "Spam or inappropriate",
    "Offensive language",
    "Irrelevant content",
];

const CommentsPage = () => {
    const { postId } = useParams();
    const [user] = useAuthState(auth); // 👈 Firebase user
    const [postTitle, setPostTitle] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reportedComments, setReportedComments] = useState(new Set());
    const [modalComment, setModalComment] = useState(null);
    useEffect(() => {
        const baseURL = import.meta.env.VITE_API_URL;

        // Fetch post title
        axios
            .get(`${baseURL}/api/posts/${postId}`)
            .then((res) => {
                setPostTitle(res.data.title || "");
            })
            .catch((err) => {
                console.error("Failed to fetch post title", err);
                setPostTitle("");
            });

        // Fetch comments
        axios
            .get(`${baseURL}/api/comments/post/${postId}`)
            .then((res) => {
                const sorted = res.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setComments(sorted);
            })
            .catch((err) => console.error("Failed to fetch comments", err));
    }, [postId]);

    const handleFeedbackChange = (commentId, feedback) => {
        setSelectedFeedback((prev) => ({ ...prev, [commentId]: feedback }));
    };

    const handleReport = async (comment) => {
        const feedback = selectedFeedback[comment._id];
        if (!feedback || !user) return;

        const reportedBy = {
            email: user.email,
            name: user.displayName || "Anonymous",
            image: user.photoURL || null,
        };

        const targetInfo = {
            postId,
            commentId: comment._id,
            commentText: comment.text,
            commentAuthorName: comment.author?.name,
            commentAuthorEmail: comment.author?.email,
            commentAuthorImage: comment.author?.image,
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/reports`, {
                commentId: comment._id,
                feedback,
                reportedBy,
                targetInfo,
            });

            setReportedComments((prev) => new Set(prev).add(comment._id));
            toast.success("Report sent successfully");
        } catch (error) {
            console.error("Failed to report comment", error);
            toast.error("Failed to send report");
        }
    };

    const truncateText = (text, length = 20) => {
        if (text.length <= length) return text;
        return text.slice(0, length) + "...";
    };

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <Toaster position="top-right" />

            <h2 className="text-3xl font-bold mb-6 text-white">
                Comments for: {postTitle || `Post ${postId}`}
            </h2>

            {comments.length === 0 ? (
                <p className="text-white/70">No comments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] table-auto border border-collapse text-white">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="border px-3 py-2 text-left">Comment By</th>
                                <th className="border px-3 py-2 text-left">Comment</th>
                                <th className="border px-3 py-2 text-left">Reason</th>
                                <th className="border px-3 py-2 text-center">Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((c, idx) => (
                                <tr key={idx} className="border bg-gray-900">
                                    <td className="border px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={c.author?.image}
                                                alt={c.author?.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">{c.author?.name}</p>
                                                <p className="text-sm text-gray-400">{c.author?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border px-3 py-2 max-w-xs">
                                        {c.text.length > 20 ? (
                                            <>
                                                {truncateText(c.text)}{" "}
                                                <button
                                                    className="text-blue-400 underline"
                                                    onClick={() => setModalComment(c.text)}
                                                >
                                                    Read More
                                                </button>
                                            </>
                                        ) : (
                                            c.text
                                        )}
                                    </td>
                                    <td className="border px-3 py-2">
                                        <select
                                            disabled={reportedComments.has(c._id)}
                                            value={selectedFeedback[c._id] || ""}
                                            onChange={(e) => handleFeedbackChange(c._id, e.target.value)}
                                            className="border rounded px-2 py-1 bg-gray-800 text-white"
                                        >
                                            <option value="">Select feedback</option>
                                            {feedbackOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border px-3 py-2 text-center">
                                        {reportedComments.has(c._id) ? (
                                            <span className="text-green-400 font-semibold">Reported ✓</span>
                                        ) : (
                                            <button
                                                disabled={!selectedFeedback[c._id]}
                                                onClick={() => handleReport(c)}
                                                className={`px-3 py-1 rounded ${!selectedFeedback[c._id]
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-red-600 text-white hover:bg-red-700"
                                                    }`}
                                            >
                                                Report
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Read More Modal */}
            {modalComment && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setModalComment(null)}
                >
                    <div
                        className="bg-gray-900 text-white p-6 rounded max-w-lg max-h-[80vh] overflow-auto shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-bold mb-4">Full Comment</h3>
                        <p>{modalComment}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded"
                            onClick={() => setModalComment(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentsPage;
