var userStoryService = require('../applicationServices/userStoryService');

exports.index = function(req, res){
    userStoryService.findAll(function(err, userStories){
        res.render('home/index', {userStories:userStories});
    });
}