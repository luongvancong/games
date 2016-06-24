var Preload = function(game) {
    this.game = game;
    this.background = new Background(game);
    this.player = new Player(game);
    this.bullets = new Bullets(game);
    this.aliens = new Aliens(game);
    this.explosions = new Explosions(game);
    this.button = new Button(game);
    this.score = new Score(game);
}

Preload.prototype = {
    preload: function() {
        this.background.preload();
        this.player.preload();
        this.bullets.preload();
        this.aliens.preload();
        this.explosions.preload();
        this.button.preload();

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