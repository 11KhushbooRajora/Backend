const { initializeDatabase } = require("./db/db.connect");
const Car = require("./models/car.models");

initializeDatabase();

// 1. Function to create a new car
async function createCar(carData) {
  try {
    const car = new Car(carData);
    const savedCar = await car.save();
    console.log("Car Created:", savedCar);
  } catch (error) {
    console.error("Error creating car:", error);
  }
}

// 2. Create Ford Mustang
const fordMustang = {
  brand: "Ford",
  model: "Mustang",
  year: 2019,
  bodyStyle: "Convertible",
  fuelType: "Gasoline",
  transmission: "Automatic",
  engine: "5.0L V8",
  mileage: 25000,
  color: "Red",
  price: 3500000,
  condition: "Used",
  description: "Exciting Ford Mustang convertible with powerful V8 engine.",
  photos: [
    "https://example.com/mustang-photo1.jpg",
    "https://example.com/mustang-photo2.jpg",
    "https://example.com/mustang-photo3.jpg",
  ],
};

// 2. Create Honda Civic
const hondaCivic = {
  brand: "Honda",
  model: "Civic",
  year: 2018,
  bodyStyle: "Coupe",
  fuelType: "Gasoline",
  transmission: "Manual",
  engine: "1.5L Turbocharged Inline-4",
  mileage: 40000,
  color: "Black",
  price: 1800000,
  condition: "Used",
  description: "Sporty Civic coupe with low mileage and manual transmission.",
  photos: [
    "https://example.com/civic-photo1.jpg",
    "https://example.com/civic-photo2.jpg",
    "https://example.com/civic-photo3.jpg",
  ],
};

// 3. Function to read all cars
async function getAllCars() {
  try {
    const cars = await Car.find();
    console.log("All Cars:", cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
  }
}

// 4. Function to read cars by brand
async function getCarsByBrand(brandName) {
  try {
    const cars = await Car.find({ brand: brandName });
    console.log(`${brandName} Cars:`, cars);
  } catch (error) {
    console.error("Error fetching cars by brand:", error);
  }
}

// 5. Function to read cars by color
async function getCarsByColor(color) {
  try {
    const cars = await Car.find({ color });
    console.log(`${color} Cars:`, cars);
  } catch (error) {
    console.error("Error fetching cars by color:", error);
  }
}

// 6. Function to update car price by model
async function updateCarPriceByModel(modelName, newPrice) {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { model: modelName },
      { price: newPrice },
      { new: true }
    );
    console.log("Updated Car Price:", updatedCar);
  } catch (error) {
    console.error("Error updating price:", error);
  }
}

// 7. Function to update car condition by model
async function updateCarConditionByModel(modelName, newCondition) {
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { model: modelName },
      { condition: newCondition },
      { new: true }
    );
    console.log("Updated Car Condition:", updatedCar);
  } catch (error) {
    console.error("Error updating condition:", error);
  }
}

// 8. Function to delete a car by ID
async function deleteCarById(carId) {
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    console.log("Deleted Car:", deletedCar);
  } catch (error) {
    console.error("Error deleting car by ID:", error);
  }
}

// 9. Function to delete cars by body style
async function deleteCarByBodyStyle(bodyStyle) {
  try {
    const deletedCar = await Car.findOneAndDelete({ bodyStyle });
    console.log("Deleted Car by Body Style:", deletedCar);
  } catch (error) {
    console.error("Error deleting car by body style:", error);
  }
}

// ============================
// Example function calls
// Uncomment to test one by one
// ============================

// createCar(fordMustang);
// createCar(hondaCivic);
// getAllCars();
// getCarsByBrand("Ford");
// getCarsByColor("Black");
// updateCarPriceByModel("Corolla", 2300000);
// updateCarConditionByModel("Model S", "Used");
// deleteCarById("PUT_TESLA_ID_HERE");
// deleteCarByBodyStyle("Coupe");
