var Boss = function() {

}

Boss.prototype = {
    preload : function() {
        game.load.spritesheet('boss', 'assets/images/boss.png');
    },

    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },

    update : function() {

    }
}