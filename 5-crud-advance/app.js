// Imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

// Configurations
const port = process.env.PORT || 3000;

// initialization
const app = express();
let profile = [];

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
// GET

app.get('/api/profile', (req, res) => {
    res.status(200).send(profile);
    console.log(`Response served successfully...`);
});

app.get('/api/profile/:id', (req, res) => {
    res.status(200).send(profile[req.params.id]);
    console.log(`id: ${req.params.id} | Response served successfully...`);
});

// POST
app.post('/api/profile', (req, res) => {
    let id = profile.length;
    profile.push(req.body);
    profile[id]['id'] = id;
    console.log(`id: ${profile.length} | Profile created successfully...`);
    res.status(201).send(profile);
});

// PATCH
app.patch('/api/profile/:id', (req, res) => {
    Object.assign(profile[req.params.id], req.body);
    console.log(`id: ${req.params.id} | Profile updated successfully...`);
    res.status(200).end();
});

// DELETE
app.delete('/api/profile/:id', (req, res) => {
    profile.splice(req.params.id, 1);
    console.log(`id: ${req.params.id} | Profile updated successfully...`);
    response.status(200).end();
});

// error handlers

// bootstrap
const port 
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});