const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
console.log(PORT, "here is PORT!!");

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Use API Routes
app.use("/api", apiRoutes);
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
