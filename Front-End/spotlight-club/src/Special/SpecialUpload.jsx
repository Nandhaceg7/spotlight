import React, { useEffect, useState } from "react";
import "./SpecialUpload.css";

const API_BASE = "http://localhost:5000/api/content";

export default function SpecialUpload() {
  const [form, setForm] = useState({
    type: "special",
    title: "",
    description: "",
    poster: "",
    writerName: "",
    writerPhoto: "",
    editorName: "",
    editorPhoto: "",
  });

  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setContents(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description)
      return alert("Title and Description are required");

    const payload = {
      type: form.type,
      title: form.title,
      description: form.description,
      poster: form.poster,
      contentWriter: { name: form.writerName, photo: form.writerPhoto },
      posterEditor: { name: form.editorName, photo: form.editorPhoto },
    };

    const res = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Uploaded Successfully!");
      fetchContents();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchContents();
  };

  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Upload Content</h2>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="special">Special Day</option>
          <option value="article">Article</option>
          <option value="podcast">Podcast</option>
        </select>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <input
          name="poster"
          placeholder="Poster Image URL"
          onChange={handleChange}
        />
        <input
          name="writerName"
          placeholder="Content Writer Name"
          onChange={handleChange}
        />
        <input
          name="editorName"
          placeholder="Poster Editor Name"
          onChange={handleChange}
        />
        <button type="submit">Publish</button>
      </form>

      <div className="content-list">
        <h2>Uploaded Contents</h2>
        {contents.map((item) => (
          <div key={item._id} className="content-card">
            {item.poster && <img src={item.poster} alt={item.title} />}
            <div className="content-info">
              <h3>{item.title}</h3>
              <p>{item.type.toUpperCase()}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
