var game = new Phaser.Game(600,480, Phaser.AUTO, '', {
    create : create,
    update : update
});

var countdownLabel = '';
var timer;
var timerEvent;
var gameoverLabel;

function create() {
    timer = game.time.create();

    timerEvent = timer.add(Phaser.Timer.MINUTE * 0.1 + Phaser.Timer.SECOND * 0, endTimer, this);
    countdownLabel = game.add.text(0,0, 'Time: ', {fill: '#fff'});
    gameoverLabel = game.add.text(200, 0, 'Game Over', {fill : '#fff'});
    gameoverLabel.visible = false;

    timer.start();
}

function update() {
    if(timer.running) {
        countdownLabel.text = formatTime(Math.round((timerEvent.delay - timer.ms)/1000));
    }
}

function endTimer() {
    timer.stop();
    gameoverLabel.visible = true;
}


function formatTime(s) {
    // Convert seconds (s) to a nicely formatted and padded time string
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}
