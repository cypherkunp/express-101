const router = require('express').Router();

router.get('/', (req, res) => {
  const indexData = {
    title: {
      label: 'Rendered by ',
      value: 'PUG'
    },
    message: {
      label: 'Hello',
      value: 'World'
    }
  };
  res.render('index-template', indexData);
});

// For all unsupported operations send 405: Method not allowed
router.all('/', (req, res) => {
  res.sendStatus(405);
});

module.exports = router;
