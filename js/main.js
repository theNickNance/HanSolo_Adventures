var config = {
	moveDistance: 2,
	rotateDistance: 1,
	containerHeight: 500,
	characterHeight: 50,
	characterWidth: 50,
	enemyHeight: 50,
	enemyWidth: 50,
	bulletHeight: 6,
	bulletWidth: 15,
	colors: ['red', 'blue', 'green', 'yellow']
};

var keys = {};

var bulletPos = {};
var enemyPos = {};

var enemyId = 0;
var bulletId = 0;

var posLeft = 50;
var posTop = 50;
var $character = $('.character');

var score = 0;
var lives = 3;

document.addEventListener('keydown', function (e) {
    keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
	if (e.which == 39) {
		new Bullet('red', bulletId);
		bulletId++;
	} else if (e.which == 37) {
		new Bullet('blue', bulletId);
		bulletId++;
	} else if (e.which == 38) {
		new Bullet('green', bulletId);
		bulletId++;
	} else if (e.which == 40) {
		new Bullet('yellow', bulletId);
		bulletId++;
	} else {
		delete keys[e.which];
	}
});

var gameLoop = window.setInterval(function(){
  	moveChar();
  	if (Math.floor((Math.random() * 1000) + 1) < 10) {
  		new Enemy(enemyId);
  		enemyId++;
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
		if (posTop != (config.containerHeight - 50)) {
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
	if (pos > config.containerHeight - 50) {
		pos = config.containerHeight - 50;
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
	for (var bullet in bulletPos) {
		for (var enemy in enemyPos) {
			if (collision(bulletPos[bullet], enemyPos[enemy])) {
				var $bullet = $('#bullet' + bullet);
				var $enemy = $('#enemy' + enemy);
				if ($bullet.data('color') == $enemy.data('color')) {
					$enemy.addClass('remove');

					score++;
					$('.score').html(score);
				}
				$bullet.addClass('remove');
				return;
			}
		}
	}
}

function collision(bullet, enemy) {

	var x1 = bullet[0];
	var y1 = bullet[1];
	var b1 = y1 + config.bulletWidth;
	var r1 = x1 + config.bulletHeight;

	var x2 = enemy[0];
	var y2 = enemy[1];
	var b2 = y2 + config.enemyWidth;
	var r2 = x2 + config.enemyHeight;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

function lifeBlink() {
	$('body').addClass('red');
	window.setTimeout(function(){
		$('body').removeClass('red');
	}, 500);
}
