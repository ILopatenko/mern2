//Import EXPRESS
const express = require("express");

//Import logic to CONNECT to a DATABASE
const connectDB = require("./config/db");

//Initialize a main APP variable
const app = express();

//Create a CONNECTION to DATABASE
connectDB();

//Import MIDDLEWARE for work with body of REQUEST (bodyparser)
app.use(express.json({ extended: false }));

//Create MAIN routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/auth", require("./routes/api/auth"));

//Create a variable to store port for server
const PORT = process.env.PORT || 5000;

//Create an APP LISTENER.
app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT}`);
});
