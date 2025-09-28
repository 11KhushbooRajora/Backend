const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Restaurant = require("./models/BE2.2_HW1");  // your restaurant model

app.use(express.json());
initializeDatabase();

// ==================== Utility Functions ====================
//// ==================== Create a Restaurant ====================
//BE4.2_HW1
async function createRestaurant(newRestaurant) {
  try {
    const restaurant = new Restaurant(newRestaurant);
    const savedRestaurant = await restaurant.save();
    return savedRestaurant;
  } catch (error) {
    throw error;
  }
}

app.post("/restaurants", async (req, res) => {
  try {
    const savedRestaurant = await createRestaurant(req.body);
    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: savedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});


//
// Get all restaurants
async function readAllRestaurants() {
  try {
    return await Restaurant.find();
  } catch (error) {
    throw error;
  }
}

// Get restaurant by name
async function readRestaurantsByName(name) {
  try {
    return await Restaurant.find({ name: name });
  } catch (error) {
    throw error;
  }
}

// Get restaurant by phone number
async function readRestaurantsByPhone(number) {
  try {
    return await Restaurant.findOne({ phoneNumber: number });
  } catch (error) {
    throw error;
  }
}

// Get restaurants by cuisine
async function readRestaurantsByCuisine(cuisine) {
  try {
    return await Restaurant.find({ cuisine: cuisine });
  } catch (error) {
    throw error;
  }
}

// Get restaurants by location
async function readRestaurantsByLocation(location) {
  try {
    return await Restaurant.find({ location: location });
  } catch (error) {
    throw error;
  }
}

// ==================== Routes ====================

// 1. Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    if (restaurants.length > 0) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: "No restaurants found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// 2. Get restaurant by name
app.get("/restaurants/:restaurantName", async (req, res) => {
  try {
    const restaurant = await readRestaurantsByName(req.params.restaurantName);
    if (restaurant.length > 0) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant" });
  }
});

// 3. Get restaurant by phone number
app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const restaurant = await readRestaurantsByPhone(req.params.phoneNumber);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found with this phone number" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurant" });
  }
});

// 4. Get restaurants by cuisine
app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  try {
    const restaurants = await readRestaurantsByCuisine(req.params.cuisineName);
    if (restaurants.length > 0) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: "No restaurants found for this cuisine" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// 5. Get restaurants by location
app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  try {
    const restaurants = await readRestaurantsByLocation(req.params.restaurantLocation);
    if (restaurants.length > 0) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: "No restaurants found at this location" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});



//BE4.3_HW1

// DELETE function
async function deleteRestaurant(restaurantId) {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    return deletedRestaurant;
  } catch (error) {
    throw error;
  }
}

// DELETE route
app.delete("/restaurants/:restaurantId", async (req, res) => {
  try {
    const deletedRestaurant = await deleteRestaurant(req.params.restaurantId);

    if (deletedRestaurant) {
      return res.status(200).json({
        message: "Restaurant deleted successfully.",
        restaurant: deletedRestaurant
      });
    } else {
      return res.status(404).json({
        message: "Restaurant not found."
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});



//BE4.4_HW1
async function updateRestaurant(restaurantId, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      dataToUpdate,
      { new: true } // return updated document
    );
    return updatedRestaurant;
  } catch (error) {
    throw error;
  }
}
app.post("/restaurants/:restaurantId", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body
    );

    if (updatedRestaurant) {
      res.status(200).json({
        message: "Restaurant updated successfully",
        restaurant: updatedRestaurant
      });
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update restaurant" });
  }
});


// ==================== Server ====================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
