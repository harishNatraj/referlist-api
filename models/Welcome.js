const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model("Welcome", postSchema);