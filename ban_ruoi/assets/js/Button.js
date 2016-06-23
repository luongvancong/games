var Button = function(game) {
    this.game = game;
    this.buttonGameOver = null;
    this.buttonNext = null;
}

Button.prototype = {
    preload : function() {
        this.game.load.image('game_play', 'assets/images/buttons/game_play.png');
        this.game.load.image('game_over', 'assets/images/buttons/game_over.png');
        this.game.load.image('game_next', 'assets/images/buttons/game_next.png');
    },

    create : function() {
        this.createGameOver();
        this.createGameNext();
    },

    createGameOver : function() {
        this.buttonGameOver = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'game_over', this.actionOnClick,this);
        this.buttonGameOver.anchor.setTo(0.5,0.5);
        this.buttonGameOver.visible = false;
    },

    createGameNext : function() {
        this.buttonNext = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'game_next', this.actionNext, this);
        this.buttonNext.anchor.setTo(0.5, 0.5);
        this.buttonNext.visible = false;
    },

    showGameOver : function() {
        this.buttonNext.visible = false;
        this.buttonGameOver.visible = true;
    },

    showNext : function() {
        this.buttonNext.visible = true;
    },

    actionOnClick : function() {
        this.game.state.restart(true, false);
        this.game.state.start('game_level_1');
    },

    actionNext : function() {
        if(this.game.state.current == 'game_level_1') {
            this.game.state.start('game_level_2');
        }
        else if(this.game.state.current == 'game_level_2') {
            this.game.state.start('game_level_1');
        }
    }
}