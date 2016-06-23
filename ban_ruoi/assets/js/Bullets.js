var Bullets = function(game) {
    this.game = game;
    this.bulletGroup = null;
    this.playerBulletGroup = null;
    this.alienBulletGroup = null;
    this.player = null;
}

Bullets.prototype = {
    preload : function() {
        this.game.load.image('player_bullet', 'assets/images/bullet.png');
        this.game.load.image('alien_bullet', 'assets/images/enemy-bullet.png');
    },

    create : function() {
        this.createPlayerBullet();
        this.createAlienBullet();
    },

    update : function() {
        this.game.physics.arcade.overlap(this.playerBulletGroup, this.getPlayer());
    },

    setPlayer : function(player) {
        this.player = player;
    },

    getPlayer : function() {
        return this.player;
    },

    createBullet : function(quantity, type) {
        this.bulletGroup = this.game.add.group();
        this.bulletGroup.enableBody = true;
        this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.bulletGroup.createMultiple(quantity, type);
        this.bulletGroup.setAll('anchor.x', 0.5);
        this.bulletGroup.setAll('anchor.y', 1);
        this.bulletGroup.setAll('outOfBoundsKill', true);
        this.bulletGroup.setAll('checkWorldBounds', true);
        return this.bulletGroup;
    },

    createPlayerBullet : function() {
        this.playerBulletGroup = this.createBullet(30, 'player_bullet');
    },

    createAlienBullet : function() {
        this.alienBulletGroup = this.createBullet(30, 'alien_bullet');
    },

    getPlayerBullets : function() {
        return this.playerBulletGroup;
    },

    getAlienBullets : function() {
        return this.alienBulletGroup;
    },

    getAllBullets : function() {
        return this.bulletGroup;
    }
}