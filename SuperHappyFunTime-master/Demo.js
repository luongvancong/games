/**
 * A computer controller for a Character.
 * @param gameState The current state of the game, as in a level.
 * @param character The character to be controlled.
 */
Demo = function(gameState, character){
	this.gameState = gameState;
	this.character = character;
};

Demo.prototype = {
	run: function(){
		for (var i = 0; i < 100; i++) {
			this.gameState.time.events.add(1000 + i*8500, this.walkRight, this, 850);
			this.gameState.time.events.add(1500 + i*8500, this.shoot, this, -Math.PI / 16, 610);
			this.gameState.time.events.add(2000 + i*8500, this.walkRight, this, 1060);
			this.gameState.time.events.add(3300 + i*8500, this.walkLeft, this, 200);
			this.gameState.time.events.add(3500 + i*8500, this.shoot, this, -Math.PI * 20 / 32, 900);
			this.gameState.time.events.add(3600 + i*8500, this.jump, this);
			this.gameState.time.events.add(4200 + i*8500, this.walkLeft, this, 3500);
			this.gameState.time.events.add(4500 + i*8500, this.jump, this);
			this.gameState.time.events.add(5100 + i*8500, this.jump, this);
			this.gameState.time.events.add(5700 + i*8500, this.jump, this);
			this.gameState.time.events.add(6300 + i*8500, this.jump, this);
			this.gameState.time.events.add(8500 + i*8500, this.resetBobby, this);
		}
	},

	/**
	 * @param angle The angle in radians towards which to fire a hookshot.
	 * @param releaseTime For how long should the hook be held?
	 */
	shoot: function(angle, releaseTime){
		this.character.hookShot.shoot(
			this.character.torso.position.x + 20 * Math.sin(angle),
			this.character.torso.position.y + 20 * Math.cos(angle),
			angle
		);
		console.debug(angle);
		if (angle > -Math.PI / 2) {
			this.character.torso.animations.frame = 1;
			this.character.torso.rotation = angle;
		} else {
			this.character.torso.animations.frame = 0;
			this.character.torso.rotation = -angle;
		}

		this.gameState.time.events.add(releaseTime, this.character.hookShot.cancelHook, this.character.hookShot);
	},

	/**
	 * Make the character walk right.
	 * @param duration For how long he should walk.
	 */
	walkRight: function(duration){
		this.character.legs.animations.play('right', null, true);
		this.character.torso.body.acceleration.setTo(this.character.ACCELERATION * 20, 0);
		this.gameState.time.events.add(duration, this.stopWalking, this);
	},

	/**
	 * Make the character walk left.
	 * @param duration For how long he should walk.
	 */
	walkLeft: function(duration){
		this.character.legs.animations.play('left', null, true);
		this.character.torso.body.acceleration.setTo(-this.character.ACCELERATION * 20, 0);
		//this.character.torso.angle
		this.gameState.time.events.add(duration, this.stopWalking, this);
	},

	/**
	 * Stop the character from walking.
	 */
	stopWalking: function(){
		this.character.torso.body.acceleration.setTo(0, 0);
		this.character.legs.animations.stop();
	},

	/**
	 * Make the character jump
	 */
	jump: function(){
		if(this.character.torso.body.blocked.down){
			this.character.torso.body.velocity.setTo(
				this.character.torso.body.velocity.x,
				this.character.JUMP_ACCELERATION
			);
		}
	},

	resetBobby: function() {
		this.character.torso.body.velocity.x = 0;
		this.character.torso.body.velocity.y = 0;
		this.character.torso.x = 100;
		this.character.torso.y = 200;
	}
};
