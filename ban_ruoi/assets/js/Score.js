var Score = function(game) {
    this.game = game;
    this.score = 0;
    this.scoreText = null;
}

Score.prototype = {

    create : function(score) {
        this.score = score;
        this.scoreText = this.game.add.text(10,20, 'Score: ' + score, {fontSize: '20px', fill: '#fff'});
    },

    reset : function() {
        this.score = 0;
    },

    getCurrentScore : function() {
        return this.score;
    },

    update: function(score) {
        this.score += score;
        this.scoreText.text = 'Score: ' + this.score;
    }
}