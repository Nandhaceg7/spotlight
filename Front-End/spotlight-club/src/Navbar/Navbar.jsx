import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <div className="logo">
          <img
            src="/spotlight-logo.png"
            alt="Spotlight Logo"
            className="logo-img"
          />
          <span className="logo-text">SPOTLIGHT</span>
        </div>

        {/* MENU */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link to="/gallery" onClick={() => setOpen(false)}>
            Gallery
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/article" onClick={() => setOpen(false)}>
            Article
          </Link>
          <Link
            to="https://chat.whatsapp.com/FMWH4eB6loI2fDa2u9YJCM"
            className="join-btn"
            onClick={() => setOpen(false)}
          >
            Join Us
          </Link>
        </nav>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </header>
  );
}
