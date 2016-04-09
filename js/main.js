// GLOBAL GAME VARIABLES
var keys = {};

var enemiesArray = [];
var bulletsArray = [];

var scoreBoard = {
	score: 0,
	lives: 3,
	level: 1
};

var creationNumber;
var enemyFrequency = 10;
var enemyDirection = 5;
var allyFrequency = 1;
var allyDirection = 1;

var gameStopped = false;
var heroUnvulnerable = false;

var hero = new Hero();

// EVENTS
document.addEventListener('keydown', function (e) {
	keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
	if (!gameStopped) {
		if (e.which == 37) {
			if (hero.isRotated) {
				bulletsArray.push(new LeftBullet(bulletsArray.length));
			} else {
				bulletsArray.push(new RightBullet(bulletsArray.length));
			}
		} else if (e.which == 38) {
			hero.rotateCharacter();
		} else {
			delete keys[e.which];
		}
	} else {
		delete keys[e.which];
	}
});

document.addEventListener('judgeCreation', function(e) {
	if (!gameStopped) {
		var rand = Math.floor((Math.random() * 1000) + 1);
		if (rand <= enemyFrequency) {
			if (rand <= allyFrequency) {
				if (rand <= allyDirection) {
					enemiesArray.push(new EnemyLeft(enemiesArray.length, true));
				} else {
					enemiesArray.push(new EnemyRight(enemiesArray.length, true));
				}
			} else {
				if (rand <= enemyDirection) {
					enemiesArray.push(new EnemyLeft(enemiesArray.length, false));
				} else {
					enemiesArray.push(new EnemyRight(enemiesArray.length, false));
				}
			}
		}
	}
});

document.addEventListener('checkCollision', function(e){
	for (var i = 0; i < enemiesArray.length; i++) {
		if (enemiesArray[i] != null) {
			for (var j = 0; j < bulletsArray.length; j++) {
				if (bulletsArray[j] != null) {
					if (collision([bulletsArray[j].leftPos, bulletsArray[j].topPos], [enemiesArray[i].leftPos, enemiesArray[i].topPos])) {
						if (enemiesArray[i].isAlly) {
							bulletsArray[j].removeMe();
							enemiesArray[i].removeMe();
							lifeBlink();
						} else {
							bulletsArray[j].removeMe();
							enemiesArray[i].removeMe();
							scoreBoard.score++;
							$('.score').html(scoreBoard.score);
							updateLevel();
							return;
						}
					}
				}
			}

			if (!heroUnvulnerable) {
				if (collisionCharacter([hero.posLeft, hero.posTop], [enemiesArray[i].leftPos, enemiesArray[i].topPos])) {
					if (!enemiesArray[i].isAlly) {
						enemiesArray[i].removeMe();
						lifeBlink();
					}
				}
			}
		}
	}
});

// MAIN GAME LOOP
var gameLoop = window.setInterval(function(){
	if (!gameStopped) {
		hero.moveChar();
	}
	document.dispatchEvent(events.judgeCreationEvent);
	document.dispatchEvent(events.checkCollisionEvent);
}, 0);

// COLLISION DETECTION
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

	if (scoreBoard.lives == 0) {
		clearInterval(gameLoop);
		$('body').addClass('red');
		$('.fired').html(bulletsArray.length);
		$('.gameOver').show();
	} else {
		var times = 20;
		gameStopped = true;
		heroUnvulnerable = true;
		scoreBoard.lives -= 1;
		$('.lives').html(scoreBoard.lives);
		$('body').addClass('red');

		window.setTimeout(function(){
			gameStopped = false;
		}, 3000);

		window.setTimeout(function(){
			$('body').removeClass('red');
		}, 3000);

		window.setTimeout(function(){
			heroUnvulnerable = false;
		}, 3500);

		var charBlink = window.setInterval(function(){
			if (times) {
				times--;
				if (hero.el.hasClass('dim')) {
					hero.el.removeClass('dim');
				} else {
					hero.el.addClass('dim');
				}
			} else {
				hero.el.removeClass('dim');
				clearInterval(charBlink);
			}
		}, 100);
	}
}

function updateLevel() {
	switch(scoreBoard.score) {
		case 20:
			enemyFrequency = 12;
			enemyDirection = 6;
			config.containerHeight = 480;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 40:
			enemyFrequency = 13;
			enemyDirection = 6;
			config.containerHeight = 460;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 60:
			enemyFrequency = 14;
			enemyDirection = 7;
			config.containerHeight = 440;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 80:
			enemyFrequency = 15;
			enemyDirection = 7;
			config.containerHeight = 420;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 100:
			enemyFrequency = 16;
			enemyDirection = 8;
			config.containerHeight = 400;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
	}
	$('.container').height(config.containerHeight);
}
