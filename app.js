var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session")
const passport= require("./passport")
var flash = require('connect-flash');

var association= require('./models/asocciate');
association();

var fileUpload=require('express-fileupload');

var app = express();

app.use(fileUpload({useTempFiles: true}));
const hbs = require('hbs');
var loggedInGuard=require('./middlewares/loggedInGuard')

app.use(flash());
app.use(session({ secret: process.env.SECRET_SESSION }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.student=req.user;
  next()
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var courseRouter = require('./routes/courses');
var coursedetailsRouter = require('./routes/course_details');

var authRouter= require('./routes/auth')
var meRouter= require('./routes/me')
var apiRouter = require('./routes/api')



//this required before view engine setup
hbs.registerPartials(__dirname + '/views/partials');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var paginate = require('handlebars-paginate');
 hbs.registerHelper('paginate', paginate);

 app.use('/', authRouter);
app.use('/', indexRouter);

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/me',loggedInGuard, meRouter);

app.use('/courses', courseRouter);
app.use('/course_details', coursedetailsRouter);

app.use('/apply', (req,res)=>{res.render('contact/apply')})

app.use('/api', apiRouter);

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

module.exports = app;
