var Explosions = function(game) {
    this.game = game;
    this.explodes = null;
}

Explosions.prototype = {
    preload : function() {
        this.game.load.spritesheet('boom', 'assets/images/explode.png', 128, 128);
    },

    create : function() {
        var explodes = this.game.add.group();
        explodes.createMultiple(30, 'boom');
        explodes.forEach(function(explode) {
            explode.anchor.setTo(0.5, 0.5);
            explode.enableBody = true;
            explode.animations.add('boom');
        });

        this.explodes = explodes;
    },

    boom : function(alien) {

        var boom = this.explodes.getFirstExists(false);

        if(boom) {
            boom.reset(alien.body.x, alien.body.y);
            boom.animations.play('boom', 30, false, true);
        }
    },

    getExplosionGroup : function() {
        return this.explodes;
    }
}