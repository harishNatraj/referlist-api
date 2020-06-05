const express = require("express");
const router = express.Router();
const {Referral} = require("../Controllers/Invite")
router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/sendInvite", Referral);
module.exports = router;