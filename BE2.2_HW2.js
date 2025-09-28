const express = require("express");
const app = express();
const PORT = 3000;

const { initializeDatabase } = require("./db/db.connect"); // ✅ correct path
const Hotel = require("./models/hotel.models");            // ✅ correct path

app.use(express.json());
initializeDatabase();

//BE4.2_HW2
// utils/hotel.js (optional helper function)
async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const savedHotel = await hotel.save();
    return savedHotel;
  } catch (error) {
    throw error;
  }
}

// Create Hotel Route
app.post("/hotels", async (req, res) => {
  try {
    const savedHotel = await createHotel(req.body);  // ✅ use helper
    res.status(201).json({
      message: "Hotel added successfully",
      hotel: savedHotel
    });
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ error: "Failed to add hotel" });
  }
});


// ---------------- FUNCTIONS ----------------

// 1️⃣ Read all hotels
async function readAllHotels() {
  try {
    return await Hotel.find();
  } catch (error) {
    throw error;
  }
}

// 2️⃣ Read hotel by name
async function readHotelByName(name) {
  try {
    return await Hotel.findOne({ name });
  } catch (error) {
    throw error;
  }
}

// 3️⃣ Read hotel by phone
async function readHotelByPhone(phoneNumber) {
  try {
    return await Hotel.findOne({ phoneNumber });
  } catch (error) {
    throw error;
  }
}

// 4️⃣ Read hotels by rating
async function readHotelsByRating(rating) {
  try {
    return await Hotel.find({ rating });
  } catch (error) {
    throw error;
  }
}

// 5️⃣ Read hotels by category
async function readHotelsByCategory(category) {
  try {
    return await Hotel.find({ category });
  } catch (error) {
    throw error;
  }
}

// ---------------- ROUTES ----------------

// 1. Get all hotels
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();
    if (hotels.length > 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// 2. Get hotels by category (specific first!)
app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotels = await readHotelsByCategory(req.params.hotelCategory);
    if (hotels.length > 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found in this category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// 3. Get hotels by rating
app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotels = await readHotelsByRating(Number(req.params.hotelRating));
    if (hotels.length > 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found with this rating" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// 4. Get hotel by phone number
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhone(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found with this phone number" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
});

// 5. Get hotel by name (generic LAST!)
app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotel" });
  }
});


//BE4.3_HW2

// DELETE function
async function deleteHotel(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    throw error;
  }
}

// DELETE route
app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await deleteHotel(req.params.hotelId);

    if (deletedHotel) {
      return res.status(200).json({
        message: "Hotel deleted successfully.",
        hotel: deletedHotel
      });
    } else {
      return res.status(404).json({
        message: "Hotel not found."
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

//BE4.4_HW2
async function updateHotel(hotelId, updateData) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      updateData,
      { new: true, runValidators: true } // new:true → returns updated doc
    );
    return updatedHotel;
  } catch (error) {
    throw error;
  }
}

// UPDATE route (PUT)
app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await updateHotel(req.params.hotelId, req.body);

    if (updatedHotel) {
      return res.status(200).json({
        message: "Hotel updated successfully.",
        hotel: updatedHotel
      });
    } else {
      return res.status(404).json({
        message: "Hotel not found."
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
