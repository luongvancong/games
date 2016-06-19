HookShot = function(gameState) {
	this.gameState = gameState;
};

HookShot.prototype = {
	// Wether or not the hookshot is shooting out or not.
	shooting: false,
	// Wether or not the hookshot is pulling the player in or not.
	pulling: false,
	// Set when pulling back a failing hook.
	cancelling: false,
	// The hook can only be shot so often
	cooldown: false,
	// Defining the length of the cooldown
	cooldownLength: 500,
	// The speed at which the hook draws the character towards its target.
	hookSpeed: 1200,
	// The speed at which the parent is pulled towards the target on hit.
	pullSpeed: 30,
	// The maximum length of the hook.
	maxHookLength: 400,
	// The dead zone around the target of the hookshot in which no force is applied.
	deadZone: 2,
	// Adjusts the agressiveness of the pull force curve.
	calmness: 10,

	/**
	 * Function which should be called before the class is used in
	 * order to load it's assets.
	 */
	preload: function() {
		this.gameState.load.image('hook', 'assets/hook.png');
		this.gameState.load.image('tounge', 'assets/tounge.png');
	},

	create: function(parent) {
		this.parent = parent;
		this.hook = this.gameState.add.sprite(-100, -100, 'hook');
		this.gameState.physics.arcade.enable(this.hook);
		this.hook.body.tilePadding.setTo(10, 10);
		this.hook.anchor.setTo(0.1, 0.5);

		this.tounge = this.gameState.add.tileSprite(0, 0, 0, 10, 'tounge');
		this.tounge.anchor.setTo(1, 0.5);
		this.hook.addChild(this.tounge);
	},

	update: function(inputEnabled) {
		var distance = game.physics.arcade.distanceBetween(this.hook, this.parent);
		this.tounge.width = distance - 16;
		// We're either shooting the hook, pulling the character towards
		// a target, cancelling a failed shot or doing nothing.
		if(this.shooting){
			this.gameState.physics.arcade.collide(
				this.hook, this.gameState.ground, this.hit, null, this);

			if (distance > this.maxHookLength)
				this.cancelHook();
			this.tounge.width = distance + 2;
		}
		else if(this.pulling){
			var speed = this.pullSpeed * Math.log(distance / this.calmness - this.deadZone);
			if (isNaN(speed) || speed < 0)
				speed = 0;
			var angle = game.physics.arcade.angleBetween(this.hook, this.parent);

			this.parent.body.velocity.x -= speed * Math.cos(angle);
			this.parent.body.velocity.y -= speed * Math.sin(angle);
		}
		else if(this.cancelling){
			if(Phaser.Math.fuzzyEqual(distance, 0, 120)) {
				this.hook.kill();
				this.cancelling = false;

				this.startCooldown();
			}
			var angle = game.physics.arcade.angleBetween(this.hook, this.parent);
			this.hook.body.velocity.x = this.hookSpeed * Math.cos(angle);
			this.hook.body.velocity.y = this.hookSpeed * Math.sin(angle);
			this.tounge.width = distance - 38;
		}
		else
			return;

		this.hook.rotation = Math.PI + game.physics.arcade.angleBetween(this.hook, this.parent);
	},

	/**
	 * Shoot the hookshot from one position to the mouse.
	 * The hook is shot from fromX and fromY with the angle angle.
	 */
	shoot: function(fromX, fromY, angle) {
		if (!this.shooting && !this.pulling && !this.cancelling && !this.cooldown){
			this.hook.rotation = angle;
			this.hook.reset(fromX, fromY);
			this.shooting = true;

			this.hook.body.velocity.x = this.hookSpeed * Math.cos(angle);
			this.hook.body.velocity.y = this.hookSpeed * Math.sin(angle);
		}
	},

	/**
	 * Called once the hook hits something.
	 */
	hit: function() {
		this.hook.body.velocity.x =	this.hook.body.velocity.y = 0;
		// Will make the update function pull the parent toward the goal until reached.
		this.pulling = true;
		this.shooting = false;
	},

	/**
	 * Pull back the hook from any situation cancelling both shooting it out and
	 * the parent being pulled to the target of the hook.
	 */
	cancelHook: function() {
		if(!this.cancelling) {
			this.shooting = this.pulling = false;
			this.cancelling = true;
			game.physics.arcade.moveToObject(this.hook, this.parent, 1500);
		}
	},

	/**
	 * Indicate to the user that there is a cooldown going on.
	 */
	startCooldown: function(){
		this.cooldown = this.parent.rotating = true;
		game.time.events.add(this.cooldownLength, function() {
			this.cooldown = false;
			this.parent.rotating = false;
		}, this);

		// If turned to the left
		if(this.parent.animations.frame === 0){
			var firstTurn = this.parent.rotation + Math.PI;
			var secondTurn = this.parent.rotation + 2 * Math.PI;
		}
		else{
			var firstTurn = this.parent.rotation - Math.PI;
			var secondTurn = this.parent.rotation - 2 * Math.PI;
		}

		// Bobbys head is flung backwards by the force from his tounge hitting his mouth.
		this.gameState.tweens.create(this.parent).to(
			{rotation: firstTurn}, this.cooldownLength / 4, null, true).chain(
				this.gameState.tweens.create(this.parent).to(
					{rotation: secondTurn}, this.cooldownLength / 4 * 3, Phaser.Easing.Sinusoidal.Out));
	}
};
