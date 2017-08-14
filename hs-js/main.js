// GLOBAL GAME VARIABLES
var keys = {};

var enemiesArray = [];
var bulletsArray = [];

var scoreBoard = {
	score: 0,
	lives: 3,
	level: 1,
	friendlyFire: 0
};

var creationNumber;
var enemyFrequency = 2;
var enemyDirection = 1;
var allyFrequency = 3;
var allyDirection = 1;

var gameStopped = true;
var heroUnvulnerable = false;

var hero = new Hero();

// EVENTS
document.addEventListener('keydown', function (e) {
	keys[e.which] = true;

	if (!gameStopped) {
		if (e.which == 37) {
			if (hero.isRotated) {
				bulletsArray.push(new LeftBullet(bulletsArray.length));
			} else {
				bulletsArray.push(new RightBullet(bulletsArray.length));
			}
		} else if (e.which == 38) {
			e.preventDefault();
			hero.rotateCharacter();
		}
	}
});

document.addEventListener('keyup', function (e) {
	delete keys[e.which];
});

document.addEventListener('judgeCreation', function(e) {
	if (!gameStopped) {
		var allyRoll = Math.floor((Math.random() * 15000) + 1); //generate number between 1 and 15000
		var enemyRoll = Math.floor((Math.random() * 1000) + 1); //generate number between 1 and 1500

		if (allyRoll <= allyFrequency) {
			if (allyRoll <= allyDirection) {
				enemiesArray.push(new EnemyLeft(enemiesArray.length, true));
			} else {
				enemiesArray.push(new EnemyRight(enemiesArray.length, true));
			}
		}

		if (enemyRoll <= enemyFrequency) {
			if (enemyRoll <= enemyDirection) {
				enemiesArray.push(new EnemyLeft(enemiesArray.length, false));
			} else {
				enemiesArray.push(new EnemyRight(enemiesArray.length, false));
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
							scoreBoard.friendlyFire++;
							lifeBlink(true);
						} else {
							bulletsArray[j].removeMe();
							enemiesArray[i].removeMe();
							scoreBoard.score++;
							$('.score').html(scoreBoard.score);
							updateLevel();
						}
						return;
					}
				}
			}

			if (!heroUnvulnerable) {
				if (collisionCharacter([hero.posLeft, hero.posTop], [enemiesArray[i].leftPos, enemiesArray[i].topPos])) {
					if (!enemiesArray[i].isAlly) {
						lifeBlink(false, enemiesArray[i]);
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
		document.dispatchEvent(events.judgeCreationEvent);
		document.dispatchEvent(events.checkCollisionEvent);
	}
}, 0);

document.getElementsByClassName('start-button')[0].addEventListener('click', function() {
	document.getElementsByClassName('start-menu')[0].style.display = 'none';
	gameStopped = false;
});

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

function lifeBlink(isFriendlyFire, toRemove) {

	scoreBoard.lives -= 1;

	if (scoreBoard.lives === 0) {
		$('.lives').html(scoreBoard.lives);
		endGame();
	} else {
		var times = 20;
		gameStopped = true;
		heroUnvulnerable = true;
		$('.lives').html(scoreBoard.lives);
		$('body').addClass('red');
		if (isFriendlyFire) {
			$('.ff-warning').show();
		}

		window.setTimeout(function(){
			gameStopped = false;
			$('body').removeClass('red');
			if (isFriendlyFire) {
				$('.ff-warning').hide();
			} else if (toRemove) {
				toRemove.removeMe();
			}
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
		case 5:
			enemyFrequency = 4;
			enemyDirection = 2;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 10:
			enemyFrequency = 6;
			enemyDirection = 3;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 20:
			enemyFrequency = 8;
			enemyDirection = 4;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 40:
			enemyFrequency = 10;
			enemyDirection = 5;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 60:
			enemyFrequency = 12;
			enemyDirection = 6;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 80:
			enemyFrequency = 14;
			enemyDirection = 7;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
		case 100:
			enemyFrequency = 16;
			enemyDirection = 8;
			scoreBoard.level++;
			$('.level').html(scoreBoard.level);
			break;
	}
	// $('.han-solo-container').outerHeight(config.containerHeight);
}

function endGame() {
	clearInterval(gameLoop);
	$('body').addClass('red');
	$('.fired').html(bulletsArray.length);
	$('.friendlyFire').html(scoreBoard.friendlyFire);
	$('.gameOver').show();
}
