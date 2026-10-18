const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Required for CORS
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_UID = "dAMJSuCCkkOoIrBySbgYt2QOiZA3";

// 1. Load Service Account Key
let serviceAccount;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    console.log("✅ Firebase Service Account loaded from Environment Variable");
  } else {
    const fileContent = fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8");
    serviceAccount = JSON.parse(fileContent);
    console.log("✅ Firebase Service Account loaded from local file");
  }
} catch (error) {
  console.error("❌ Error loading Firebase service account:", error.message);
  process.exit(1);
}

// 2. Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
});

// 3. ✅ BULLETPROOF CORS CONFIGURATION (Fixes the Vercel block)
app.use(cors({
  origin: "*", // Allows requests from your Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));
// ✅ Handle preflight OPTIONS requests explicitly
app.options("*", cors());

app.use(express.json());

// 4. MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blogDB")
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });

// 5. Blog Schema
const blogSchema = new mongoose.Schema(
  {
    newTitle: { type: String, required: true, trim: true },
    newContent: { type: String, required: true, trim: true },
    date: {
      type: String,
      default: () =>
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    likes: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

// 6. Middleware: Verify Firebase User
async function verifyFirebaseUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Please log in first." });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired login session." });
  }
}

// 7. Middleware: Verify Admin
function verifyAdmin(req, res, next) {
  if (req.user.uid !== ADMIN_UID) {
    return res.status(403).json({ message: "Only the admin can manage blogs." });
  }
  next();
}

// 8. Routes
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch blogs." });
  }
});

app.post("/api/blogs", verifyFirebaseUser, verifyAdmin, async (req, res) => {
  try {
    const { newTitle, newContent } = req.body;
    const blog = await Blog.create({ newTitle, newContent, likes: 0 });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Unable to add blog." });
  }
});

app.put("/api/blogs/:id", verifyFirebaseUser, verifyAdmin, async (req, res) => {
  try {
    const { newTitle, newContent } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { newTitle, newContent },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Unable to edit blog." });
  }
});

app.delete("/api/blogs/:id", verifyFirebaseUser, verifyAdmin, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete blog." });
  }
});

app.patch("/api/blogs/like/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Unable to like blog." });
  }
});

// 9. Start Server
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});