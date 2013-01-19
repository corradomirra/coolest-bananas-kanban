
/**
 * Module dependencies.
 */

require('./dbConnection').configure();

var express = require('express.io');

var http = require('http');
var path = require('path');

var homeController = require('./app/controllers/homeController');
var userStoriesController = require('./app/controllers/userStoriesController');
var partialsController = require('./app/controllers/partialsController');

var rack = require('asset-rack');
var assets = new rack.AssetRack([
    new rack.JadeAsset({
        url: '/partials.js',
        dirname: __dirname + '/app/views/partials',
        clientVariable: 'Partials'
    })
]);

assets.on('complete', function(){
    var app = express().http().io();

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/app/views');
        app.set('view engine', 'jade');
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(assets);
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function(){
        app.use(express.errorHandler());
    });

    app.get('/', homeController.index);
    app.get('/partials/user-story', partialsController.renderUserStory);

    app.io.route('click', function(req){
        console.log('yes I did it!');
    });

    app.io.route('createUserStory', userStoriesController.create);

    app.listen(3000);

});