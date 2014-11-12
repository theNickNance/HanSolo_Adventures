function Enemy(id) {
	this.id = id;
	this.startTop = (Math.random() * (config.containerHeight - config.characterHeight));
	this.speed = Math.floor((Math.random() * 10) + 1);

	this.attack();
}

function EnemyLeft(id) {
	this.startLeft = $('.container').width();
	this.enemy = $('<div class="enemy" id="enemy' + id + '"><div class="vader"></div></div>');
	this.attack = function() {
		var that = this;

		this.enemy.css('left', this.startLeft + 'px');
		this.enemy.css('top', this.startTop + 'px');
		this.enemy.appendTo('.container');

		enemyPos[this.id] = [this.startLeft, this.startTop];

		var interval = window.setInterval(function(){
			if (that.enemy.hasClass('remove')) {
				that.enemy.remove();
				clearInterval(interval);
				delete enemyPos[that.id];
			} else if (that.startLeft < 0) {
				that.enemy.remove();
				clearInterval(interval);
				delete enemyPos[that.id];
			} else if (!stopped) {
				that.startLeft -= 1;
				that.enemy.css('left', that.startLeft + 'px');
		  		enemyPos[that.id] = [that.startLeft, that.startTop];
			}
		}, this.speed);
	}

	Enemy.call(this, id);
}

function EnemyRight(id) {
	this.startLeft = 0 - config.characterWidth;
	this.enemy = $('<div class="enemy right" id="enemy' + id + '"><div class="vader"></div></div>');
	this.attack = function() {
		var that = this;
		var end = $('.container').width();

		this.enemy.css('left', this.startLeft + 'px');
		this.enemy.css('top', this.startTop + 'px');
		this.enemy.appendTo('.container');

		enemyPos[this.id] = [this.startLeft, this.startTop];

		var interval = window.setInterval(function(){
			if (that.enemy.hasClass('remove')) {
				that.enemy.remove();
				clearInterval(interval);
				delete enemyPos[that.id];
			} else if (that.startLeft > end) {
				that.enemy.remove();
				clearInterval(interval);
				delete enemyPos[that.id];
			} else if (!stopped) {
				that.startLeft += 1;
				that.enemy.css('left', that.startLeft + 'px');
		  		enemyPos[that.id] = [that.startLeft, that.startTop];
			}
		}, this.speed);
	}

	Enemy.call(this, id);
}