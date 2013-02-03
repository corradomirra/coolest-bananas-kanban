module.exports = function(){

    var _userStoryModel = require('../models/userStory').Model;
    var _mongoose = require('mongoose');
    var _objectId = _mongoose.Types.ObjectId;

    return {

        create: function(params, next){
            var userStory = new _userStoryModel(params);
            userStory.save(function(err){
                next(err, userStory);
            });
        },

        findAll: function(next){
            _userStoryModel.find(function(err, userStories){
                next(err, userStories);
            });
        },

        updateStage: function(id, stage, next){
            _userStoryModel.findOne({ _id : _objectId(id) }, function(err, userStory){
                userStory.stage = stage;
                userStory.save(function(err){
                    next(err, userStory);
                });
            });
        }

    }
}();