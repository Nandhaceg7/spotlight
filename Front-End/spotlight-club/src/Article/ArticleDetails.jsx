import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Articles.css";

export default function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/content/id/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Content not found");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="not-found">{error}</p>;

  return (
    <section className="article-details">
      <h1>{article.title}</h1>
      {article.poster && <img src={article.poster} alt={article.title} />}
      <p>{article.description}</p>
      <div className="authors">
        <p>
          <strong>Content Writer:</strong> {article.contentWriter?.name}
        </p>
        <p>
          <strong>Poster Editor:</strong> {article.posterEditor?.name}
        </p>
      </div>
    </section>
  );
}
