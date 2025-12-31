import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

// Club works (static)
const clubWorks = [
  {
    type: "Art",
    photo: "/images/art1.png",
    description:
      "Our art club creates beautiful paintings and craftworks showcasing creativity and talent.",
  },
  {
    type: "Dance",
    photo: "/images/dance.png",
    description:
      "Dance club performs traditional and contemporary dances with energy and grace.",
  },
  {
    type: "Drama",
    photo: "/images/drama.png",
    description:
      "Drama club enacts powerful skits and plays that convey strong messages.",
  },
  {
    type: "Silambam",
    photo: "/images/silambam.png",
    description:
      "Silambam club demonstrates traditional martial arts with skill and agility.",
  },
  {
    type: "Parai",
    photo: "/images/parai.png",
    description:
      "Parai club performs rhythmic beats and folk music celebrating heritage.",
  },
];

// Fallback
const defaultContent = {
  type: "special",
  poster: "/images/image.png",
  title: "No Content Today",
  description: "Stay tuned! New content will be updated soon.",
  contentWriter: { name: "Spotlight Team" },
  posterEditor: { name: "Spotlight Team" },
};

export default function Home() {
  const worksRef = useRef([]);
  const [activeType, setActiveType] = useState("special");
  const [content, setContent] = useState(defaultContent);

  // Fetch content by type
  useEffect(() => {
    fetch(`http://localhost:5000/api/content/latest/${activeType}`)
      .then((res) => {
        if (!res.ok) throw new Error("No content");
        return res.json();
      })
      .then((data) => setContent({ ...defaultContent, ...data }))
      .catch(() => setContent({ ...defaultContent, type: activeType }));
  }, [activeType]);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.3 }
    );

    worksRef.current.forEach((el) => el && observer.observe(el));
    return () => worksRef.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  return (
    <div className="home-container">
      {/* INTRO */}
      <section className="intro-section">
        <h2>Spotlight 🕯 | Art for Change</h2>
        <p>A platform to do what matters.</p>
        <p>A stage where art gets meaning.</p>
        <p>A place for everyone and everything!</p>
        <p className="welcome-note">
          Let art be something that sets you free !!
        </p>
      </section>

      {/* FILTER BUTTONS */}
      {/* <div className="content-filters">
        {["special", "article", "podcast"].map((type) => (
          <button
            key={type}
            className={activeType === type ? "active" : ""}
            onClick={() => setActiveType(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div> */}

      {/* CONTENT SECTION */}
      <section className="special-day-section">
        <h2 className="section-title">
          {activeType === "special"
            ? "Today's Special Day"
            : activeType.toUpperCase()}
        </h2>

        <div className="special-day-content">
          <img
            src={content.poster}
            alt={content.title}
            className="special-poster"
          />

          <div className="special-details">
            <h3>{content.title}</h3>
            <p>{content.description}</p>

            <div className="authors">
              <p>
                <strong>Content Writer:</strong> {content.contentWriter?.name}
              </p>
              <p>
                <strong>Poster Editor:</strong> {content.posterEditor?.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLUB WORKS */}
      <section className="club-works-section">
        <h2 className="section-title">Our Club Works</h2>
        {clubWorks.map((work, i) => (
          <div
            key={i}
            ref={(el) => (worksRef.current[i] = el)}
            className={`club-work ${i % 2 === 0 ? "work-left" : "work-right"}`}
          >
            <img src={work.photo} alt={work.type} />
            <div className="work-description">
              <h3>{work.type}</h3>
              <p>{work.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
