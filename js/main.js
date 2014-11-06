var config = {
	moveDistance: 2,
	rotateDistance: 1
};
var keys = {};
var posLeft = 0;
var posTop = 0;
var rotation = 0;
var $character = $('.character');
var score = 0;
var lives = 3;
var colors = ['', 'red', 'blue', 'green', 'yellow'];

document.addEventListener('keydown', function (e) {
    keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
	if (e.which == 39) {
		new Bullet('red');
	} else if (e.which == 37) {
		new Bullet('blue');
	} else if (e.which == 38) {
		new Bullet('green');
	} else if (e.which == 40) {
		new Bullet('yellow');
	} else {
		delete keys[e.which];
	}
});

var gameLoop = window.setInterval(function(){
  	moveChar();
  	if ((Math.floor((Math.random() * 1000) + 1)) < 10) {
  		new Enemy();
  	}

  	checkCollision();
}, 0);

function moveChar() {
	if (keys['68']) {
		if (posLeft != ($('.container').width() - 50)) {
			moveRight();
		}
	}

	if (keys['65']) {
		if (posLeft != 0) {
			moveLeft();
		}
	}

	if (keys['83']) {
		if (posTop != ($('.container').height() - 50)) {
			moveDown();
		}
	}

	if (keys['87']) {
		if (posTop != 0) {
			moveUp();
		}
	}
}

function moveRight() {
	var pos = posTop + config.moveDistance;
	if (pos > $('.container').width() - 50) {
		pos = $('.container').width() - 50;
	}
	$character.css('left', posLeft + config.moveDistance + 'px');
	posLeft += config.moveDistance;
}

function moveLeft() {
	var pos = posLeft - config.moveDistance;
	if (pos < 0) {
		pos = 0;
	}
	$character.css('left', pos + 'px');
	posLeft -= config.moveDistance;
}

function moveDown() {
	var pos = posTop + config.moveDistance;
	if (pos > $('.container').height() - 50) {
		pos = $('.container').height() - 50;
	}
	$character.css('top', pos + 'px');
	posTop += config.moveDistance;
}

function moveUp() {
	var pos = posTop - config.moveDistance;
	if (pos < 0) {
		pos = 0;
	}
	$character.css('top', pos + 'px');
	posTop -= config.moveDistance;
}

function checkCollision() {
	var bullets = $('.bullet');
	var enemies = $('.enemy');
	bullets.each(function() {
		var $that = $(this);
		enemies.each(function() {
			if (collision($that, $(this))) {
				if (($that.hasClass('red') && $(this).hasClass('color1')) || ($that.hasClass('blue') && $(this).hasClass('color2')) || ($that.hasClass('green') && $(this).hasClass('color3')) || ($that.hasClass('yellow') && $(this).hasClass('color4'))) {
					$(this).addClass('remove');
					score++;
					$('.score').html(score);
				}
				$that.addClass('remove');
				return;
			}
		});
	});
}

function collision($div1, $div2) {
	var off1 = $div1.offset();
	var off2 = $div2.offset();

	var x1 = off1.left;
	var y1 = off1.top;
	var b1 = y1 + 6;
	var r1 = x1 + 15;

	var x2 = off2.left;
	var y2 = off2.top;
	var b2 = y2 + 50;
	var r2 = x2 + 50;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

function lifeBlink() {
	$('body').addClass('red');
	window.setTimeout(function(){
		$('body').removeClass('red');
	}, 500);
}
