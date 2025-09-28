const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
category: { 
  type: [String], 
  enum: ["Budget", "Mid-Range", "Luxury", "Boutique", "Resort", "Other"], 
  required: true 
},

  location: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [{ type: String }],
  website: String,
  phoneNumber: { type: String, unique: true },
  checkInTime: String,
  checkOutTime: String,
  amenities: [String],
  priceRange: String,
  reservationsNeeded: Boolean,
  isParkingAvailable: Boolean,
  isWifiAvailable: Boolean,
  isPoolAvailable: Boolean,
  isSpaAvailable: Boolean,
  isRestaurantAvailable: Boolean,
  photos: [String],
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
