import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GuideDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guide, setGuide] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    category: "",
    content: "",
    userId: ""
  });

  // Load guide data
  useEffect(() => {
    axios.get(`http://localhost:8080/api/guides/${id}`)
      .then(res => {
        setGuide(res.data);
        setFormData(res.data);
      })
      .catch(err => {
        console.error("Failed to load guide:", err);
        toast.error("Failed to load guide.");
      });
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update guide
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/guides/${id}`, formData);
      setGuide(response.data); // ✅ reflect updated data
      toast.success("Guide updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update guide.");
    }
  };

  // Delete guide
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this guide?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/guides/${id}`);
      toast.success("Guide deleted!");
      setTimeout(() => navigate("/"), 2000); // ⏳ delay to show toast
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete guide.");
    }
  };

  if (!guide) return <p>Loading guide...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Guide Dashboard</h2>

      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" />
          <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
          <textarea name="content" value={formData.content} onChange={handleChange} rows="5" placeholder="Content" />
          <button onClick={handleUpdate} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", border: "none", borderRadius: "5px" }}>
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          <h3>{guide.title}</h3>
          <p><strong>Destination:</strong> {guide.destination}</p>
          <p><strong>Category:</strong> {guide.category}</p>
          <p><strong>Content:</strong> {guide.content}</p>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          style={{ marginRight: "10px", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          {isEditing ? "Cancel" : "Edit Guide"}
        </button>

        <button 
          onClick={handleDelete} 
          style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", borderRadius: "4px" }}
        >
          Delete Guide
        </button>
      </div>
    </div>
  );
};

export default GuideDashboard;
