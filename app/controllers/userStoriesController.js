module.exports = function(app){

    var userStoryService = require('../applicationServices/userStoryService');

    app.io.route('createUserStory', function(req){
        userStoryService.create({ stage: 'new' }, function(err, userStory){
            app.io.broadcast('userStoryCreated', userStory);
        });
    });

    app.io.route('updateUserStoryStage', function(req){
        userStoryService.updateStage(req.data.id, req.data.stage, function(err, userStory){
            req.io.broadcast('userStoryStageUpdated', userStory);
        });
    });

}