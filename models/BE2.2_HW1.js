const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: [{ type: String, required: true }],
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: [String], default: [] },
  website: String,
  phoneNumber: String,
  openHours: String,
  priceRange: String,
  reservationsNeeded: { type: Boolean, default: false },
  isDeliveryAvailable: { type: Boolean, default: false },
  menuUrl: String,
  photos: [String],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
