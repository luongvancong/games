var Game = function(game) {

}

Game.prototype = {
    preload : function() {

    },

    create : function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Draw hero
        this.hero = game.add.sprite(0, game.world.height - 150, 'hero');
        game.physics.arcade.enable(this.hero);

        this.hero.body.gravity.y = 800;
        this.hero.body.bounce.y = 0.2;
        this.hero.body.collideWorldBounds = true;

        this.hero.animations.add('left', [0,1,2,3], 10, true);
        this.hero.animations.add('right', [5,6,7,8], 10, true);

        this.platforms = game.add.group();
        this.platforms.enableBody = true;


        // Draw ledge
        var ledge = this.platforms.create(200, 200, 'ledge');
        ledge.body.immovable = true;
        ledge = this.platforms.create(400, 400, 'ledge');
        ledge.body.immovable = true;

        // Draw star
        this.stars = game.add.group();
        this.stars.enableBody = true;
        this.stars.immovable = true;
        // this.stars.body.collideWorldBounds = true;

        for(var i = 0; i < 120; i ++) {
            var star = this.stars.create(Math.random() * 500, Math.random() * 100, 'star');

            star.body.gravity.y = Math.random() * 10;
            star.body.bounce.y = Math.random() * 0.2;
            star.body.bounce.x = Math.random() * 0.5;
            star.body.collideWorldBounds = true;
        }
    },

    update : function() {


        var cursors = game.input.keyboard.createCursorKeys();

        var hero = this.hero;

        hero.body.velocity.x = 0;

        if(cursors.left.isDown) {
            hero.body.velocity.x = -150;
            hero.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            hero.body.velocity.x = 150;

            hero.animations.play('right');
        }
        else if (cursors.down.isDown)
        {
            hero.body.velocity.y = 150;
        }
        else
        {
            //  Stand still
            hero.animations.stop();

            hero.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown)
        {
            hero.body.velocity.y = -350;
        }

        game.physics.arcade.collide(this.hero, this.stars);
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.collide(this.hero, this.platforms);
    },

    render : function() {
        game.debug.spriteInfo(this.hero, 64, 64);
    }
}