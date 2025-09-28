const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Profile = require("./models/employeeCardHW.model"); // should be Profile, not Movie

initializeDatabase();

// Read JSON file
const jsonData = fs.readFileSync("employee.json", "utf-8");

// Parse JSON data
const profilesData = JSON.parse(jsonData);

async function seedData() {
  try {
    for (const profileData of profilesData) {
      const newProfile = new Profile({
        fullName: profileData.fullName,
        username: profileData.username,
        bio: profileData.bio,
        profilePicUrl: profileData.profilePicUrl,
        followingCount: profileData.followingCount,
        followerCount: profileData.followerCount,
        companyName: profileData.companyName,
        location: profileData.location,
        portfolioUrl: profileData.portfolioUrl,
      });

      await newProfile.save(); // use await to save properly
      console.log(`✅ Saved profile: ${profileData.fullName}`);
    }
  } catch (error) {
    console.log("❌ Error seeding the data:", error);
  }
}

seedData();
