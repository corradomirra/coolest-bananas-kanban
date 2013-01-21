coolestBananas.kanban.dragging = function(){

    return {
        init: function(){

            var stageLocations = [];
            var $stages = $('.stage');
            $stages.each(function(i){
                var $this = $(this);
                var left = $this.offset().left;
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
                    $(this).attr('style', 'position:relative;');
                    if(typeof(hoverStage) !== 'undefined' && hoverStage !== null){
                        $(hoverStage.selector).append(this);
                        $(hoverStage.selector).removeClass('stage-hover');
                    }

                    if(startStage.id !== hoverStage.id){
                        var data = { id:$(this).attr('id'), stage:hoverStage.id }
                        $(document).trigger('coolestBananas.kanban.dragging.userStoryChangedStage', data);
                    }
                }
            });

        }
    }

}();