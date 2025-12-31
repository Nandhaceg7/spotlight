import React, { useEffect, useState } from "react";
import "./SpecialUpload.css";

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

  // 🔥 FETCH ALL CONTENTS
  const fetchContents = async () => {
    const res = await fetch("http://localhost:5000/api/content");
    const data = await res.json();
    setContents(data);
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: form.type,
      title: form.title,
      description: form.description,
      poster: form.poster,
      contentWriter: {
        name: form.writerName,
        photo: form.writerPhoto,
      },
      posterEditor: {
        name: form.editorName,
        photo: form.editorPhoto,
      },
    };

    await fetch("http://localhost:5000/api/content/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Uploaded Successfully!");
    fetchContents();
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await fetch(`http://localhost:5000/api/content/${id}`, {
      method: "DELETE",
    });

    fetchContents();
  };

  return (
    <div className="upload-page">
      {/* UPLOAD FORM */}
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Upload Content</h2>

        <select name="type" onChange={handleChange}>
          <option value="special">Special Day</option>
          <option value="article">Article</option>
          <option value="podcast">Podcast</option>
        </select>

        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
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
          name="writerPhoto"
          placeholder="Writer Photo URL"
          onChange={handleChange}
        />

        <input
          name="editorName"
          placeholder="Poster Editor Name"
          onChange={handleChange}
        />
        <input
          name="editorPhoto"
          placeholder="Editor Photo URL"
          onChange={handleChange}
        />

        <button>Publish</button>
      </form>

      {/* 🔥 BACKEND CONTENT LIST */}
      <div className="content-list">
        <h2>Uploaded Contents</h2>

        {contents.map((item) => (
          <div key={item._id} className="content-card">
            <img src={item.poster} alt={item.title} />

            <div className="content-info">
              <h3>{item.title}</h3>
              <p>{item.description.slice(0, 120)}...</p>

              <p className="meta">
                <strong>Type:</strong> {item.type} <br />
                <strong>Writer:</strong> {item.contentWriter?.name}
              </p>

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
