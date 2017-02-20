var botData = {
    "frames": [
        {
            "filename": "0000",
            "frame": { "x": 2, "y": 0, "w": 59, "h": 40 },
        },
        {
            "filename": "0001",
            "frame": { "x": 57, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0002",
            "frame": { "x": 112, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0003",
            "frame": { "x": 167, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0004",
            "frame": { "x": 229, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0005",
            "frame": { "x": 290, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0006",
            "frame": { "x": 358, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0007",
            "frame": { "x": 422, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0008",
            "frame": { "x": 485, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0009",
            "frame": { "x": 550, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0010",
            "frame": { "x": 610, "y": 2, "w": 59, "h": 40 },
        },
        {
            "filename": "0011",
            "frame": { "x": 668, "y": 2, "w": 59, "h": 40 },
        }
    ]
};
var Aliens = function(game) {
    this.game = game;
    this.aliens = null;
    this.bullets = null;
    this.bulletTime = 0;
}

Aliens.prototype = {
    preload : function() {
        this.game.load.spritesheet('aliens', 'assets/images/invader32x32x4.png', 32, 32);
        this.game.load.atlas('aliens_level_2', 'assets/images/fly_monster.png', null, botData);
        this.game.load.image('aliens_level_3', 'assets/images/boss_50.png');
    },

    create : function(rows, cols, keyPicture) {
        this.aliens = this.game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
        for(var x = 0; x < cols; x++) {
            for(var y = 0; y < rows; y ++) {
                var alien = this.aliens.create(x*70, y*50, keyPicture);
                // alien.anchor.setTo(0.5);
                alien.animations.add('fly');
                alien.animations.play('fly', 8, true);
                alien.enableBody = true;
                alien.body.move = false;
            }
        }

        this.aliens.x = 20;
        this.aliens.y = 20;

        var tween = this.game.add.tween(this.aliens).to({x: 100}, 2000, Phaser.Easing.Linear.None, true, 0 , 1000, true);
        tween.onLoop.add(function(){
            this.aliens.y += 5;
        }, this);
    },


    createLevel1: function() {
        this.create(4,10, 'aliens');
    },

    createLevel2 : function() {
        this.create(5,10, 'aliens_level_2');
    },

    createLevel3 : function() {
        this.create(5,10,'aliens_level_3');
    },

    update : function() {

    },

    fireSetUp : function(bulletSpeed, bulletSize, maxBulletTime) {
        if (maxBulletTime === undefined) maxBulletTime = 0;

        var aliens = this.aliens;
        var that = this;
        var player = this.getPlayer();
        var bullet = that.getBullets().getFirstExists(false);

        var alives = [];

        aliens.forEachAlive(function(alien) {
            alives.push(alien);
        });

        var randomAlien = alives[game.rnd.integerInRange(0, alives.length -1)];
        // var randomAlien = alives[2];

        if(bullet) {
            bullet.reset(randomAlien.body.x+35, randomAlien.body.y+35);

            if(bulletSize) {
                bullet.scale.setTo(bulletSize);
            }


            that.game.physics.arcade.moveToObject(bullet, player, bulletSpeed, maxBulletTime);

            if(maxBulletTime == 0) {
                that.bulletTime = that.game.time.now + 200;
            }
        }
    },

    fire : function(fireCallback) {
        if(this.game.time.now > this.bulletTime && this.aliens.countLiving()) {
            if(typeof fireCallback === 'function') {
                fireCallback();
            }
        }
    },

    fireLevel1 : function() {
        var that = this;
        this.fire(function() {
            that.fireSetUp(180);
        });
    },

    fireLevel2 : function() {
        var that = this;
        this.fire(function() {
            that.fireSetUp(180, 1.1);
        });
    },

    fireLevel3 : function() {
        var that = this;
        this.fire(function() {
            that.fireSetUp(300, 1.5, 1800);
        });
    },

    setBullets : function(bullets) {
        this.bullets = bullets;
    },

    getBullets : function() {
        return this.bullets;
    },

    setPlayer : function(player) {
        this.player = player;
    },

    getPlayer : function() {
        return this.player;
    },

    getAliens : function() {
        return this.aliens;
    },

    setExplosion : function(explosion) {
        this.explosion = explosion;
    },

    getExplosion : function() {
        return this.explosion;
    },

    isClear : function() {
        return this.getAliens().countLiving() == 0 ? true : false;
    },

    killAll : function() {
        this.getAliens().callAll('kill');
    }

}