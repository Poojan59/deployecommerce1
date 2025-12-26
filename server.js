require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");
const testRoute = require("./routes/testRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/resource", resourceRoutes);
app.use("/api/test", testRoute);
app.use("/api/auth", authRoutes);

/* ===============================
   SERVE FRONTEND (OPTION 2)
================================ */

// frontend/dist path
const frontendPath = path.join(__dirname, "../frontend/dist");

// serve static files
app.use(express.static(frontendPath));

// fallback for React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
