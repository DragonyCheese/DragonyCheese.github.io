var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  // game.load.image('wall','assets/wall.png')
  game.load.spritesheet('trump', 'assets/Donald walking sprite.png', 130, 130, 3);
	game.load.spritesheet('prize', 'assets/Donaldspritesheet.png', 130, 130, 5);
  game.load.spritesheet('mexicat', 'assets/Cat.png', 200, 65, 8);
  game.load.image('background', 'assets/Wall.png');

}

var trump;
var mexicats;
var mask;
var deadCats = [];

function create() {

  var sky = game.add.image(0, 0, 'background');
  var wall = game.add.image(0, 0, 'background');


	mexicats = game.add.group();
	trump = game.add.sprite(-50, game.height - 65, 'trump');
  trump.anchor.x = .5;
  trump.anchor.y = .5;
  trump.animations.add('trump');
  trump.animations.play('trump', 8, true);
  trump.scale.x *= -1;
	var tween = game.add.tween(trump).to( { x: game.width/2 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
	tween.onComplete.add(jump, this);
}

function jump() {
  trump.animations.stop('trump');
	var tween = game.add.tween(trump).to( {y: trump.y-100}, 700, Phaser.Easing.Exponential.Out, true, 500, 0, false);
	tween.onComplete.add(createMexicats, this);
}

function createMexicats() {

    //	A mask is a Graphics object
  mask = game.add.graphics(0, 0);

  //	Shapes drawn to the Graphics object must be filled.
  mask.beginFill(0xffffff);
  mask.isMask = true;
  mask.drawRect(0, 0, 800, 235);

	for(var i=0; i<5; i++) {
		var mexicat = mexicats.create(trump.x, 215, 'mexicat');
    mexicat.animations.add('mexicat');
    mexicat.animations.play('mexicat', 10, true, false);
		var x = game.rnd.integerInRange(-600, 1500);
    var y = -200;
    mexicat.anchor.x = 0.5;
    mexicat.anchor.y = 0.5;

    mexicat.mask = mask;

    if (x < (game.width/2)) {
      mexicat.scale.y *= -1;
    }
    mexicat.scale.x *= -1;

		var tween = game.add.tween(mexicat).to( { y:y, x:x }, 5000, Phaser.Easing.Linear.None, true, 0, 0, false);
		mexicat.tween=tween;

		mexicat.inputEnabled = true;
		mexicat.events.onInputDown.add(shoot, this);

    mexicat.rotation = computeAngle(mexicat.x, mexicat.y, x, y);
	}
}

function shoot(mexicat) {
  mexicat.mask = null;
  mask.isMask = true;
  mexicat.inputEnabled = false;
	mexicat.tween.stop();
  mexicat.animations.stop();

  mexicat.scale.y = 1;
  mexicat.rotation = Math.PI;

  var y = game.rnd.integerInRange(450, 600 - mexicat.height);
	var tween = game.add.tween(mexicat).to( {y: y}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
	tween.onComplete.add(function() {
    deadCats.push(mexicat);
    if (deadCats.length == 1) {
      runOver(mexicat);
    }
  }, this);

}

function computeAngle(x1, y1, x2, y2) {
  var deltaX = x2 - x1;
  var deltaY = y2 - y1;
  var rad = Math.atan2(deltaY, deltaX);
  return rad;
}

function runOver(mexicat) {
  var tween = game.add.tween(trump).to( {x: mexicat.x, y: mexicat.y - mexicat.height/2}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
  tween.onComplete.add(function() {
    stomp(mexicat);
  }, this);
}

function stomp(mexicat) {
  var tween = game.add.tween(trump).to( {y: trump.y - 50}, 170, Phaser.Easing.Linear.None, true, 0, 3, true);
  tween.onComplete.add(function() {
    showPrize(mexicat);
  })
}

function showPrize(mexicat) {
  var prize = game.add.sprite(trump.x, trump.y, 'prize');
  prize.anchor.x = .5;
  prize.anchor.y = .5;
  prize.scale = trump.scale;
  trump.visible = false;
  prize.animations.add('prize');
  prize.animations.play('prize', 5, false, true);
  prize.events.onAnimationComplete.add(function(){
    trump.visible = true;
    var index = deadCats.indexOf(mexicat);
    deadCats.splice(index, 1);
    if (deadCats.length > 0) {
      runOver(deadCats[0]);
    }
  }, this);
}

function update() {
}
