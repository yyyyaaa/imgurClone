var express = require('express'),
    path = require('path'),
    config = require('./server/configure'),
    mongoose = require('mongoose'),
    app = express();

// Port setup
app.set('port', process.env.PORT || 3000)

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Configure app instance
app = config(app);

// Fix mongoose deprecation warning
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connection.on('open', function(){
  console.log('Mongoose connected');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(app.get('port'), function(){
  console.log('Server up: http://localhost:' + app.get('port'));
});

module.exports = app;
