var Boot = function(game) {
    this.game = game;
}

Boot.prototype = {
    preload : function() {
        this.game.load.spritesheet('loading', 'assets/images/loading.png', 48, 48);
    },

    create : function() {
        this.game.state.start('game_loading');
    }
}