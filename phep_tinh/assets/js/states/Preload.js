var Preload = function(game) {

}

Preload.prototype = {
    preload: function() {
        this.game.load.image('button', 'assets/images/button.png');

        this.game.load.image('background', 'assets/images/background.png');
        this.game.load.image('close', 'assets/images/close.png');

        var loading = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'loading');
        loading.anchor.setTo(0.5);
        loading.animations.add('loading');
        loading.animations.play('loading', 8, true);

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY+60, 'Loading...', {fill: '#fff'});
        text.anchor.setTo(0.5);
    },

    create : function() {
        this.game.state.start('game_level_1');
    }
}