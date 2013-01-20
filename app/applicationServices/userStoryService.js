var userStoryModel = require('../models/userStory').Model;
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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

exports.updateStage = function(id, stage, next){
    userStoryModel.findOne({_id:ObjectId(id)}, function(err, userStory){
        userStory.stage = stage;
        userStory.save(function(err){
            next(err, userStory);
        });
    });
}