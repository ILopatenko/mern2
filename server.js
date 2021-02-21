//Import EXPRESS
const express = require('express');
//Import a function to connect to DB
const connectDB = require('./config/db.js');
//Create a back-end server - APP
const app = express();
//Calling a function to connect to DB
connectDB();
//Init Middleware
app.use(express.json({ extended: false }));
//Set up a port for server
const PORT = process.env.PORT || 5000;
//Set up a server to listen a port. Log to console string with information about port
app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
//Set up 1st test route: GET, to root folder, response will be aq string with a mesage
app.get('/', (req, res) => res.send('API running ...'));
//Define ROUTES
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
