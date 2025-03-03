const express = require("express");
const router = express.Router();

router.get("/message", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

module.exports = router;
