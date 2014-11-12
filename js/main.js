var config = {
	moveDistance: 2,
	rotateDistance: 1,
	containerHeight: 500,
	characterHeight: 75,
	characterWidth: 65,
	enemyHeight: 75,
	enemyWidth: 45,
	bulletHeight: 4,
	bulletWidth: 20,
	enemies: ['vader', 'storm-trooper', 'fet']
};

var keys = {};

var bulletPos = {};
var enemyPos = {};

var enemyId = 0;
var bulletId = 0;

var posLeft = 300;
var posTop = 200;
var $character = $('.character');

var score = 0;
var lives = 3;

var isRotated = false;

var stopped = false;

document.addEventListener('keydown', function (e) {
	keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
	if (e.which == 37) {
		if (isRotated) {
			new LeftBullet(bulletId);
		} else {
			new RightBullet(bulletId);
		}
		bulletId++;
	} else if (e.which == 38) {
		rotateCharacter();
	} else {
		delete keys[e.which];
	}
});

var gameLoop = window.setInterval(function(){
	if (!stopped) {
		moveChar();
	}
  	var rand = Math.floor((Math.random() * 1000) + 1);
  	if (rand <= 10) {
  		if (rand <= 5) {
  			new EnemyLeft(enemyId);
  		} else {
  			new EnemyRight(enemyId);
  		}
  		enemyId++;
  	}

  	checkCollision();
}, 0);

function rotateCharacter() {
	if (isRotated) {
		$('.character').removeClass('rotate');
		isRotated = false;
	} else {
		$('.character').addClass('rotate');
		isRotated = true;
	}
}

function moveChar() {
	if (keys['68']) {
		if (posLeft != ($('.container').width() - config.characterWidth)) {
			moveRight();
		}
	}

	if (keys['65']) {
		if (posLeft != 0) {
			moveLeft();
		}
	}

	if (keys['83']) {
		if (posTop != (config.containerHeight - config.characterHeight)) {
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
	var pos = posLeft + config.moveDistance;
	if (pos > ($('.container').width() - config.characterWidth)) {
		pos = $('.container').width() - config.characterWidth;
	}
	$character.css('left', pos + 'px');
	posLeft = pos;
}

function moveLeft() {
	var pos = posLeft - config.moveDistance;
	if (pos < 0) {
		pos = 0;
	}
	$character.css('left', pos + 'px');
	posLeft = pos;
}

function moveDown() {
	var pos = posTop + config.moveDistance;
	if (pos > (config.containerHeight - config.characterHeight)) {
		pos = config.containerHeight - config.characterHeight;
	}
	$character.css('top', pos + 'px');
	posTop = pos;
}

function moveUp() {
	var pos = posTop - config.moveDistance;
	if (pos < 0) {
		pos = 0;
	}
	$character.css('top', pos + 'px');
	posTop = pos;
}

function checkCollision() {
	for (var enemy in enemyPos) {
		for (var bullet in bulletPos) {
			if (collision(bulletPos[bullet], enemyPos[enemy])) {
				var $bullet = $('#bullet' + bullet);
				var $enemy = $('#enemy' + enemy);
				$enemy.addClass('remove');
				$bullet.addClass('remove');
				score++;
				$('.score').html(score);
				return;
			}
		}

		if (collisionCharacter([posLeft, posTop], enemyPos[enemy])) {
			var $enemy = $('#enemy' + enemy);

			$enemy.addClass('remove');

			lifeBlink();
		}
	}
}

function collision(bullet, enemy) {

	var x1 = bullet[0];
	var y1 = bullet[1];
	var b1 = y1 + config.bulletHeight;
	var r1 = x1 + config.bulletWidth;

	var x2 = enemy[0];
	var y2 = enemy[1];
	var b2 = y2 + config.enemyHeight;
	var r2 = x2 + config.enemyWidth;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

function collisionCharacter(character, enemy) {

	var x1 = character[0];
	var y1 = character[1];
	var b1 = y1 + config.characterHeight;
	var r1 = x1 + config.characterWidth;

	var x2 = enemy[0];
	var y2 = enemy[1];
	var b2 = y2 + config.enemyHeight;
	var r2 = x2 + config.enemyWidth;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}

function lifeBlink() {

	if (lives == 0) {
		clearInterval(gameLoop);
		$('.spawned').html(enemyId);
		$('.fired').html(bulletId);
		$('.gameOver').show();
	} else {
		var times = 15;
		stopped = true;
		lives -= 1;
		$('.lives').html(lives);
		$('body').addClass('red');

		window.setTimeout(function(){
			stopped = false;
		}, 1000);

		window.setTimeout(function(){
			$('body').removeClass('red');
		}, 1000);

		var charBlink = window.setInterval(function(){
			if (times) {
				times--;
				if ($character.hasClass('dim')) {
					$character.removeClass('dim');
				} else {
					$character.addClass('dim');
				}
			} else {
				$character.removeClass('dim');
				clearInterval(charBlink);
			}
		}, 100);
	}
}
