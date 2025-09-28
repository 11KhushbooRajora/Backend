const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true }, // ✅ correct spelling
  genre: [{ type: String }],
  language: { type: String, required: true },
  country: { type: String },
  rating: { type: Number },
  summary: { type: String },
  coverImageUrl: { type: String }
});

module.exports = mongoose.model("Book", bookSchema);
