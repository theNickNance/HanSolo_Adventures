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

var events = {
	judgeCreationEvent: new Event('judgeCreation'),
	checkCollisionEvent: new Event('checkCollision')
}
