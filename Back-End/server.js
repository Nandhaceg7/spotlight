import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error("Connection error:", err));

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["special", "article", "podcast"],
    default: "special",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String },
  contentWriter: { name: String, photo: String },
  posterEditor: { name: String, photo: String },
  createdAt: { type: Date, default: Date.now },
  // REMOVED: expiresAt (TTL Index) so articles don't disappear after 24 hours.
});

const Content = mongoose.model("Content", contentSchema);

// --- Routes ---

// 1. Create content
app.post("/api/content/create", async (req, res) => {
  try {
    const newContent = new Content(req.body);
    await newContent.save();
    res
      .status(201)
      .json({ message: "Content uploaded successfully", data: newContent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get ALL contents of a specific type (Used by Articles.js)
app.get("/api/content/type/:type", async (req, res) => {
  try {
    const data = await Content.find({ type: req.params.type }).sort({
      createdAt: -1,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get LATEST content by TYPE (Used by Home.js)
app.get("/api/content/latest/:type", async (req, res) => {
  try {
    const latest = await Content.findOne({ type: req.params.type }).sort({
      createdAt: -1,
    });
    if (!latest) return res.status(404).json({ message: "No content found" });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get ALL contents (Used by SpecialUpload.js)
app.get("/api/content", async (req, res) => {
  try {
    const data = await Content.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete content
app.delete("/api/content/:id", async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
