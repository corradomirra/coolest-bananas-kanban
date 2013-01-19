describe('appLocals', function(){

    var app;

    before(function(){
        app = {}
        app.locals = {}
    });

    var assert = require('assert');
    var should = require('should');
    var gently = new (require('gently'));
    var rewire = require('rewire');

    var readFileSyncCalls;
    var compileCalls;
    var renderCalls;

    beforeEach(function(done){
        readFileSyncCalls = [];
        compileCalls = [];
        renderCalls = [];
        var renderStageStories = rewire('../appLocals.renderStageStories');
        renderStageStories.__set__('fs', {
            readFileSync:function(path){
                readFileSyncCalls.push(path);
            }
        });
        renderStageStories.__set__('jade', {
            compile:function(file){
                compileCalls.push(file);
                return function(params){
                    renderCalls.push(params);
                    return 'html';
                };
            }
        });
        renderStageStories.__set__('dirname', 'root');


        renderStageStories.register(app);
        done();
    });

    describe('#register', function(){

        it('should assign a function to render stage stories', function(done){
            typeof(app.locals.renderStageStories).should.not.equal('undefined');
            done();
        });

    });

    describe('#renderStageStories', function(){

        var getUserStories = function(){
            var userStories = [];
            userStories.push({ _id:1, stage:'a' });
            userStories.push({ _id:2, stage:'b' });
            userStories.push({ _id:3, stage:'a' });
            return userStories;
        }

        it('should get the template once when there are three user stories', function(done){
            app.locals.renderStageStories('a', getUserStories());
            readFileSyncCalls.length.should.equal(1);
            done();
        });

        it('should get the correct template', function(done){
            app.locals.renderStageStories('a', getUserStories());
            readFileSyncCalls[0].should.equal('root/views/partials/userStory.jade');
            done();
        });

        it('should compile the template once when there is three user stories', function(done){
            app.locals.renderStageStories('a', getUserStories());
            compileCalls.length.should.equal(1);
            done();
        });

        it('should render the template two times when there is two user stories in the stage', function(done){
            app.locals.renderStageStories('a', getUserStories());
            renderCalls.length.should.equal(2);
            done();
        });

        it('should render the template with the correct parameters', function(done){
            var userStories = getUserStories();
            app.locals.renderStageStories('a', userStories);
            renderCalls[0].should.equal(userStories[0]);
            renderCalls[1].should.equal(userStories[2]);
            done();
        });

        it('should return the correct HTML', function(done){
            var html = app.locals.renderStageStories('a', getUserStories());
            html.should.equal('htmlhtml');
            done();
        });

    });

    afterEach(function(done){
        done();
    });

    after(function(){

    });

});