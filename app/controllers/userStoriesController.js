var userStoryService = require('../applicationServices/userStoryService');
var jade = require('jade');
var fs = require('fs');

exports.create = function(req, res){
    userStoryService.create({ stage: 'new' }, function(err, userStory){
        req.io.emit('userStoryCreated', userStory);
    });
}