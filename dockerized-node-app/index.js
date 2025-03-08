import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import getDbConnection from "./config/db.js";
import apiRoutes from "./routes/api.js";
import checkAndCreateDbCollectionExist from "./config/dbInsertion.js";

// Load env vars
dotenv.config();

// Initialize Express
const app = express();

// Set PORT
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
await getDbConnection();

await checkAndCreateDbCollectionExist("test", "users");

// Middleware
app.use(express.json());
app.use(cors());

// Use API Routes
app.use("/api", apiRoutes);
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
