var Level1 = function(game) {
    this.game = game;
}

Level1.prototype = {

    create: function() {
        var button = this.game.add.button(100,200, 'button', this.openPopup, this);
        button.inputEnabled = true;


        var popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
        popup.anchor.setTo(0.5);
        popup.visible = false;

        var btnGroups = this.game.add.group();

        var y = 0;
        for(var row = 0; row <= 5; row++) {
            y = row*50;
            for(var col = 0; col <= 5; col++) {
                var x = col*50;
                var btn = this.game.add.button(x,y, 'button', this.alert, this);
                btnGroups.add(btn);
            }
        }

        btnGroups.x = -Math.floor(btnGroups.width /2);
        btnGroups.y = -Math.floor(btnGroups.height / 2);


        var pw = popup.width / 2 - 30;
        var ph = popup.height /2 - 10;

        var close = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'close', this.closePopup, this);
        close.reset(pw, -ph);

        popup.addChild(close);
        popup.addChild(btnGroups);


        this.popup = popup;
        this.close = close;
    },

    update: function() {

    },

    openPopup : function() {
        this.popup.visible = true;
    },

    closePopup : function() {
        this.popup.visible = false;
    },

    alert : function() {
        alert('gg');
    }
};