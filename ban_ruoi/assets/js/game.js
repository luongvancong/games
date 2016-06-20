var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload : preload,
    create : create,
    update : update,
    render : render
});

var player;
var alients;
var playerBullets;
var alienBullets;
var alienBullet;
var alienBulletTime = 0;
var space;
var cursors;
var fireButton;
var bulletTime = 0;
var explodes;
var aliveAliens = [];
var stateText;
var soundBoomb;
var soundBackground;

function preload() {
    game.load.image('player_bullet', 'assets/images/bullet.png');
    game.load.image('enemy_bullet', 'assets/images/enemy-bullet.png');
    game.load.image('space', 'assets/images/starfield.png');
    game.load.image('player', 'assets/images/player.png');
    game.load.spritesheet('alients', 'assets/images/invader32x32x4.png', 32, 32);
    game.load.spritesheet('explode', 'assets/images/explode.png', 128, 128);
    game.load.image('invader', 'assets/images/invader.png');
    game.load.audio('sound_boomb', 'assets/audios/explosion.mp3');
    game.load.audio('sound_background', 'assets/audios/background.mp3');
}


function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createSpace();
    createAlients();
    createPlayer();
    createBullets();
    createAlienBullets();
    createExplodes();

    createStateText();

    soundBoomb = game.add.audio('sound_boomb');

    soundBackground = game.add.audio('sound_background');

    soundBackground.play('', 0, 1, true);

    // game.sound.setDecodedCallback([ soundBoomb ], soundCallback, this);

    // Add control
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    space.tilePosition.y += 2;

    player.body.velocity.setTo(0,0);

    if(cursors.left.isDown) {
        player.body.velocity.x = -200;
    }
    else if(cursors.right.isDown) {
        player.body.velocity.x = 200;
    }

    if(fireButton.isDown) {
        fireBullet();
    }

    if(game.time.now > alienBulletTime) {
        alienFires();
    }

    // update overlap
    game.physics.arcade.overlap(playerBullets, alients, playerFireHandler, null, this);
    game.physics.arcade.overlap(alienBullets, player, alientFireHandler, null, this);

}


function createBullets() {
    playerBullets = game.add.group();
    playerBullets.enableBody = true;
    playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
    playerBullets.createMultiple(30, 'player_bullet');
    playerBullets.setAll('anchor.x', 0.5);
    playerBullets.setAll('anchor.y', 1);
    playerBullets.setAll('outOfBoundsKill', true);
    playerBullets.setAll('checkWorldBounds', true);
}

function createAlienBullets() {
    alienBullets = game.add.group();
    alienBullets.enableBody = true;
    alienBullets.physicsBodyType = Phaser.Physics.ARCADE;
    alienBullets.createMultiple(30, 'enemy_bullet');
    alienBullets.setAll('anchor.x', 0.5);
    alienBullets.setAll('anchor.y', 1);
    alienBullets.setAll('outOfBoundsKill', true);
    alienBullets.setAll('checkWorldBounds', true);
}

function createExplodes() {
    explodes = game.add.group();
    explodes.createMultiple(30, 'explode');
    explodes.forEach(function(explode) {
        explode.anchor.setTo(0.5, 0.5);
        explode.enableBody = true;
        explode.animations.add('boob');
    });
}

function fireBullet() {
    // Nếu time game > time viên đạn thì bắn viên đạn
    // tránh trường hợp đạn bắn quá nhanh tạo thành hiệu ứng
    // sóng đạn
    if(game.time.now > bulletTime && player.alive) {
        bullet = playerBullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x + 14, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }
}


function alienFires() {
    alienBullet = alienBullets.getFirstExists(false);

    var aliveAliens = [];

    alients.forEachAlive(function(alien) {
        aliveAliens.push(alien);
    });

    if(alienBullet && aliveAliens.length > 0) {
        var random = game.rnd.integerInRange(0,aliveAliens.length-1);
        var ramdomAlien = aliveAliens[random];

        alienBullet.reset(ramdomAlien.body.x, ramdomAlien.body.y);

        game.physics.arcade.moveToObject(alienBullet, player, 120);

        alienBulletTime = game.time.now + 200;
    }

}


function playerFireHandler(bullet, alient) {
    bullet.kill();
    alient.kill();

    var explode = explodes.getFirstExists(false);
    explode.reset(alient.body.x, alient.body.y);
    explode.animations.play('boob', 30, false, true);

    // Sound
    soundBoomb.play();

    if(alients.total <= 0) {
        // Next state
        stateText.text = "Clear, Good Job \ Click to restart";
        stateText.visible = true;

        game.input.onTap.addOnce(restart, this);
    }
}

function alientFireHandler(bullet, player) {
    bullet.kill();
    player.kill();

    alients.callAll('kill');
    alienBullets.callAll('kill');

    // Show boomb
    var explode = explodes.getFirstExists(false);
    explode.reset(player.body.x, player.body.y);
    explode.animations.play('boob', 30, false, true);

    // Show text died shit
    stateText.text = 'You died!!!, Muahaaaaaaaaaaaaaaaa!!!\n Click to restart';
    stateText.visible = true;

    // Event restart when you click to the screen
    game.input.onTap.addOnce(restart, this);

    // Sound
    soundBoomb.play();
}


function createSpace() {
    space = game.add.tileSprite(0,0,800,600, 'space');
}

function createAlients() {
    alients = game.add.group();
    alients.enableBody = true;
    alients.physicsBodyType = Phaser.Physics.ARCADE;

    for(var i = 0; i < 4; i ++) {
        for(var j = 0; j < 10; j ++) {
            var alient = alients.create(j*48, i*50, 'alients');
            alient.animations.add('fly', [0,1,2,3], 20, true);
            alient.play('fly');
            alient.body.move = false;
        }
    }

    alients.x = 100;
    alients.y = 50;

    var tween = game.add.tween(alients).to({x: 200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    tween.onLoop.add(desend, this);
}

function desend() {
    alients.y += 5;
}

function setUpExplode(explode) {
    explode.enableBody = true;
    explode.anchor.x = 0.5;
    explode.anchor.y = 0.5;
    explode.animations.add('boob');
}

function createPlayer() {
    player = game.add.sprite(400, 500, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
}

function createStateText() {
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' GAME BAN RUOI ', { font: '30px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
}

function render() {
    // game.debug.spriteInfo(player, 64, 64);
}

function restart() {
    // Ailen is back
    alients.callAll('revive');
    // Player is back
    player.revive();

    stateText.text = '';

    soundBackground.restart();
}