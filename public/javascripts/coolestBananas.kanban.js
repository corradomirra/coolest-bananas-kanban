$(function(){
    coolestBananas.kanban.socket.init(io.connect());
    coolestBananas.kanban.dragging.init();
    coolestBananas.kanban.creator.init();
});