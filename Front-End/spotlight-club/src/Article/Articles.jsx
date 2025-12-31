import React, { useEffect, useState } from "react";
import "./Articles.css";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/content/type/article") // ✅ FIXED
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading articles...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!articles.length)
    return <p className="no-articles">No articles found.</p>;

  // SINGLE ARTICLE VIEW
  if (selectedArticle) {
    return (
      <section className="article-details">
        <button onClick={() => setSelectedArticle(null)} className="back-btn">
          ← Back
        </button>

        <h1>{selectedArticle.title}</h1>

        {selectedArticle.poster && (
          <div className="article-poster-container">
            <img
              src={selectedArticle.poster}
              alt={selectedArticle.title}
              className="article-poster"
            />
          </div>
        )}

        <p>{selectedArticle.description}</p>

        <div className="authors">
          <p>
            <strong>Content Writer:</strong>{" "}
            {selectedArticle.contentWriter?.name}
          </p>
          <p>
            <strong>Poster Editor:</strong> {selectedArticle.posterEditor?.name}
          </p>
        </div>
      </section>
    );
  }

  // ARTICLES LIST VIEW
  return (
    <section className="articles-wrapper">
      {articles.map((article) => (
        <div
          key={article._id}
          className="article-card"
          onClick={() => setSelectedArticle(article)}
        >
          {article.poster && <img src={article.poster} alt={article.title} />}

          <div className="article-text">
            <h2>{article.title}</h2>
            <p>{article.description.substring(0, 150)}...</p>
            <span className="read-more">Read →</span>
          </div>
        </div>
      ))}
    </section>
  );
}
