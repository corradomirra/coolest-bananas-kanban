var jade = require('jade');
var fs = require('fs');
var dirname = __dirname;
var _ = require('underscore');
var $ = require('jquery');

var appLocalsRenderStageStories = function(){

    var _compiledTemplate;

    var getCompiledTemplate = function(){
        if(typeof(_compiledTemplate) === 'undefined'){
            _compiledTemplate = jade.compile(fs.readFileSync(dirname + '/app/views/partials/userStory.jade'));
        }
        return _compiledTemplate;
    }

    return {
        register: function(app){
            app.locals.renderStageStories = function(stage, userStories){

                var html = '';

                var stageUserStories = _.where(userStories, {stage:stage});
                var compiledTemplate = getCompiledTemplate();
                $(stageUserStories).each(function(){
                    html = html + compiledTemplate(this);
                });

                return html;

            }
        }
    }

}();

module.exports = appLocalsRenderStageStories;