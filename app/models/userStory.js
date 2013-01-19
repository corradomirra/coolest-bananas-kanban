var mongoose = require('mongoose');

var UserStorySchema = new mongoose.Schema({
});

var UserStory = mongoose.model('UserStory', UserStorySchema);

module.exports = {
      Model : UserStory
    , Schema : UserStorySchema
}