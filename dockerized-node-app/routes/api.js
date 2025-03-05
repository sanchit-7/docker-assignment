const express = require("express");
const router = express.Router();

router.get("/message", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

// query db and send users list from here
router.get("/users", (req, res) => {
  console.log("Inside this");
  const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
  ];
  res.json({
    data: users,
    message: "Users list sent successfully",
  });
});

module.exports = router;
