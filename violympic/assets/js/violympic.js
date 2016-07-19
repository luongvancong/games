"use strict";

var Violympic = function() {

}


Violympic.prototype = {

    getEnv: function() {
        return this.env;
    },

    setEnv: function(env) {
        this.env = env;
    },

    getRule : function() {
        return this.getTextContent('rule');
    },

    getUnit: function() {
        return this.getTextContent('code');
    },

    getSubject: function() {
        return this.getTextContent('subject');
    },

    getTime : function() {
        return this.getTextContent('time');
    },

    getPoint : function() {
        return this.getTextContent('point');
    },

    getRows : function() {
        return this.getTextContent('numRow');
    },

    getCols : function() {
        return this.getTextContent('numCol');
    },

    getMaxError: function() {
        return this.getTextContent('maxerror');
    },

    getQuestionAvaiables : function() {
        var questions = this.xml.querySelectorAll('questions question');
        var length = questions.length;
        var array = [];
        var stt = -1;
        for(var i = 0; i < length; i++) {
            if(questions[i].getAttribute('check') == 'True') {
                stt++;
                var url = this.getQuestionImage(questions[i].textContent);
                var question = {
                    'stt' : stt,
                    'url' : url,
                    'data' : ''
                };

                array.push(question);
            }
        }

        return array;
    },

    getTextContent : function(key) {
        return this.xml.querySelector(key).textContent;
    },

    setClass : function(cls) {
        this.class = cls;
    },

    getClass : function() {
        return this.class;
    },

    setGameId : function(id) {
        this.gameId = id;
    },

    getGameId : function() {
        return this.gameId;
    },

    setLevel: function(level) {
        this.level = level;
    },

    getLevel: function() {
        return this.level;
    },

    setXml : function(xml) {
        this.xml = xml;
    },

    getXml: function() {
        return this.xml;
    },

    getApiUrlGameData : function() {
        if(ENV == 'dev') {
            return '/assets/xml/'+ this.getGameId() +'.xml'
        }

        return 'http://fileshtml5.violympic.vn/FlashGame/Games/xml/lop' + this.getClass() + '/Game' + this.getGameId() + '/level' + this.getLevel() + '/1.xml';
    },

    getQuestionImage : function(imageName) {
        // For localhost
        if(ENV == 'dev') {
            return '/assets/images/questions/' + imageName;
        }

        // For production
        return 'http://fileshtml5.violympic.vn/FlashGame/image_violympic_vn/Games/image/lop'+ this.getClass() +'/Game'+ this.getGameId() +'/level'+ this.getLevel() +'/' + imageName;
    },


    /**
     * Data to send api, save score
     * @return json
     */
    buildSendDataApi : function(score, time) {
        return {
            "score" : parseInt(score),
            "time" : time
        }
    }


}