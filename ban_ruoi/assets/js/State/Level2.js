var Level2 = function(game) {
    this.game = game;
    this.background = new Background(game);
    this.player = new Player(game);
    this.bullets = new Bullets(game);
    this.aliens = new Aliens(game);
    this.explosions = new Explosions(game);
    this.button = new Button(game);
    this.level1 = new Level1(game);
    this.score = new Score(game);
    this._score = 0;
}

Level2.prototype = {

    init : function(score) {
        this._score = score;
    },

    create : function() {
        // Start game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create background
        this.background.create();

        // Create aliens
        this.aliens.createLevel2();

        // Create bullets
        this.bullets.create();

        // Create expolode
        this.explosions.create();

        // Create player
        this.player.create();

        // Create button
        this.button.create(this.callBackGameOverClick, this.callBackGameNextClick);

        // Load bullet for player
        this.player.setBullets(this.bullets.getPlayerBullets());

        // Load bullets for aliens
        this.aliens.setBullets(this.bullets.getAlienBullets());

        // Target player for aliens
        this.aliens.setPlayer(this.player.getPlayer());

        this.score.create(this._score);

        // Events
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update : function() {
        this.background.update();
        this.player.update();
        this.aliens.update();

        // We are fire
        this.aliens.fireLevel2();

        if(this.fireButton.isDown) {
            this.player.fire();
        }

        // Control player
        if(this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        else if(this.cursors.right.isDown) {
            this.player.moveRight();
        }

        if(this.aliens.isClear() && this.player.alive()) {
            this.button.showNext();
        }

        // Event overlap
        this.game.physics.arcade.overlap(this.player.getPlayer(), this.bullets.getAlienBullets(), this.overlapPlayerAlienBulletHander, null, this);
        this.game.physics.arcade.overlap(this.bullets.getPlayerBullets(), this.aliens.getAliens(), this.overlapPlayerBulletAliens, null, this);
    },

    overlapPlayerBulletAliens: function(bullet, alien) {
        alien.kill();
        bullet.kill();

        this.score.update(10);

        this.explosions.boom(alien);
    },

    overlapPlayerAlienBulletHander : function(player, bullet) {
        player.kill();
        bullet.kill();
        this.aliens.getAliens().callAll('kill');
        this.bullets.getAllBullets().callAll('kill');

        this.explosions.boom(player);

        this.button.showGameOver();
    },

    callBackGameOverClick : function() {
        this.game.state.restart(true, false);
        this.game.state.start('game_level_1');
    },

    callBackGameNextClick : function() {
        this.game.state.start('game_level_3');
    }
}