const router = require('express').Router();
const Joi = require('joi');

const errorObj = {
  error: {
    message: ''
  }
};
const courses = [];
let courseID = 0;

router.get('/api/courses', (req, res) => {
  res.send(courses);
});

router.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);

  if (!error) {
    courseID++;
    const course = {
      id: courseID,
      name: req.body.name
    };
    courses.push(course);
    return res.status(201).send(course);
  } else {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);

    if (validateError(errorMessage)) return res.status(400).send(errorObj);
    else return res.sendStatus(400);
  }
});

router.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    errorObj.error.message = `The course with the id: ${req.params.id} not found.`;
    return res.status(404).send(errorObj);
  } else {
    return res.send(course);
  }
});

router.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    errorObj.error.message = `The course with the id: ${req.params.id} not found.`;
    return res.status(404).send(errorObj);
  } else {
    const { error } = validateCourse(req.body);

    if (!error) {
      course.name = req.body.name;
      return res.status(202).send(course);
    } else {
      const errorMessage = error.details[0].message;
      console.log(errorMessage);

      if (validateError(errorMessage)) return res.status(400).send(errorObj);
      else return res.sendStatus(400);
    }
  }
});

router.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    errorObj.error.message = `The course with the id: ${req.params.id} not found.`;
    return res.status(404).send(errorObj);
  } else {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.send(course);
  }
});

// Helper functions
function validateError(errorMessage) {
  if (errorMessage.includes(`"name" is required`))
    errorObj.error.message = `The "name" property is required.`;
  else if (errorMessage.includes(`"name" length must be at least 3 characters long`))
    errorObj.error.message = `The "name" property should be at least 3 characters long.`;
  else errorObj.error.message = '';

  return errorObj.error.message;
}

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;
