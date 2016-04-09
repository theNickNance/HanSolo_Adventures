function Enemy(index, isAlly) {
	this.index = index;
	this.topPos = (Math.random() * (config.containerHeight - config.characterHeight));
	this.speed = Math.floor((Math.random() * 10) + 1);
	this.enemyType = Math.floor((Math.random() * 3) + 0);
	this.interval;
	this.isAlly = isAlly;
	this.removeMe = function() {
		this.enemy.remove();
		clearInterval(this.interval);
		enemiesArray[this.index] = null;
	};
	this.cssClass = (isAlly) ? 'ally' : config.enemies[this.enemyType];
}

function EnemyLeft(index, isAlly) {
	Enemy.call(this, index, isAlly);

	this.leftPos = $('.container').width();
	this.enemy = $('<div class="enemy"><div class="' + this.cssClass + '"></div></div>');
	this.attack = function() {
		var that = this;

		this.enemy.css('left', this.leftPos + 'px');
		this.enemy.css('top', this.topPos + 'px');
		this.enemy.appendTo('.container');


		that.interval = window.setInterval(function(){
			if (that.leftPos < 0) {
				that.enemy.remove();
				clearInterval(that.interval);
				enemiesArray[that.index] = null;
			} else if (!gameStopped) {
				that.leftPos -= 1;
				that.enemy.css('left', that.leftPos + 'px');
			}
		}, this.speed);
	}

	this.attack();
}

function EnemyRight(index, isAlly) {
	Enemy.call(this, index, isAlly);

	this.leftPos = (0 - config.characterWidth);
	this.enemy = $('<div class="enemy right"><div class="' + this.cssClass + '"></div></div>');
	this.attack = function() {
		var that = this;
		var end = $('.container').width();

		this.enemy.css('left', this.leftPos + 'px');
		this.enemy.css('top', this.topPos + 'px');
		this.enemy.appendTo('.container');

		that.interval = window.setInterval(function(){
			if (that.leftPos > end) {
				that.enemy.remove();
				enemiesArray[that.index] = null;
			} else if (!gameStopped) {
				that.leftPos += 1;
				that.enemy.css('left', that.leftPos + 'px');
			}
		}, this.speed);
	}

	this.attack();
}
