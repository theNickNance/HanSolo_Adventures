function Bullet(index) {
	this.index = index;
	this.bullet = $('<div class="bullet"></div>');
	this.topPos = $('.character').offset().top + (config.characterHeight / 2) - (config.bulletHeight / 2);
	this.interval;
	this.removeMe = function() {
		this.bullet.remove();
		clearInterval(this.interval);
		bulletsArray[this.index] = null;
	}

	this.shoot();
}

function RightBullet(index) {
	this.leftPos = $('.character').offset().left + config.characterWidth;

	this.shoot = function() {
		var that = this;
		var end = $('.container').width();

		this.bullet.css('left', that.leftPos + 'px');
		this.bullet.css('top', that.topPos + 'px');
		this.bullet.appendTo('.container');

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
	this.leftPos = $('.character').offset().left - config.characterWidth;

	this.shoot = function() {
		var that = this;
		var end = 0;

		this.bullet.css('left', that.leftPos + 'px');
		this.bullet.css('top', that.topPos + 'px');
		this.bullet.appendTo('.container');

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