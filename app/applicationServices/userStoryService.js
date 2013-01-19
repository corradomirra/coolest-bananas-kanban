var userStoryModel = require('../models/userStory').Model;

exports.create = function(params, next){
    var userStory = new userStoryModel(params);
    userStory.save(function(err){
        next(err, userStory);
    });
}

exports.findAll = function(next){
    userStoryModel.find(function(err, userStories){
        next(err, userStories);
    });
}