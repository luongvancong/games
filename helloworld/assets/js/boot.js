var Boot = function(game) {

}

Boot.prototype = {
    preload : function() {
        console.log('preload');
        game.load.image('loading', 'assets/images/loading.gif');
    },

    create : function() {
        game.add.sprite(0, 0, 'loading');
    },

    update : function() {

    }
}