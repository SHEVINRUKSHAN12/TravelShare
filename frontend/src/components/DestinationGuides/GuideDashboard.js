import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
    userId: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [tagError, setTagError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && tagInput.trim() !== "") {
      e.preventDefault();
      const trimmed = tagInput.trim();

      if (!trimmed.startsWith("#")) {
        setTagError("Tag must start with '#' (e.g., #beach)");
        return;
      }

      if (!/^#[a-zA-Z0-9]+$/.test(trimmed)) {
        setTagError("Tag can only contain letters and numbers after '#'");
        return;
      }

      if (!formData.tags.includes(trimmed)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed] }));
        setTagInput("");
        setTagError("");
      } else {
        setTagError("Tag already added.");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required.";
    } else if (!/^[^,]+,\s*[^,]+$/.test(formData.destination)) {
      newErrors.destination = "Use format: City, Country (e.g., Ella, Sri Lanka)";
    }
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters.";
    }
    if (!formData.tags || formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required.";
    } else {
      const invalidTag = formData.tags.find(tag => !/^#[a-zA-Z0-9]+$/.test(tag));
      if (invalidTag) {
        newErrors.tags = `Invalid tag format: ${invalidTag}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(`http://localhost:8080/api/guides/${id}`, formData);
      setGuide(response.data);
      toast.success("Guide updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update guide.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this guide?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/guides/${id}`);
      toast.success("Guide deleted!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete guide.");
    }
  };

  if (!guide) return <p>Loading guide...</p>;

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Arial",
      background: 'linear-gradient(to bottom, #c1f0d1, #e0fff2)',
      backgroundImage: 'url("https://www.animatedimages.org/data/media/1269/animated-nature-image-0062.gif")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: "flex",
      justifyContent: "center"
    }}>
      <style>
        {`
          @keyframes falling {
            0% {
              transform: translateY(-100%) rotate(0deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }

          .leaf {
            position: fixed;
            z-index: 1;
            font-size: 20px;
            user-select: none;
            pointer-events: none;
          }
        `}
      </style>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="leaf"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `falling ${Math.random() * 10 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        >
          {['🍂', '🍃', '🌿'][Math.floor(Math.random() * 3)]}
        </div>
      ))}
      <div style={{ width: "100%", maxWidth: "700px" }}>
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

        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}

            <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination (e.g., Ella, Sri Lanka)" />
            {errors.destination && <span style={{ color: "red" }}>{errors.destination}</span>}

            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
            {errors.category && <span style={{ color: "red" }}>{errors.category}</span>}

            <textarea name="content" value={formData.content} onChange={handleChange} rows="5" placeholder="Content" />
            {errors.content && <span style={{ color: "red" }}>{errors.content}</span>}

            <label>Tags (type with # or press Space/Enter):</label>
            <div style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "6px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px"
            }}>
              {formData.tags.map((tag, index) => (
                <span key={index} style={{ background: "#d0eaff", padding: "4px 8px", borderRadius: "12px" }}>
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} type="button" style={{ marginLeft: "6px", background: "none", border: "none", color: "red", cursor: "pointer" }}>×</button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="#yourtag"
                style={{ flexGrow: 1, border: "none", outline: "none" }}
              />
            </div>
            {(tagError || errors.tags) && <span style={{ color: "red" }}>{tagError || errors.tags}</span>}

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
            {guide.tags && guide.tags.length > 0 && (
              <p><strong>Tags:</strong> {guide.tags.join(" ")}</p>
            )}
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
    </div>
  );
};

export default GuideDashboard;
