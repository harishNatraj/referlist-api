const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
  },
  invite_link: {
    type: String,
  }
});

module.exports = mongoose.model("Users", postSchema);