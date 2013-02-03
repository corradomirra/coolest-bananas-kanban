module.exports = function(){
    return {

        configure: function(){

            var config = require('konphyg')('config');
            var mongoConfig = config('mongo');
            var mongoose = require('mongoose');
            mongoose.connect(mongoConfig.connectionPath);

            console.log('Connecting to ' + mongoConfig.connectionPath);

            var connection = mongoose.connection
            connection.on('error', function(err){
                console.log('There has been a MongoDB connection error.');
                console.log(err);
            });

        }

    }
}();