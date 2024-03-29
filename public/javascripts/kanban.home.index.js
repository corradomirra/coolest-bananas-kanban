$(function(){

    var isLastStage = function(i, $stages){
        return i === $stages.length -1;
    }

    var stageLocations = [];
    var $stages = $('.stage');
    $stages.each(function(i){
        var $this = $(this);
        var left = $this.offset().left;
//        if(i === $stages.length -1)
//            console.log('ya');

        var threshold = left + $this.width();

        stageLocations.push({
            left: left,
            threshold: threshold,
            selector: '#' + $this.attr('id'),
            id: $this.attr('id')
        });
    });


    var getStageLocation = function($this){
        var position = $this.offset();
        var currentPosition = {left: position.left + ($this.width() / 2)};
        var stageLocation = stageLocations.filter(function(location){
            return currentPosition.left >= location.left && currentPosition.left <= location.threshold;
        });
        return stageLocation[0];
    }




    var startStage;
    var hoverStage;

    $('.draggable').draggable({
        start: function(){
            startStage = getStageLocation($(this));
            $(startStage).addClass('stage-hover');
            hoverStage = null;
        },
        drag: function(){
            var nextHoverStage = getStageLocation($(this));
            if(hoverStage !== nextHoverStage){
                if(hoverStage !== null)
                    $(hoverStage.selector).removeClass('stage-hover');

                if(typeof(nextHoverStage) !== 'undefined')
                    $(nextHoverStage.selector).addClass('stage-hover');

                hoverStage = nextHoverStage;
            }

        },
        stop: function(){
            $(this).removeAttr('style');
            if(typeof(hoverStage) !== 'undefined' && hoverStage !== null){
                $(hoverStage.selector + ' > .stage-stories').append(this);
                $(hoverStage.selector).removeClass('stage-hover');
            }

            if(startStage.id !== hoverStage.id){
                var data = { id:$(this).attr('id'), stage:hoverStage.id }
                $(document).trigger('coolestBananas.kanban.home.index.userStoryChangedStage', data);
            }
        }
    });

});