//Import MONGOOSE
const mongoose = require("mongoose");

//Import CONFIG
const config = require("config");

//Import mongoURI from default.json in folder config
const db = config.get("mongoURI");

//Create a connection
const connectDB = async () => {
  try {
    //*TRY to connect
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // If DB was connected - log a message
    console.log("MongoDB was connected ...");
  } catch (error) {
    //If ERROR log error and exit process with a failure
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
