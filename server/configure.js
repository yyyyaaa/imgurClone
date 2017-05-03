var path = require('path'),
    exphbs = require('express-handlebars'),
    express = require('express');
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');

module.exports = function(app) {
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + 'partials']
    }).engine);

    app.set('viewEngine', 'handlebars');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride);
    app.use(cookieParser());
    routes(app);

    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if('development' == app.get('env')){
        app.use(errorHandler());
    }

    return app;
}