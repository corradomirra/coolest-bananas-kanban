module.exports = function(app){

    var userStoryService = require('../applicationServices/userStoryService');

    app.get('/', function(req, res){
        userStoryService.findAll(function(err, userStories){
            res.render('home/index', {userStories:userStories});
        });
    });

}