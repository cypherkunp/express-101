// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug');
const path = require('path');

// loggers
const appLog = debug('app:log');
const dbLog = debug('db:log');

const coursesRoute = require('./routes/course');
const indexRoute = require('./routes/home');

// Initialization/Configurations
const app = express();
const env = process.env.NODE_ENV || app.get('env');
const port = process.env.PORT || 3000;
const appName = config.get('name');
const appDBHost = config.get('db.host');
// password is mapped to the app_PASSWORD environment variable
const appPassword = config.get('db.password');

appLog(`app: ${env}`); // Returns development by default
appLog(`NODE_ENV: ${process.env.NODE_ENV}`); // Returns undefined if not set
appLog(`app name: ${appName}`);
dbLog(`app db host: ${appDBHost}`);
dbLog(`app db password: ${appPassword}`);

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(helmet());

if (env === 'development') {
  app.use(morgan('dev'));
  appLog('Morgan enabled...');
}

// Routes
app.use(indexRoute);
app.use(coursesRoute);

// Bootstrap
app.listen(port, () => console.log(`Listening on port ${port}...`));
