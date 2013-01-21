var mongoose = require('mongoose');

var UserStorySchema = new mongoose.Schema({
      stage : { type: String, require: true }
    , text : { type: String, require:true }
});

var UserStory = mongoose.model('UserStory', UserStorySchema);

module.exports = {
      Model : UserStory
    , Schema : UserStorySchema
}