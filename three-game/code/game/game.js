// This class handles all the major game calls and events

/*
* Useful color codes
* 0xFFFFFF - White
* 0x0000FF - Blue
* 0xFF0000 - Red
* 0x00FF00 - Green
*/

// This class handles all the major game calls and events

// Define some constants
var MODEL = 0;
var SPHERE = 1;
var CUBE = 2;
var TORUS = 3; 

function Game(gameView)
{
   this.gameView = gameView;
   this.scene = new Scene(gameView);

   this.gameView.append(this.scene.renderer.domElement);

   // Set up last known mouse positions
   this.lastX = this.gameView.width() / 2;
   this.lastY = this.gameView.height() / 2;

   // The game space will be a ? x ? x ? area until further notice

   // Create game objects

   // The light first
   // A spotlight because we want shadows later on
   this.spotlight = new THREE.SpotLight(0xff0000);
   this.spotlight.position.set(50, 50, 0);
   // The spotlight will focus on (0, 0, 0) by default
   this.scene.addToScene(this.spotlight);

   // Now the ground
   this.ground = new GameObject(
      new THREE.Vector3(0, -5 , 0), new String("0xCC0000"), 
      CUBE, new THREE.Vector3(200, 10, 200), false, false);
   this.scene.addToScene(this.ground.gShape);

   // Now the blubber thing
   this.blubber = new GameObject(
      new THREE.Vector3(0, 50, 0), new String("0xCC0000"), SPHERE, 10, true, false);
   this.scene.addToScene(this.blubber.gShape);  

   // Finally, let's position the camera in the correct spot
   this.scene.moveCamera(new THREE.Vector3(0, 10, 100)); // +z is backward
}

Game.prototype.update = function()
{
   var target = this;
   this.gameView.mousemove(function(event)
   {
      target.lastX = event.pageX;
      target.lastY = event.pageY;
   });
   //this.scene.adjustCamera(new THREE.Vector3(0, 0, 0));
};

Game.prototype.render = function()
{
   this.scene.renderScene();
};

/*
Take a look at this (For camera control)

http://jsfiddle.net/hbt9c/61/

*/