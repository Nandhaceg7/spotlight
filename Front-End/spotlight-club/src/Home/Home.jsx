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

// Fallback Content
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
  const [activeType] = useState("special"); // Set to constant if filters are not used
  const [content, setContent] = useState(defaultContent);

  // FETCH LATEST CONTENT
  useEffect(() => {
    // Standardized to localhost to match your backend; switch to Render URL for deployment
    fetch(
      `https://spotlight-apj5.onrender.com/api/content/latest/${activeType}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("No content found");
        return res.json();
      })
      .then((data) => {
        // Merge data with default to ensure all fields exist
        setContent({ ...defaultContent, ...data });
      })
      .catch(() => {
        setContent({ ...defaultContent, type: activeType });
      });
  }, [activeType]);

  // SCROLL ANIMATION (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    // Capture the current refs to use in cleanup
    const currentRefs = worksRef.current;
    currentRefs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="home-container">
      {/* INTRO SECTION */}
      <section className="intro-section">
        <h2>Spotlight 🕯 | Art for Change</h2>
        <p>A platform to do what matters.</p>
        <p>A stage where art gets meaning.</p>
        <p>A place for everyone and everything!</p>
        <p className="welcome-note">
          Let art be something that sets you free !!
        </p>
      </section>

      {/* SPECIAL CONTENT SECTION */}
      <section className="special-day-section">
        <h2 className="section-title">
          {activeType === "special"
            ? "Today's Special Day"
            : activeType.toUpperCase()}
        </h2>

        <div className="special-day-content">
          {content.poster && (
            <img
              src={content.poster}
              alt={content.title}
              className="special-poster"
            />
          )}

          <div className="special-details">
            <h3>{content.title}</h3>
            <p>{content.description}</p>

            <div className="authors">
              <p>
                <strong>Content Writer:</strong>{" "}
                {content.contentWriter?.name || "Spotlight Team"}
              </p>
              <p>
                <strong>Poster Editor:</strong>{" "}
                {content.posterEditor?.name || "Spotlight Team"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLUB WORKS SECTION */}
      <section className="club-works-section">
        <h2 className="section-title">Our Club Works</h2>
        {clubWorks.map((work, i) => (
          <div
            key={work.type}
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
