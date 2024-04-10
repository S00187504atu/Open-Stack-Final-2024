const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Book = new Schema(
  {
    name: {
      type: String,
      required: [true, "A book must have a name"],
      unique: true
    },
    price: {
      type: String,
      required: [true, "A book must have a price"]
    },
    author: {
      type: String,
      required: [true, "A book must have an author"]
    },
    genre: {
      type: String,
      required: [true, "A book must have a genre"]
    },
    description: {
      type: String,
      required: [true, "A book must have a description"]
    }
  },
  {
    collection: "books"
  }
);
module.exports = mongoose.model("Book", Book);
