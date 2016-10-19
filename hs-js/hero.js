function Hero() {
	this.el = $('<div class="character"><div class="han-solo"></div></div>');
	this.posLeft = 0;
	this.posTop = 0;
	this.isRotated = false;
	this.init = function() {
		this.posLeft = ($('.han-solo-container').width() / 2) - (config.characterWidth / 2);
		this.posTop = (config.containerHeight / 2) - (config.characterHeight / 2);
		$('.han-solo-container').append(this.el);
		this.el.css('left', this.posLeft);
		this.el.css('top', this.posTop);
	}
	this.rotateCharacter = function() {
		if (this.isRotated) {
			this.el.removeClass('rotate');
			this.isRotated = false;
		} else {
			this.el.addClass('rotate');
			this.isRotated = true;
		}
	};
	this.moveChar = function() {
		if (keys['68']) {
			if (this.posLeft != ($('.han-solo-container').width() - config.characterWidth)) {
				this.moveRight();
			}
		}

		if (keys['65']) {
			if (this.posLeft != 0) {
				this.moveLeft();
			}
		}

		if (keys['83']) {
			if (this.posTop != (config.containerHeight - config.characterHeight)) {
				this.moveDown();
			}
		}

		if (keys['87']) {
			if (this.posTop != 0) {
				this.moveUp();
			}
		}
	};
	this.moveRight = function() {
		var pos = this.posLeft + config.moveDistance;
		if (pos > ($('.han-solo-container').width() - config.characterWidth)) {
			pos = $('.han-solo-container').width() - config.characterWidth;
		}
		this.el.css('left', pos + 'px');
		this.posLeft = pos;
	};
	this.moveLeft = function() {
		var pos = this.posLeft - config.moveDistance;
		if (pos < 0) {
			pos = 0;
		}
		this.el.css('left', pos + 'px');
		this.posLeft = pos;
	};
	this.moveDown = function() {
		var pos = this.posTop + config.moveDistance;
		if (pos > (config.containerHeight - config.characterHeight)) {
			pos = config.containerHeight - config.characterHeight;
		}
		this.el.css('top', pos + 'px');
		this.posTop = pos;
	};
	this.moveUp = function() {
		var pos = this.posTop - config.moveDistance;
		if (pos < 0) {
			pos = 0;
		}
		this.el.css('top', pos + 'px');
		this.posTop = pos;
	};

	this.init();
}