var Boot = function() {

}

var data = {
    "frames": [
        {
            "filename" : "free",
            "frame": {"x": 0, "y" : 0, "w": 402, "h" : 81}
        },
        {
            "filename" : "over",
            "frame": {"x" : 0, "y" : 95, "w": 402, "h" : 81}
        }
    ]
};


Boot.prototype = {
    preload : function() {

        this.game.load.spritesheet('loading', '/assets/images/loading.png', 48, 48);
        this.game.load.image('button', 'assets/images/button.png', 402, 81);
        this.game.load.atlas('button_sprite', 'assets/images/button_sprite.png', 'assets/jsons/button.json');

        this.game.load.image('bg', 'assets/images/bg.jpg', 1060, 600);


        // Setup
        var violympic = new Violympic();
        violympic.setClass(1);
        violympic.setLevel(1);
        violympic.setGameId(1);
        // Set env
        violympic.setEnv(ENV);

        this.game.load.xml('game_data', violympic.getApiUrlGameData());

        this.violympic = violympic;
    },

    create : function() {
        this.violympic.setXml(this.game.cache.getXML('game_data'));
        this.drawLoading();
        this.game.state.start('Game', true, false, this.violympic);
    },

    drawLoading: function() {
        var loading = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'loading');
        loading.anchor.setTo(0.5);
        loading.animations.add('loading');
        loading.animations.play('loading', 8, true);

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY+60, 'Loading...', {fill: '#fff'});
        text.anchor.setTo(0.5);
    }

}