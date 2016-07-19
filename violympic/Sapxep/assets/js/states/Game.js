var Game = function() {
    this.totalPoint       = 0;
    this.userPoint        = 0;
    this.live             = 0;
    this.pointPerQuestion = 0;
    this.time             = 0;
    this.clickCount       = 0;
    this.currectAnswers   = [];
    this.selectedValue    = -1;
}

Game.prototype = {

    init : function(violympic) {
        this.violympic = violympic;

        // Mạng
        this.setLive(this.violympic.getMaxError());

        // Mặc định câu câu đầu tiên luôn đúng
        this.track = [0];

        // Tổng số điểm 100
        this.setTotalPoint(100);

        // Số lượng câu hỏi
        var numQuestion = this.violympic.getCols() * this.violympic.getRows();

        for(var i = 0; i < 10; i ++) {
            this.currectAnswers.push(i);
        }

        // Điểm cho mỗi câu hỏi
        this.setPointPerQuestion(Math.round(this.getTotalPoint()/numQuestion));

        // User point
        this.setUserPoint(0);

        // Time
        this.setTime(this.violympic.getTime());
    },

    preload : function() {
        // Cache all questions to game cache
        var questionsJson = this.violympic.getQuestionAvaiables();

        for(var i in questionsJson) {
            this.game.load.image('question_' + questionsJson[i].stt, questionsJson[i].url);
        }
    },

    create : function() {
        // Timer
        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(20*60*1000, this.timeOut, this);
        this.countdownLabel = this.game.add.text(this.game.world.width - 100, 20, 'Time: ', {fill: '#fff'});
        this.timer.start();

        var cols = this.violympic.getCols();
        var rows = this.violympic.getRows();

        var btnGroup = this.game.add.group();
        var questionGroups = this.game.add.group();

        var btnWidth = 402;
        var btnHeight = 81;

        var i = 0;
        for (x = 0; x < rows; x ++) {
            i += 5;
            var j = 0;
            for (y = 0; y < cols; y ++) {
                j += 5;
                var dY = 0;
                var dX = 0;

                dX = btnWidth * y;
                dY = btnHeight * x;

                var btn = this.game.make.button(dX + j, dY + i, 'button_sprite', this.onClickButton, this, 'over', 'out', 'over');
                btnGroup.add(btn);
            }
        }

        // Xáo trộn câu hỏi
        var arrayIndexBtn = [];
        for(var i = 0; i < btnGroup.children.length; i ++) {
            arrayIndexBtn.push(i);
        }
        arrayIndexBtn = arrayShuffle(arrayIndexBtn);

        // Print question
        for(var i = 0; i < arrayIndexBtn.length; i ++) {
            var btnIndex = arrayIndexBtn[i];
            var q = this.game.make.sprite(btnGroup.children[i].x, btnGroup.children[i].y, 'question_'+btnIndex);
            q.stt = btnIndex;
            btnGroup.children[i].question = q;
            questionGroups.add(q);
        }

        // Background
        var bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
        bg.anchor.setTo(0.5, 0.5);


        // Positions
        btnGroup.x = -Math.floor(btnGroup.width/2);
        btnGroup.y = -Math.floor(btnGroup.height/2);

        // btnGroup.x = 100;
        // btnGroup.y = 100;

        questionGroups.x = -Math.floor(questionGroups.width/2);
        questionGroups.y = -Math.floor(questionGroups.height/2);

        bg.addChild(btnGroup);
        bg.addChild(questionGroups);

        this.poinText = this.game.add.text(10, 10, 'Point: ' + this.getUserPoint(), {"fill" : "#fff"});

        this.liveText = this.game.add.text(200, 10, 'Live: ' + this.getLive(), {"fill" : "#fff"});
    },

    update : function() {
        // Update timer
        if(this.timer.running) {
            this.countdownLabel.text = formatTime(Math.round((this.timerEvent.delay - this.timer.ms)/1000));
        }

        // Nếu hết mạng thì game over
        if(this.live == 0) {
            this.game.state.start('GameOver');
        }

        // Nếu trả lời đúng hết thì trang layout chào mừng
        if(this.getUserPoint() == this.totalPoint) {
            this.game.state.start('GameSuccess');
        }
    },


    /**
     * User click to answer this question
     */
    onClickButton: function(btn) {

        var sttQuestion = btn.question.stt;

        // Lưu vết và kt tiếp
        this.saveTrack(sttQuestion);

        this.clickCount += 1;

        this.selectedValue = sttQuestion;

        // Nếu trả lời sai trừ đi 1 mạng
        if(this.valid(sttQuestion) == false) {
            // Nếu chọn index = 1 ngay từ lần chọn đầu tiên thì phải chọn lại
            if(sttQuestion == 1 && this.clickCount == 1) {
                this.clickCount = 0;
            }
            this.live -= 1;
            this.updateLiveText();

            return false;
        }

        // Trả lời đúng thì xóa button & câu trả lời
        this.destroyButton(btn);

        // Cộng điểm cho user nếu trả lời đúng
        this.updateUserPoint();

        // Hiển thị điểm
        this.updatePointText();
    },


    /**
     * Save track answer
     */
    saveTrack : function(value) {

        if(value == 0) return true;

        if(this.track.indexOf(value) < 0) {
            this.track.push(value);
            return true;
        }

        return true;
    },

    /**
     * Kiểm tra câu trả lời
     * @return bool
     */
    valid : function(value) {

        if(value == 0) return true;

        if(value == 1 && this.clickCount == 1) {
            return false;
        }

        var index = this.track.indexOf(value);

        if(this.track[index] - this.track[index-1] != 1) {
            // Xóa khỏi mảng
            this.track.splice(index, 1);

            return false;
        }

        return true;
    },


    destroyButton : function(btn) {
        btn.question.destroy();
        btn.destroy();
    },

    updateUserPoint : function() {
        this.userPoint += this.getPointPerQuestion();
    },

    updatePointText : function() {
        this.poinText.text = 'Point: ' + this.getUserPoint();
    },

    updateLiveText : function() {
        this.liveText.text = 'Live: ' + this.getLive();
    },

    setUserPoint : function(point) {
        this.userPoint = point;
    },

    getUserPoint : function() {
        return this.userPoint;
    },

    setTime : function(time) {
        this.time = time;
    },

    getTime : function() {
        return this.time;
    },

    setTotalPoint : function(point) {
        this.totalPoint = point;
    },

    getTotalPoint : function() {
        return this.totalPoint;
    },

    setPointPerQuestion : function(point) {
        this.pointPerQuestion = point;
    },

    getPointPerQuestion : function() {
        return this.pointPerQuestion;
    },

    setLive : function(live) {
        this.live = live;
    },

    getLive : function() {
        return this.live;
    },

    timeOutEvent : function() {
        this.timer.stop();
        this.game.state.start('GameOver');
    },

}