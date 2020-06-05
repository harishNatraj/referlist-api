const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  rank: {
    type: int,
    required: true,
  },
});

module.exports = mongoose.model("Position", postSchema);