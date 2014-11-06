function Enemy(id) {
	this.id = id;
	this.startLeft = $('.container').width();
	this.startTop = (Math.random() * (config.containerHeight - 50));
	this.speed = Math.floor((Math.random() * 10) + 1);
	this.colored = Math.floor((Math.random() * 4) + 0);
	this.enemy = $('<div class="enemy ' + config.colors[this.colored] + '" id="enemy' + id + '" data-color="' + config.colors[this.colored] + '"></div>');
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
				if (lives == 0) {
					clearInterval(gameLoop);
					$('.spawned').html(enemyId);
					$('.fired').html(bulletId);
					$('.gameOver').show();
				} else {
					lifeBlink();
					lives -= 1;
					$('.lives').html(lives);
				}
				clearInterval(interval);
				delete enemyPos[that.id];
			} else {
				that.startLeft -= 1;
				that.enemy.css('left', that.startLeft + 'px');
		  		enemyPos[that.id] = [that.startLeft, that.startTop];
			}
		}, this.speed);
	}

	this.attack();
}