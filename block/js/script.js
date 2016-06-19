//flappy bird clone
// taille sprite flappy 17x25 taille du flappy 17x12w
// taille tuyau 54x135 taille un tube 26x135



var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload : preload, create : create, update : update});
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;

function preload(){
	game.load.image('flower', 'assets/daisy.png');
	game.load.image('background', 'assets/background.jpg');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}
function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE); 	//ajout de la physique
	
	game.add.sprite(0, 0, 'background');				//ajout du fond

	platforms = game.add.group();		//création d'un groupe pour les plateformes
	platforms.enableBody = true;		//activation de la physique de corps
	
	var ground = platforms.create(0, game.world.height - 32, 'ground'); //création de la plateforme au sol
	ground.scale.setTo(2,1);	//élargissement de l'image
	ground.body.immovable = true;	//
	
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;

	game.add.sprite(game.world.width/2, game.world.height/2, 'flower');
	stars = game.add.group();
	stars.enableBody = true;

	for (var i = 0; i < 12; i++){
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 6;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	player = game.add.sprite(32, game.world.height -150, 'dude', 4);
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [0,1,2,3], 10, true);
	player.animations.add('right', [5,6,7,8], 10, true);

	cursors = game.input.keyboard.createCursorKeys();

	scoreText = game.add.text(16, 16, 'Score: 0', {fontSize : '32px', fill : '#000'});

}
function update(){
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.overlap(player, stars, collectStars, null, this);
	function collectStars(player, star){
		star.kill();
		score += 10;
		scoreText.text = 'Score: ' + score;
	}
	player.body.velocity.x = 0;
	if (cursors.left.isDown){
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if (cursors.right.isDown){
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}
	if (cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -350;
	}
}