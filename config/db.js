const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://poojansoni39_db_user:1s9YvgEGTsUaq9au@ecommerce55.cv0ksuw.mongodb.net/?appName=Ecommerce55");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
