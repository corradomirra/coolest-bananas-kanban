coolestBananas.kanban.socket = function(){

    return{
        init:function(io){

            $(function(){
                $('#doit').click(function(){
                    io.emit('createUserStory', {});
                });
            });

            io.on('userStoryCreated', function(userStory){
                $(Partials['userStory'](userStory)).hide().appendTo('#new').fadeIn(500);
            });

            io.on('userStoryStageUpdated', function(userStory){
                $('#' + userStory._id).fadeOut(500, function(){
                    $('#' + userStory._id).appendTo('#' + userStory.stage);
                    $('#' + userStory._id).fadeIn(500);
                });
            });

            $(document).bind('coolestBananas.kanban.dragging.userStoryChangedStage', function(e, data){
                io.emit('updateUserStoryStage', data);
                coolestBananas.kanban.dragging.init();
            });

            $(document).bind('coolestBananas.kanban.creator.createButtonClicked', function(e, data){
                io.emit('createUserStory', data);
            });

        }
    }

}();