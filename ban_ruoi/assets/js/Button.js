var Button = function(game) {
    this.game = game;
}

Button.prototype = {
    preload : function() {
        this.game.load.image('game_play', 'assets/images/buttons/game_play.png');
        this.game.load.image('game_over', 'assets/images/buttons/game_over.png');
        this.game.load.image('game_next', 'assets/images/buttons/game_next.png');
    },

    create : function() {
        var buttonGameOver = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'game_over', this.actionOnClick,this);
        buttonGameOver.anchor.setTo(0.5,0.5);
    },

    actionOnClick : function() {
        this.game.state.restart(true, false);
        this.game.state.start('game_level_1');
    },

    showNext : function() {
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'game_next', this.actionNext, this);
        button.anchor.setTo(0.5, 0.5);
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