var config = {
	moveDistance: 2,
	rotateDistance: 1,
	containerHeight: 500,
	characterHeight: 75,
	characterWidth: 26,
	enemyHeight: 75,
	enemyWidth: 36,
	bulletHeight: 4,
	bulletWidth: 40,
	enemies: ['ghost-purple', 'ghost-orange', 'ghost-blue']
};

var events = {
	judgeCreationEvent: new Event('judgeCreation'),
	checkCollisionEvent: new Event('checkCollision')
}
