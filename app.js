var express = require('express'),
    config = require('./server/configure'),
    app = express();

// Port setup
app.set('port', process.env.PORT || 3000)

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// Configure app instance
app = config(app);

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
