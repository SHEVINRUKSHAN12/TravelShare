import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import jsPDF from "jspdf";

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/guides/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch guide details");
        return res.json();
      })
      .then(data => {
        setGuide(data);
        const likedGuides = JSON.parse(localStorage.getItem("likedGuides") || "[]");
        const isLiked = Array.isArray(likedGuides) && likedGuides.includes(data.id);
        setLiked(isLiked);
        setLikeCount(isLiked ? 1 : 0);

        const savedComments = JSON.parse(localStorage.getItem(`comments_${data.id}`) || "[]");
        setComments(savedComments);
      })
      .catch(err => setError(err.message));
  }, [id]);

  const toggleLike = () => {
    const likedGuides = JSON.parse(localStorage.getItem("likedGuides") || "[]");
    let updatedLikes = [];

    if (liked) {
      updatedLikes = likedGuides.filter(gid => gid !== guide.id);
      setLiked(false);
      setLikeCount(0);
    } else {
      updatedLikes = [...likedGuides, guide.id];
      setLiked(true);
      setLikeCount(1);
    }

    localStorage.setItem("likedGuides", JSON.stringify(updatedLikes));
  };

  const handleAddComment = () => {
    if (commentInput.trim() === "") return;
    const newComments = [...comments, commentInput.trim()];
    setComments(newComments);
    localStorage.setItem(`comments_${guide.id}`, JSON.stringify(newComments));
    setCommentInput("");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Title: ${guide.title}`, 10, 20);
    doc.text(`Destination: ${guide.destination}`, 10, 30);
    doc.text(`Category: ${guide.category}`, 10, 40);
    doc.text("Content:", 10, 50);
    doc.text(guide.content, 10, 60, { maxWidth: 180 });

    if (guide.tags && guide.tags.length > 0) {
      doc.text(`Tags: ${guide.tags.join(", ")}`, 10, 80);
    }

    doc.save(`${guide.title}-guide.pdf`);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!guide) return <p>Loading guide...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Navigation buttons in upper right */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '15px' 
      }}>
        <Link 
          to="/guides"
          style={{ textDecoration: 'none', color: '#27ae60' }}
        >
          ← Back to Guides
        </Link>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link 
            to="/guides" 
            style={{ 
              padding: '8px 12px', 
              backgroundColor: '#2980b9', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            View Guides
          </Link>
          <Link 
            to="/guides/create" 
            style={{ 
              padding: '8px 12px', 
              backgroundColor: '#27ae60', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Create Guide
          </Link>
        </div>
      </div>

      <h2 style={{
        background: "linear-gradient(to right, #2ecc71, #27ae60, #228b22)",
        color: "white",
        padding: "10px",
        borderRadius: "6px"
      }}>
        {guide.title}
      </h2>

      <p><strong>Destination:</strong> {guide.destination}</p>
      <p><strong>Category:</strong> {guide.category}</p>
      <p><strong>Content:</strong> {guide.content}</p>

      {guide.tags && guide.tags.length > 0 && (
        <p><strong>Tags:</strong> {guide.tags.map(tag =>
          tag.trim().startsWith("#") ? tag.trim() : `#${tag.trim()}`
        ).join(" ")}</p>
      )}

      {/* ❤️ Like Button */}
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <button
          onClick={toggleLike}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer"
          }}
          title="Like this guide"
        >
          {liked ? "❤️" : "🤍"} {likeCount}
        </button>
      </div>

      {/* 💬 Comment Section */}
      <div style={{ marginTop: "20px" }}>
        <h3>💬 Comments</h3>
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
          style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: "8px 12px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "10px"
          }}
        >
          Add Comment
        </button>
        <ul style={{ paddingLeft: "20px" }}>
          {comments.map((cmt, i) => (
            <li key={i} style={{ marginBottom: "6px" }}>{cmt}</li>
          ))}
        </ul>
      </div>

      {/* 📄 Download PDF */}
      <button
        onClick={downloadPDF}
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          padding: "8px 12px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        📄 Download PDF
      </button>

      <br />

      <Link
        to={`/guides/${guide.id}/dashboard`}
        style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "10px 16px",
          borderRadius: "5px",
          background: "linear-gradient(to right, #2ecc71, #27ae60, #228b22)",
          color: "white",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        Manage This Guide
      </Link>
    </div>
  );
};

export default GuideDetail;
