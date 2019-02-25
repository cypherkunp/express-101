const express = require('express');
const app = express();
const courses = [{ id: 1, name: 'course1' }, { id: 2, name: 'course2' }];

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res
      .status(404)
      .send({ error: { message: `The course with the id: ${req.params.id} not found.` } });
  } else {
    res.send(course);
  }
});

app.post('/api/courses', (req, res) => {
  console.log(req.body);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(201).send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
