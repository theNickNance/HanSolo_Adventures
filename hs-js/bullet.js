function Bullet(index) {
	this.index = index;
	this.bullet = $('<div class="bullet"></div>');
	this.topPos = $('.character').position().top + (config.characterHeight / 2) - (config.bulletHeight / 2);
	this.interval;
	this.removeMe = function() {
		this.bullet.remove();
		clearInterval(this.interval);
		bulletsArray[this.index] = null;
	}

	this.shoot();
}

function RightBullet(index) {
	this.leftPos = $('.character').position().left + config.characterWidth + 35;

	this.shoot = function() {
		var that = this;
		var end = $('.han-solo-container').width() - config.enemyWidth;

		this.bullet.css('left', that.leftPos + 'px');
		this.bullet.css('top', that.topPos + 'px');
		this.bullet.appendTo('.han-solo-container');

		that.interval = window.setInterval(function(){
			if (that.leftPos > end) {
				that.bullet.remove();
				clearInterval(that.interval);
				bulletsArray[that.index] = null;
			} else if (!gameStopped) {
				that.leftPos += 20;
				that.bullet.css('left', that.leftPos + 'px');
			}
		}, 10);
	}

	Bullet.call(this, index);
}

function LeftBullet(index) {
	this.leftPos = $('.character').position().left - 35 - config.bulletWidth;

	this.shoot = function() {
		var that = this;
		var end = config.enemyWidth;

		this.bullet.css('left', that.leftPos + 'px');
		this.bullet.css('top', that.topPos + 'px');
		this.bullet.appendTo('.han-solo-container');

		that.interval = window.setInterval(function(){
			if (that.leftPos < end) {
				that.bullet.remove();
				clearInterval(that.interval);
				bulletsArray[that.index] = null;
			} else if (!gameStopped) {
				that.leftPos -= 20;
				that.bullet.css('left', that.leftPos + 'px');
			}
		}, 10);
	}

	Bullet.call(this, index);
}
