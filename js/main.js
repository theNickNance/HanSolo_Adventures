//GLOBAL GAME VARIABLES
var keys = {};

var enemiesArray = [];
var bulletsArray = [];

var scoreBoard = {
	score: 0,
	lives: 3
};

var gameStopped = false;
var heroUnvulnerable = false;

var hero = new Hero();

//KEY EVENTS
document.addEventListener('keydown', function (e) {
	keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
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
});

//MAIN GAME LOOP
var gameLoop = window.setInterval(function(){
	if (!gameStopped) {
		hero.moveChar();
	}
  	var rand = Math.floor((Math.random() * 1000) + 1);
  	if (rand <= 10) {
  		if (rand <= 5) {
  			enemiesArray.push(new EnemyLeft(enemiesArray.length));
  		} else {
  			enemiesArray.push(new EnemyRight(enemiesArray.length));
  		}
  	}

  	checkCollision();
}, 0);

//COLLISION DETECTION
function checkCollision() {
	for (var i = 0; i < enemiesArray.length; i++) {
		if (enemiesArray[i] != null) {
			for (var j = 0; j < bulletsArray.length; j++) {
				if (bulletsArray[j] != null) {
					if (collision([bulletsArray[j].leftPos, bulletsArray[j].topPos], [enemiesArray[i].leftPos, enemiesArray[i].topPos])) {
						bulletsArray[j].removeMe();
						enemiesArray[i].removeMe();
						scoreBoard.score++;
						$('.score').html(scoreBoard.score);
						return;
					}
				}
			}

			if (!heroUnvulnerable) {
				if (collisionCharacter([hero.posLeft, hero.posTop], [enemiesArray[i].leftPos, enemiesArray[i].topPos])) {
					enemiesArray[i].removeMe();
					lifeBlink();
				}
			}
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

	if (scoreBoard.lives == 0) {
		clearInterval(gameLoop);
		$('.spawned').html(enemiesArray.length);
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
		}, 1000);

		window.setTimeout(function(){
			$('body').removeClass('red');
		}, 1000);

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
				heroUnvulnerable = false;
				clearInterval(charBlink);
			}
		}, 100);
	}
}
