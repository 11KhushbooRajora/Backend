const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const  restaurant  = require("./models/BE2.1_HW1.model"); // should be Profile, not Movie

initializeDatabase();

const newRestaurant = {
  name: "Cha Cha",
  cuisine: ["Spanish"],
  location: "123 Main Street, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://example.com",
  phoneNumber: "+1234567890",
  openHours: "Mon-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: true,
  isDeliveryAvailable: true,
  menuUrl: "https://example.com/menu",
  photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
};

function Restaurant(newRestaurant){
    try{
        const rest = new restaurant(newRestaurant);
        const saverest = rest.save();
        console.log(saverest);

    }
    catch{
throw error
    }
}
Restaurant(newRestaurant);