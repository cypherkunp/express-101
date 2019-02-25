// Imports
const express = require('express');
const coursesRoute = require('./routes/course');
const indexRoute = require('./routes/home');

// Initialization
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(indexRoute);
app.use(coursesRoute);

// Bootstrap
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
