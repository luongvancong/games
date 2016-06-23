var Background = function(game) {
    this.game = game;
    this.space = null;
}

Background.prototype = {
    preload : function() {
        this.game.load.image('space', 'assets/images/starfield.png');
    },

    create : function() {
        this.space = this.game.add.tileSprite(0,0,800,600, 'space');
    },

    update : function() {
        this.space.tilePosition.y += 2;
    }
}