const express = require('express');

const connectToDB = require('./config/db');

const userRoute = require('./routes/api/user');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/post');
const authRoute = require('./routes/api/auth');

const app = express();
connectToDB();

app.get('/', (req, res) => res.send('API is running'));

//define all the routes
app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/post', postRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
