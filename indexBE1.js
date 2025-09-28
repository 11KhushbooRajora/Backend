const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Car = require("./models/BE1_Assignment.model"); // ✅ Correct model import

initializeDatabase();

async function seedData() {
  try {
    // Read JSON file
    const jsonData = fs.readFileSync("BE1_Assignment.json", "utf-8");

    // Parse JSON data
    const carsData = JSON.parse(jsonData);

    for (const carData of carsData) {
      const newCar = new Car({
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        bodyStyle: carData.bodyStyle,
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        engine: carData.engine,
        mileage: carData.mileage,
        color: carData.color,
        price: carData.price,
        condition: carData.condition,
        description: carData.description,
        photos: carData.photos,
        inMarket: carData.inMarket,
      });

      await newCar.save();
      console.log(`✅ Saved car: ${carData.brand} ${carData.model}`);
    }

    console.log("🌱 Cars data seeded successfully!");
  } catch (error) {
    console.log("❌ Error seeding the data:", error);
  }
}

seedData();
