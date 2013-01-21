coolestBananas.kanban.creator = function(){

    var getCharacter = function(charCode){
        if(charCode === 32) return ' ';
        if(charCode === 97) return 'a';
        if(charCode === 98) return 'b';
        if(charCode === 99) return 'c';
        if(charCode === 100) return 'd';
        if(charCode === 101) return 'e';
        if(charCode === 102) return 'f';
        if(charCode === 103) return 'g';
        if(charCode === 104) return 'h';
        if(charCode === 105) return 'i';
        if(charCode === 106) return 'j';
        if(charCode === 107) return 'k';
        if(charCode === 108) return 'l';
        if(charCode === 109) return 'm';
        if(charCode === 110) return 'n';
        if(charCode === 111) return 'o';
        if(charCode === 112) return 'p';
        if(charCode === 113) return 'q';
        if(charCode === 114) return 'r';
        if(charCode === 115) return 's';
        if(charCode === 116) return 't';
        if(charCode === 117) return 'u';
        if(charCode === 118) return 'v';
        if(charCode === 119) return 'w';
        if(charCode === 120) return 'x';
        if(charCode === 121) return 'y';
        if(charCode === 122) return 'z';

        return '';
    }

    return {
        init: function(){
            $(document).keypress(function(e){

                var options = {
                    opacity:80,
                    overlayCss:{backgroundColor:"#fff"},
                    onOpen: function (dialog) {
                        dialog.overlay.fadeIn(200, function () {
                            dialog.container.slideDown(200, function () {
                                dialog.data.fadeIn(200);
                            });
                        })},
                    onShow: function(dialog){
                        $('#create').click(function(e){
                            e.preventDefault();
                            $(document).trigger('coolestBananas.kanban.creator.createButtonClicked', $('#text').val());
                            $.modal.close();
                        });
                    }
                }


                $(Partials['creator']()).modal(options);

                $('#text').val($('#text').val() + getCharacter(e.charCode))
            });
        }
    }

}();