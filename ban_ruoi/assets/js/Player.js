var Player = function(game) {
    this.game = game;
    this.player = null;
    this.cursors = null;
    this.fireButton = null;
    this.bullets = null;
    this.bulletTime = 0;
}

Player.prototype = {
    preload : function() {
        this.game.load.image('player', 'assets/images/player.png');
    },

    create : function() {
        this.player = this.game.add.sprite(400, 500, 'player');
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update : function() {
        this.player.body.velocity.setTo(0,0);
    },

    setBullets : function(bullets) {
        this.bullets = bullets;
    },

    getPlayer : function() {
        return this.player;
    },

    fire : function() {
        if(this.game.time.now > this.bulletTime && this.player.alive) {
            var bullet = this.bullets.getFirstExists(false);
            if(bullet) {
                bullet.reset(this.player.body.x + 14, this.player.body.y - 3);
                bullet.body.velocity.y = -450;
                this.bulletTime = this.game.time.now + 200;
            }
        }
    },

    moveLeft : function() {
        this.getPlayer().body.velocity.x = -200;
    },

    moveRight : function() {
        this.getPlayer().body.velocity.x = 200;
    },

    alive : function() {
        return this.getPlayer().alive ? true : false;
    }
}