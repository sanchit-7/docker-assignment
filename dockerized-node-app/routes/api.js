import express from "express";
import mongoose from "mongoose";

const apiRoutes = express.Router();

apiRoutes.get("/message", (req, res) => {
  res.json({ message: "Hello from Express API!!" });
});

// query db and send users list from here
apiRoutes.get("/users", async (req, res) => {
  const users = await mongoose.connection.db
    .collection("users")
    .find()
    .toArray();
  res.json({
    data: users,
    message: "Users list sent successfully",
  });
});

export default apiRoutes;
