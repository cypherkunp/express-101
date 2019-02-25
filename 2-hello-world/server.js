// Imports
const express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Instantiations
const app = express();

// Configurations
/*
app.set('port', process.env.PORT || 3000)
app.set('views', 'templates') // The directory the templates are stored in
app.set('view engine', 'jade')
*/
// Middleware
app.use(bodyParser.json());

app.use(logger('dev'));

app.use((req, res, next) => {
    next();
});

app.use((req, res, next) => {
    if (req.query.appKey) {
        next();
    } else {
        res.status(401).send({
            msg: 'Not Authorized'
        })
    }
});

//Routes
// GET
app.get('/', (req, res, next) => {
    console.log(`[LOG] Base url hit, response not handled`);
    next(new Error('Oppssss something went wrong..'))
}, (req, res) => {
    res.send({
        msg: 'Hello World!'
    });
});

app.get('/helloworld', (req, res) => {
    res.send({
        msg: 'Hello World!'
    });
});

app.get('/accounts', (req, res, next) => {
    console.log('Accounts resource is being served...');
    next();
}, (req, res) => {
    res.send({
        msg: 'Accounts'
    });
});

app.get('/transactions', (req, res) => {
    res.send({
        msg: 'transactions'
    });
});
// POST
app.post('/transactions', (req, res) => {
    console.log(req.body);
    res.send({
        msg: 'transactions'
    });
});
// Error Handlers
app.use((error, req, res, next) => {
    res.status(500).send(error);
});

// Server bootup or export
app.listen(3000);