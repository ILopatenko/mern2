//Import EXPRESS
const express = require("express");

//Initialize a main APP variable
const app = express();

//Create a TEST ROUTE (for GET request to root folder '/')
app.get("/", (req, res) => res.send("Hello from TEST ROUTE of our API!"));

//Create a variable to store port for server
const PORT = process.env.PORT || 5000;

//Create an APP LISTENER.
app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT}`);
});
