const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId, // This is how we tie a post to a specific user
  //   ref: "User",
  // },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("expense", PostSchema, "expense"); // "Post" is the collection name. It takes POST and makes it plural. You can also add a third parameter and call the database whatever you want
