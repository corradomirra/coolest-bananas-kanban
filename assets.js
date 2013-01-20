var Assets = function(){

    var rack = require('asset-rack');

    return{
        init: function(){
            return new rack.AssetRack([
                new rack.JadeAsset({
                    url: '/partials.js',
                    dirname: __dirname + '/app/views/partials',
                    clientVariable: 'Partials'
                })
            ]);
        }
    }

}();

module.exports = Assets;