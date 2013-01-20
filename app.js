
/**
 * Module dependencies.
 */

require('./dbConnection').configure();

var express = require('express.io');

var http = require('http');
var path = require('path');

var homeController = require('./app/controllers/homeController');
var userStoriesController = require('./app/controllers/userStoriesController');

var assets = require('./assets').init();

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

    app.io.route('createUserStory', userStoriesController.create);
    app.io.route('updateUserStoryStage', userStoriesController.updateStage);

    require('./appLocals.renderStageStories').register(app);

    app.listen(3000);

});