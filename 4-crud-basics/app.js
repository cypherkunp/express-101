// Imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Joi = require('joi');

// Instantiations
const app = express();
let profiles = [{ id: 1, name: 'Devvrat', contact: 9890763747 }];

const profileSchema = {
  name: Joi.string()
    .min(3)
    .required(),
  contact: Joi.number().required()
};

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
// GET
app.get('/api/profiles', (req, res) => {
  res.send(profiles);
});

// Understanding the req object
app.get('/api/profiles/:id', (req, res) => {
  const profile = profiles.find(p => p.id === parseInt(req.params.id));

  if (!profile) res.status(404).send('The profile with the given ID not found.');
  else res.send(profile);
});

// POST
app.post('/api/profiles', (req, res) => {
  const result = Joi.validate(req.body, profileSchema);

  if (result.error) {
    const err = {
      error: {
        message: result.error.details[0].message
      }
    };
    res.status(400).send(err);
    return;
  }

  const profile = {
    id: profiles.length + 1,
    name: req.body.name,
    contact: req.body.contact
  };

  profiles.push(profile);
  res.status(201).send(profile);
});

// PATCH
app.put('/api/profiles/:id', (req, res) => {
  // Lookup the course, if not found return 404
  const profile = profiles.find(p => p.id === parseInt(req.params.id));

  if (!profile) return res.status(404).send('The profile to be updated not found.');

  // if found then validate the req, update and send back the response

  // request validation
  const { error } = Joi.validate(req.body, profileSchema);

  if (error) {
    const err = { error: { message: error.details[0].message } };
    res.status(400).send(err);
    return;
  }
  const updatedProfile = { id: profile.id, name: req.body.name, contact: req.body.contact };
  const profileIndex = profiles.indexOf(profile);
  profiles[profileIndex] = updatedProfile;

  res.status(204).end();
});

// DELETE
app.delete('/api/profiles/:id', (req, res) => {
  const profile = profiles.find(p => p.id === parseInt(req.params.id));

  if (!profile) return res.status(404).send('The profile to be deleted is not found.');

  const profileIndex = profiles.indexOf(profile);
  profiles.splice(profileIndex, 1);

  res.sendStatus(204);
});

// Error Handlers
// #ToDo

// Bootstrap
app.listen(3000);
