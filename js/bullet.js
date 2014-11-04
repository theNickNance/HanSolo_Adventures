function Bullet(color) {
	this.bullet = $('<div class="bullet ' + color + '"></div>');
	this.shoot = function() {
		var that = this;
		var startLeft = $('.character').offset().left + 50;
		var startTop = $('.character').offset().top + 25 - 3;
		var end = $('.container').width();
		this.bullet.css('left', startLeft + 'px');
		this.bullet.css('top', startTop + 'px');
		this.bullet.appendTo('.container');
		var interval = window.setInterval(function(){
			if (that.bullet.hasClass('remove')) {
				that.bullet.remove();
				clearInterval(interval);
			} else if (startLeft > end) {
				that.bullet.remove();
				clearInterval(interval);
			} else {
				that.bullet.css('left', startLeft + 10 + 'px');
		  		startLeft += 10;
			}
		}, 10);
	}

	this.shoot();
}