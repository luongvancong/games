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

    create : function(callBackGameOverClick, callBackGameNextClick, context) {
        this.createGameOver(callBackGameOverClick, context);
        this.createGameNext(callBackGameNextClick, context);
    },

    createGameOver : function(callBackGameOverClick, context) {
        this.buttonGameOver = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'game_over', callBackGameOverClick,context);
        this.buttonGameOver.anchor.setTo(0.5,0.5);
        this.buttonGameOver.visible = false;
    },

    createGameNext : function(callBackGameNextClick, context) {
        this.buttonNext = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'game_next', callBackGameNextClick, context);
        this.buttonNext.anchor.setTo(0.5, 0.5);
        this.buttonNext.visible = false;
    },

    showGameOver : function() {
        this.buttonNext.visible = false;
        this.buttonGameOver.visible = true;
    },

    showNext : function() {
        this.buttonNext.visible = true;
    }
}