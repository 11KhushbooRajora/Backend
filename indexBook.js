const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Book = require("./models/BooksHW.models"); // should be Profile, not Movie

initializeDatabase();

// Read JSON file
const jsonData = fs.readFileSync("Book.json", "utf-8");

// Parse JSON data
const BooksData = JSON.parse(jsonData);

async function seedData() {
  try {
   for (const bookData of BooksData) {
  const newBook = new Book({
    title: bookData.title,
    author: bookData.author,
    publishedYear: bookData.publishedYear,
    genre: bookData.genre,
    language: bookData.language,
    country: bookData.country,
    rating: bookData.rating,
    summary: bookData.summary,
    coverImageUrl: bookData.coverImageUrl,
  });

  await newBook.save();

// use await to save properly
      console.log(`✅ Saved Book: ${bookData.title}`);
    }
  } catch (error) {
    console.log("❌ Error seeding the data:", error);
  }
}

seedData();
