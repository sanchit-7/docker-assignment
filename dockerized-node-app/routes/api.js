import express from "express";
import mongoose from "mongoose";

const apiRoutes = express.Router();

apiRoutes.get("/message", (req, res) => {
  res.json({ message: "Hello from Express API!!" });
});

// query db and send users list from here
apiRoutes.get("/contributors", async (req, res) => {
  const users = await mongoose.connection.db
    .collection("users")
    .find()
    .toArray();
  res.json({
    data: users,
    message: "Contributor list sent successfully",
  });
});

// add user to db from here and send the added user
apiRoutes.post("/contributor", async (req, res) => {
  const { name, email } = req.body;
  const user = { name, email };
  await mongoose.connection.db
    .collection("users")
    .insertOne(user);    
  res.json({
    message: "Contributor added successfully",
  });
});

export default apiRoutes;
