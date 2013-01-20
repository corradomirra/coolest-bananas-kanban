var userStoryService = require('../applicationServices/userStoryService');
var jade = require('jade');
var fs = require('fs');

exports.create = function(req, res){
    userStoryService.create({ stage: 'new' }, function(err, userStory){
        req.io.emit('userStoryCreated', userStory);
    });
}

exports.updateStage = function(req, res){
    userStoryService.updateStage(req.data.id, req.data.stage, function(err, userStory){
        req.io.broadcast('userStoryStageUpdated', userStory);
    });
}