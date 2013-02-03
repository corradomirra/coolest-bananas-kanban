module.exports = function(app){

    var _userStoryService = require('../applicationServices/userStoryService');

    app.io.route('createUserStory', function(req){
        _userStoryService.create({ stage: 'new', text: req.data }, function(err, userStory){
            app.io.broadcast('userStoryCreated', userStory);
        });
    });

    app.io.route('updateUserStoryStage', function(req){
        _userStoryService.updateStage(req.data.id, req.data.stage, function(err, userStory){
            req.io.broadcast('userStoryStageUpdated', userStory);
        });
    });

}