function Enemy() {
	this.startLeft = $('.container').width();
	this.startTop = Math.floor((Math.random() * ($('.container').height() - 50)) + 1);
	this.speed = Math.floor((Math.random() * 10) + 1);
	this.colored = Math.floor((Math.random() * 4) + 1);
	this.enemy = $('<div class="enemy ' + 'color' +  this.colored + '"></div>');
	this.attack = function() {
		var that = this;
		this.enemy.css('left', this.startLeft + 'px');
		this.enemy.css('top', this.startTop + 'px');
		this.enemy.appendTo('.container');
		var interval = window.setInterval(function(){
			if (that.enemy.hasClass('remove')) {
				that.enemy.remove();
				clearInterval(interval);
			} else if (that.startLeft < 0) {
				that.enemy.remove();
				if (lives == 0) {
					clearInterval(gameLoop);
					$('.gameOver').show();
				} else {
					lifeBlink();
					lives -= 1;
					$('.lives').html(lives);
				}
				clearInterval(interval);
			} else {
				that.enemy.css('left', that.startLeft - 1 + 'px');
		  		that.startLeft -= 1;
			}
		}, this.speed);
	}

	this.attack();
}