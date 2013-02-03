module.exports = function(){

    var _mongoose = require('mongoose');

    var UserStorySchema = new _mongoose.Schema({
          stage : { type: String, require: true }
        , text : { type: String, require: true }
    });

    var UserStory = _mongoose.model('UserStory', UserStorySchema);

    return { Model: UserStory, Schema: UserStorySchema }

}();