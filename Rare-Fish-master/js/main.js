window.onload = function() {

	var game = new Phaser.Game(900, 700, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

	var p;
	var trophy;
	var score = 0;
	var counter= 1;
	var temp;
	var text;

	function preload() {
		game.load.image('diamond', 'resources/green_ball.png');
		game.load.image('poison', 'resources/blue_ball.png');
	}

	function create() {

		game.stage.backgroundColor = '#00000000';
		trophy = game.add.sprite(calcXLocation(),
				calcYLocation(),'poison');


		p = game.add.emitter(game.world.centerX, game.world.centerY, 1000);


		p.gravity = 0;
		p.makeParticles('diamond');
		trophy.inputEnabled = true;
		trophy.input.pixelPerfect = true;

		trophy.input.useHandCursor = true;
		trophy.events.onInputOver.add(overSprite,this);
		trophy.events.onInputOut.add(outSprite, this);

		p.start(false, 5000, 10, 100000);

		game.time.events.loop(Phaser.Timer.SECOND*.65, move, this);
		text = game.add.text(25, 660, 'DogCoin: 0', { font: "18px Arial", fill: "#ffffff", align: "center" });		
	}
	function overSprite() {

		console.log('over');

		trophy.x = calcXLocation();
		trophy.y = calcYLocation();

	}
	function outSprite() {
		console.log('out');
		counter += 1;
		score += 10 * counter ;
		text.content = 'DogCoins: ' + score;
	}



	function move() 
	{
		trophy.x = calcXLocation();
		trophy.y = calcYLocation();
	}

	function calcXLocation(){
		temp =Math.floor((Math.random()*888)+1);
		while (10 > temp >888)
			temp = Math.floor((Math.random()*888)+1) ;
		return temp;
	}
	function calcYLocation(){
		temp =Math.floor((Math.random()*654));
		while (10 > temp >654)
			temp = Math.floor((Math.random()*654)) ;
		return temp;
	}

};
