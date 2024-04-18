// models take in a schema which is basically the field for the resource, in this case is idea
// convention for models is capitalize and singular

const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add a text field"],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Idea", IdeaSchema);
