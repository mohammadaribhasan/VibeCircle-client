import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { valueConText } from "../RootLayout/RootLayout";
import { FacebookShareButton, FacebookIcon } from "react-share";
import toast from "react-hot-toast";

const PostDetails = () => {
  const { _id } = useParams();
  const { user } = useContext(valueConText);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app";
  const token = localStorage.getItem("access-token");

  // Fetch post details and comments
  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        // Fetch post
        const res = await axios.get(`${baseURL}/api/posts/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(res.data);

        // Fetch comments for this post
        const commentsRes = await axios.get(`${baseURL}/api/comments/post/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(commentsRes.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load post or comments 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [_id]);

  // Submit a comment
  const handleCommentSubmit = async () => {
    if (!user) return toast.error("Please log in to comment 😘");
    if (!comment.trim()) return toast.error("Comment can't be empty");

    const commentData = {
      text: comment.trim(),
      author: {
        name: user.displayName || "Anonymous",
        email: user.email,
        image: user.photoURL || null,
      },
    };

    try {
      await axios.post(`${baseURL}/api/posts/${_id}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update comments state by prepending new comment
      setComments((prev) => [
        { ...commentData, createdAt: new Date().toISOString() },
        ...prev,
      ]);
      setComment("");
      setShowCommentInput(false);
      toast.success("Comment added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    }
  };

  // Handle voting (upvote or downvote)
  const handleVote = async (type) => {
    if (!user) return toast.error("Please log in to vote");

    try {
      await axios.post(`${baseURL}/api/posts/${_id}/votes`, {
        type,
        user: {
          email: user.email,
        },
      });

      // Refresh post data (votes)
      const res = await axios.get(`${baseURL}/api/posts/${_id}`);
      setPost(res.data);
      toast.success("Vote recorded");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to vote");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!post) return <p className="text-center mt-10">Post not found 😢</p>;

  const shareUrl = window.location.href;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6">
        {post.author?.image ? (
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 bg-gray-300 rounded-full" />
        )}
        <div>
          <p className="font-semibold text-lg">{post.author?.name || "Unknown Author"}</p>
          <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {/* Post Title & Description */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4 whitespace-pre-line">{post.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Actions: Comment, Upvote, Downvote, Share */}
      <div className="flex items-center gap-6 mb-6">
        <button
          onClick={() => setShowCommentInput(true)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Comment
        </button>

        <button
          onClick={() => handleVote("upvote")}
          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
        >
          👍 <span>{post.upVote || 0}</span>
        </button>

        <button
          onClick={() => handleVote("downvote")}
          className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          👎 <span>{post.downVote || 0}</span>
        </button>

        <FacebookShareButton url={shareUrl} quote={post.title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-3">
          Comments ({comments.length})
        </h2>

        {user && showCommentInput && (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-grow px-3 py-2 border rounded"
              autoFocus
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
            >
              Comment
            </button>
          </div>
        )}

        {!user && <p className="text-red-500 mb-4">Please log in to comment.</p>}

        {comments.length > 0 ? (
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-3 border-b pb-3">
                {c.author?.image ? (
                  <img
                    src={c.author.image}
                    alt={c.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                )}
                <div>
                  <p className="font-semibold">{c.author?.name || "Anonymous"}</p>
                  <p className="text-sm text-gray-600">{c.text}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
