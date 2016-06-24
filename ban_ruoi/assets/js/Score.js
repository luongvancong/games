var Score = function(game) {
    this.game = game;
    this.score = 0;
}

Score.prototype = {

    setScore : function(score) {
        this.score = score;
    },

    getScore : function() {
        return this.score;
    },

    show : function() {
        this.game.add.text(10,20, 'Score: ' + this.getScore(), {fontSize: '20px', fill: '#fff'});
    }
}