const express = require('express');
const connectToDB = require('./config/db');

const app = express();
connectToDB();

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
