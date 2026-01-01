import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-brand">
          <h2>Spotlight 🕯</h2>
          <p>
            Art for Change. A platform where creativity finds meaning and voices
            find power.
          </p>
        </div>

        {/* Center */}
        <div className="footer-links">
          <h3>Explore</h3>
          <ul>
            <li>Art</li>
            <li>Dance</li>
            <li>Drama</li>
            <li>Silambam</li>
            <li>Parai</li>
          </ul>
        </div>

        {/* Right */}
        <div className="footer-contact">
          <h3>Connect</h3>
          <p>📍 Anna University </p>
          <p>📍 CEG || ACT || SAP </p>

          <p>
            <a
              href="https://www.instagram.com/au.spotlight/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              📱 Instagram
            </a>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>
          <Link to="/special_upload">©</Link> {new Date().getFullYear()}{" "}
          Spotlight Club. Made with ❤️ for Art & Culture.
        </p>
      </div>
    </footer>
  );
}
