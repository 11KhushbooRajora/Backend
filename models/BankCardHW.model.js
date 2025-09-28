const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardHolder: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
   expiryYear: {
    type: Number,
    required: true,
  },
  cardType: {
    type: String,
    enum: ["American Express"],
  },
})

const card= mongoose.model("Bank Detail", cardSchema);
module.exports = card;