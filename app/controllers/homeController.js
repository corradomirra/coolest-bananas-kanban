module.exports = function(app){

    var _userStoryService = require('../applicationServices/userStoryService');

    app.get('/', function(req, res){
        _userStoryService.findAll(function(err, userStories){
            res.render('home/index', {userStories:userStories});
        });
    });

}