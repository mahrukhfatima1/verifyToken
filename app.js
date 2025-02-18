var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let dotenv = require('dotenv');
var sequelize = require('./config/database');//establish database connection
const connectDB = require('./config/mongodb.js');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoute');
var authRouter = require('./routes/authRoute');
var verifyToken = require('./middleware/authMiddleware');
var commentRouter = require('./routes/commentRoute');
var postRouter = require('./routes/postRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

dotenv.config();

//establish database connection
async function checkDatabaseConnection () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

checkDatabaseConnection();//establish database connection

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(verifyToken);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/comment', commentRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

connectDB();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
