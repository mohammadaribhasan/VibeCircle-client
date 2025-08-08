import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ReportedActivities = () => {
  const [reports, setReports] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/reports`)
      .then((res) => setReports(res.data))
      .catch((err) => {
        console.error("Failed to fetch reports", err);
        toast.error("Failed to load reports");
      });
  }, []);

  const dismissReport = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/reports/${id}`);
      setReports((prev) => prev.filter((r) => r._id !== id));
      toast.success("Report dismissed");
    } catch (err) {
      console.error("Failed to dismiss report", err);
      toast.error("Dismiss failed");
    }
  };

  const deleteComment = async (commentId, reportId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${commentId}`);
      await dismissReport(reportId);
      toast.success("Comment deleted and report dismissed");
    } catch (err) {
      console.error("Failed to delete comment", err);
      toast.error("Failed to delete comment");
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Reported Activities</h2>
      {reports.length === 0 ? (
        <p className="text-white/70">No reports found.</p>
      ) : (
        reports.map((report) => {
          const commentText =
            report.targetInfo?.commentText ||
            report.comment?.text ||
            "Comment not found";

          const isLong = commentText.length > 100;
          const isExpanded = expanded[report._id];

          return (
            <div
              key={report._id}
              className="border p-4 mb-4 rounded bg-gray-900 text-white/80 shadow"
            >
              <p>
                <strong>Reported By:</strong>{" "}
                {report.reportedBy?.name || "Unknown"} (
                {report.reportedBy?.email || "N/A"})
              </p>

              <p>
                <strong>Commented By:</strong>{" "}
                {report.targetInfo?.commentAuthorName || "Unknown"} (
                {report.targetInfo?.commentAuthorEmail || "N/A"})
              </p>

              <p>
                <strong>Comment:</strong>{" "}
                {isLong && !isExpanded
                  ? `${commentText.slice(0, 100)}...`
                  : commentText}
                {isLong && (
                  <button
                    onClick={() => toggleExpand(report._id)}
                    className="text-blue-400 ml-2 underline"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </p>

              <p>
                <strong>Reason:</strong>{" "}
                {report.feedback || "No reason provided"}
              </p>

              <div className="flex gap-4 mt-3">
                <button
                  onClick={() =>
                    deleteComment(report.targetInfo?.commentId, report._id)
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete Comment
                </button>
                <button
                  onClick={() => dismissReport(report._id)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Dismiss Only
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ReportedActivities;
