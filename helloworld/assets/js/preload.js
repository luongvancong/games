var Preload = function(game) {
    this.platforms = null;
}

Preload.prototype = {
    preload : function() {
        game.load.image('sky', 'assets/images/sky.jpg');
        game.load.image('ledge', 'assets/images/ledge.png');
        game.load.spritesheet('hero', 'assets/images/dude.png', 32, 48);
        game.load.image('star', 'assets/images/star.png');
    },

    create : function() {
        // Add sky
        game.add.sprite(0, 200, 'sky');

        // Draw score
        game.add.text(16, 16, 'Scrore : 0', {fontSize: '30px', backgroundColor: '#fff'});

        // Next state
        game.state.start('game', false);
    }
}