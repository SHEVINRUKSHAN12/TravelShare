import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const GuideDetail = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/guides/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch guide details");
        }
        return res.json();
      })
      .then(data => setGuide(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!guide) return <p>Loading guide...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>{guide.title}</h2>
      <p><strong>Destination:</strong> {guide.destination}</p>
      <p><strong>Category:</strong> {guide.category}</p>
      <p><strong>Content:</strong> {guide.content}</p>

      <Link 
        to={`/guides/${guide.id}/dashboard`} 
        style={{ marginTop: "15px", display: "inline-block", color: "#28a745", textDecoration: "underline" }}
      >
        Manage This Guide
      </Link>
    </div>
  );
};

export default GuideDetail;
