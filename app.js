const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connectDB = require('./config/db');

// Routes
const indexRouter = require('./routes/index');
const users = require('./routes/api/users');

// Load the environment variables
dotenv.config({ path: './config/config.env' });

// Connection to MongoDB Atlas
connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))

  app.use(express.static(path.join(__dirname, 'public')));
}

// Mount routers
app.use('/', indexRouter);

// Admin functionality ----> Remember to comment out on production since it is currently not protected. This is used to view and create users in the mongo db via postman.
app.use('/api/users', users)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 7246;

const server = app.listen(
  PORT, console.log(colors.blue.bold(`The server is running in ${process.env.NODE_ENV} mode on PORT:${PORT}`))
)

module.exports = app;
