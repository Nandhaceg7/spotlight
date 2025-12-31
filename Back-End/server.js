import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB connection ---
mongoose
  .connect(
    "mongodb+srv://nandha:123nandha@cluster0.lqtgmgv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0s"
  )
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.error(err));

// --- Schema & Model ---
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

  // 🔥 AUTO DELETE AFTER 24 HOURS
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    index: { expires: 0 }, // TTL index
  },
});

const Content = mongoose.model("Content", contentSchema);

// --- Routes ---

// Create content (special/article/podcast)
app.post("/api/content/create", async (req, res) => {
  try {
    const newContent = new Content(req.body);
    await newContent.save();
    res.status(201).json({
      message: "Content uploaded successfully (Auto deletes in 24 hrs)",
      data: newContent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Get LATEST content by TYPE (single document)
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
// ✅ Latest content (any type)
app.get("/api/content/latest", async (req, res) => {
  try {
    const latest = await Content.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ message: "No content found" });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Get ALL contents (for admin/upload page)
app.get("/api/content", async (req, res) => {
  try {
    const data = await Content.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 Delete content by ID
app.delete("/api/content/:id", async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
