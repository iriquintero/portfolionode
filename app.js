var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require('express-fileupload');
var favicon = require('serve-favicon');

require('dotenv').config();

var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/admin/login');
var portfolioRouter = require('./routes/admin/portfolio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(fileupload());

app.use(session({
  secret:'clavedificil',
  cookie:{maxAge:2592000000},
  resave:false,
  saveUninitialized:true
}));

secured = async(req, res, next)=>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/login');
    }
  }catch(error){
    console.log(error);
  }
};

app.use('/', indexRouter);
app.use('/admin/login',loginRouter);
app.use('/admin/portfolio',secured, portfolioRouter);

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
