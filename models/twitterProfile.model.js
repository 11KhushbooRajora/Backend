const mongoose = require("mongoose");

const TanayShecma = new mongoose.Schema({
name: String,
bio: String,
followers: Number,
address: String,
imageUrl: String,
})

const Tanay = mongoose.model("Tanay", TanayShecma);

module.exports=Tanay;