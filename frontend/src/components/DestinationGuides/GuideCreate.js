import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const GuideCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    category: "",
    content: "",
    userId: "1",
    tags: []
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Show real-time warnings
    const updatedWarnings = { ...warnings };
    if (name === "destination") {
      updatedWarnings.destination = value && !value.includes(",") ? "Tip: Use format like 'Ella, Sri Lanka'" : "";
    }
    if (name === "content") {
      updatedWarnings.content = value.length > 0 && value.length < 20 ? "Add more content to reach 20 characters." : "";
    }
    setWarnings(updatedWarnings);
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && tagInput.trim() !== "") {
      e.preventDefault();
      const tag = tagInput.trim();
      const formattedTag = tag.startsWith("#") ? tag : `#${tag}`;
      const valid = /^#[a-zA-Z0-9]+$/.test(formattedTag);
      if (!valid) {
        setWarnings({ ...warnings, tags: "Tag must start with # and contain only letters/numbers" });
        return;
      }
      if (!formData.tags.includes(formattedTag)) {
        setFormData({ ...formData, tags: [...formData.tags, formattedTag] });
        setWarnings({ ...warnings, tags: "" });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required.";
    } else if (!formData.destination.includes(",")) {
      newErrors.destination = "Use format: City, Country";
    }
    if (!formData.category.trim()) newErrors.category = "Category is required.";
    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters.";
    }
    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8080/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const newGuide = await response.json();
        if (newGuide?.id) {
          alert("Guide created successfully!");
          navigate(`/guides/${newGuide.id}/dashboard`);
        } else {
          alert("Guide created but cannot redirect.");
        }
      } else {
        alert("Failed to create guide.");
      }
    } catch (error) {
      console.error("Error submitting guide:", error);
      alert("Error creating guide.");
    }
  };

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
      <div style={{ width: "100%", maxWidth: "500px" }}>
        {/* Navigation button in upper right */}
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
          
          <div>
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
          </div>
        </div>

        <h2
          style={{
            background: "linear-gradient(to right, #2ecc71, #27ae60, #228b22)",
            color: "white",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px"
          }}
        >
          Create a New Destination Guide
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              style={{ padding: "8px", width: "100%" }}
            />
            {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
          </div>

          <div>
            <input
              type="text"
              name="destination"
              placeholder="Destination (e.g., Ella, Sri Lanka)"
              value={formData.destination}
              onChange={handleChange}
              style={{ padding: "8px", width: "100%" }}
            />
            {errors.destination && <span style={{ color: "red" }}>{errors.destination}</span>}
            {warnings.destination && <span style={{ color: "orange" }}>{warnings.destination}</span>}
          </div>

          <div>
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Nature, Food)"
              value={formData.category}
              onChange={handleChange}
              style={{ padding: "8px", width: "100%" }}
            />
            {errors.category && <span style={{ color: "red" }}>{errors.category}</span>}
          </div>

          <label>Tags (type with # or press Space/Enter):</label>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "6px",
              display: "flex",
              flexWrap: "wrap",
              gap: "6px"
            }}
          >
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  background: "#d0eaff",
                  padding: "4px 8px",
                  borderRadius: "12px"
                }}
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  type="button"
                  style={{
                    marginLeft: "6px",
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer"
                  }}
                >
                  ×
                </button>
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
          {errors.tags && <span style={{ color: "red" }}>{errors.tags}</span>}
          {warnings.tags && <span style={{ color: "orange" }}>{warnings.tags}</span>}

          <div>
            <textarea
              name="content"
              placeholder="Guide content..."
              value={formData.content}
              onChange={handleChange}
              rows="5"
              style={{ padding: "8px", width: "100%" }}
            />
            {errors.content && <span style={{ color: "red" }}>{errors.content}</span>}
            {warnings.content && <span style={{ color: "orange" }}>{warnings.content}</span>}
          </div>

          <button
            type="submit"
            style={{
              padding: "10px",
              background: "linear-gradient(to right, #2ecc71, #27ae60, #228b22)",
              color: "white",
              border: "none",
              borderRadius: "4px"
            }}
          >
            Submit Guide
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuideCreate;
