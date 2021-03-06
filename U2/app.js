var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var nosotrosRouter = require('./routes/nosotros')
var serviciosRouter = require('./routes/servicios')
var contactoRouter = require('./routes/contacto')
//var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.post('/saludo', function (req, res) {
  var nombre = req.body.nombre ||'';
  var saludo = '';

  if (nombre != '')
  saludo = "Hola " + nombre;

  res.send(saludo);
});



//app.get('/servicios', function(req,res,next){res.send('aca hay servicios')});

//app.get('/contactenos', function(req,res,next){console.log('la respuesta sera enviada por la siguiente funcion...');next();}, function (req, res){res.send('Por aca puede contactarnos')});

//app.get('/imagenes', function(req,res,next){res.send('promiximamente imagenes...')});

app.use('/', indexRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/servicios', serviciosRouter);
app.use('/contacto', contactoRouter);
//app.use('/users', usersRouter);

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
