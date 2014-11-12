function Bullet(id) {
	this.bullet = $('<div class="bullet" id="bullet' + id + '"></div>');
	this.id = id;

	this.shoot();
}

function RightBullet(id) {
	this.shoot = function() {
		var that = this;
		var startLeft = $('.character').offset().left + config.characterWidth;
		var startTop = $('.character').offset().top + (config.characterHeight / 2) - (config.bulletHeight / 2);
		var end = $('.container').width();

		this.bullet.css('left', startLeft + 'px');
		this.bullet.css('top', startTop + 'px');
		this.bullet.appendTo('.container');

		bulletPos[this.id] = [startLeft, startTop];

		var interval = window.setInterval(function(){
			if (that.bullet.hasClass('remove')) {
				that.bullet.remove();
				clearInterval(interval);
				delete bulletPos[that.id];
			} else if (startLeft > end) {
				that.bullet.remove();
				clearInterval(interval);
				delete bulletPos[that.id];
			} else if (!stopped) {
				startLeft += 20;
				that.bullet.css('left', startLeft + 'px');
		  		bulletPos[that.id] = [startLeft, startTop];
			}
		}, 10);
	}

	Bullet.call(this, id);
}

function LeftBullet(id) {
	this.shoot = function() {
		var that = this;
		var startLeft = $('.character').offset().left - config.bulletWidth;
		var startTop = $('.character').offset().top + (config.characterHeight / 2) - (config.bulletHeight / 2);
		var end = 0;

		this.bullet.css('left', startLeft + 'px');
		this.bullet.css('top', startTop + 'px');
		this.bullet.appendTo('.container');

		bulletPos[this.id] = [startLeft, startTop];

		var interval = window.setInterval(function(){
			if (that.bullet.hasClass('remove')) {
				that.bullet.remove();
				clearInterval(interval);
				delete bulletPos[that.id];
			} else if (startLeft < end) {
				that.bullet.remove();
				clearInterval(interval);
				delete bulletPos[that.id];
			} else if (!stopped) {
				startLeft -= 20;
				that.bullet.css('left', startLeft + 'px');
		  		bulletPos[that.id] = [startLeft, startTop];
			}
		}, 10);
	}

	Bullet.call(this, id);
}