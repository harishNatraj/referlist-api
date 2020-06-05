const express = require("express");
const router = express.Router();
const {Signup, GetUser} = require("../Controllers/User")
router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/signup", Signup);
router.get("/user", GetUser);
module.exports = router;