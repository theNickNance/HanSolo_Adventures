function Bullet(color, id) {
	this.bullet = $('<div class="bullet ' + color + '" id="bullet' + id + '" data-color="' + color + '"></div>');
	this.id = id;
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
			} else {
				startLeft += 10;
				that.bullet.css('left', startLeft + 'px');
		  		bulletPos[that.id] = [startLeft, startTop];
			}
		}, 10);
	}

	this.shoot();
}