import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar.jsx";
import Home from "./Home/Home.jsx";
import Footer from "./Footer/Footer.jsx";
import Articles from "./Article/Articles";
import ArticleDetails from "./Article/ArticleDetails";
import SpecialUpload from "./Special/Specialupload.jsx";

export default function App() {
  return (
    <div className="app-layout">
      <Navbar />

      {/* Main content */}
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Articles />} />
          <Route path="/article/art-for-change" element={<ArticleDetails />} />
          <Route path="/special_upload" element={<SpecialUpload />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
