const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dbUrl = process.env.CONNECTION_STRING;

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(dbUrl);
    console.log(`Database Connected:${dbConnection.connection.host}`);
  } catch (err) {
    console.error(`${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
