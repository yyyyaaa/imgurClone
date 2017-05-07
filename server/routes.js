var express = require('express'),
    path = require('path'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/images'),
    multer = require('multer');

module.exports = function(app){
    var uploads = multer({
        dest: path.join(__dirname, 'public/uploads/temp')
    });
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', uploads.single('image'), image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id', image.destroy);
    app.use(router);
}