import React, { useState } from "react";

const GuideCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    category: "",
    content: "",
    userId: "1"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/guides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Guide created successfully!");
        setFormData({
          title: "",
          destination: "",
          category: "",
          content: "",
          userId: "1"
        });
      } else {
        alert("Failed to create guide.");
      }
    } catch (error) {
      console.error("Error submitting guide:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Create a New Destination Guide</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          required
          style={{ padding: "8px" }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Nature, Food)"
          value={formData.category}
          onChange={handleChange}
          required
          style={{ padding: "8px" }}
        />
        <textarea
          name="content"
          placeholder="Guide content..."
          value={formData.content}
          onChange={handleChange}
          rows="5"
          required
          style={{ padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
          Submit Guide
        </button>
      </form>
    </div>
  );
};

export default GuideCreate;
