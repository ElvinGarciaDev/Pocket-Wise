const mongoose = require("mongoose");

const AttractionSchema = new mongoose.Schema({
  budget: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("budget", AttractionSchema, "budget"); // "Post" is the collection name. It takes POST and makes it plural. You can also add a third parameter and call the database whatever you want