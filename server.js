//Import EXPRESS
const express = require('express');

//Create a back-end server - APP
const app = express();

//Set up a port for server
const PORT = process.env.PORT || 5000;

//Set up a server to listen a port. Log to console string with information about port
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));

//Set up 1st test route: GET, to root folder, response will be aq string with a mesage
app.get('/', (req, res) => res.send('API running ...'));
