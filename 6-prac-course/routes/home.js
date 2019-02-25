const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

// For all unsupported operations send 405: Method not allowed
router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;
