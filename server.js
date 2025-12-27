require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");
const testRoute = require("./routes/testRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ===============================
   DATABASE
================================ */
connectDB();

/* ===============================
   MIDDLEWARES
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   USERS API (from index.js)
================================ */
let users = [
  { id: 1, name: "Nike-T-shirt" },
  { id: 2, name: "Nike-watch" }
];

// GET
app.get("/users", (req, res) => {
  res.json(users);
});

// POST
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.json({ message: "User added successfully", user: newUser });
});

// PUT
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name;
  res.json({ message: "User updated successfully" });
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: "User deleted successfully" });
});

/* ===============================
   WEEK 3 API ROUTES
================================ */
app.use("/api/resource", resourceRoutes);
app.use("/api/test", testRoute);
app.use("/api/auth", authRoutes);

/* ===============================
   SERVE FRONTEND (RENDER)
================================ */
const frontendPath = path.join(__dirname, "frontend/dist");

// serve frontend build
app.use(express.static(frontendPath));

// react router fallback
app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api") || req.originalUrl.startsWith("/users")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
