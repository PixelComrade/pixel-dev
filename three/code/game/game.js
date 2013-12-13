// This class handles all the major game calls and events

 /*
 * Useful color codes
 * 0xFFFFFF - White
 * 0x0000FF - Blue
 * 0xFF0000 - Red
 * 0x00FF00 - Green
 */

 // Define some constants
 var MODEL = 0;
 var SPHERE = 1;
 var CUBE = 2;
 var TORUS = 3; 

function Game($gameView)
{
   this.$gameView = $gameView;
   this.scene = new Scene($gameView);

   this.$gameView.append(this.scene.renderer.domElement);

   // Set up last known mouse positions
   this.lastX = this.$gameView.width() / 2;
   this.lastY = this.$gameView.height() / 2;

   // The game space will be a ? x ? x ? area until further notice

   // Create game objects

   // The light first
   // A spotlight because we want shadows later on
   this.spotlight = new THREE.SpotLight(0x86D8E3); // A teal light
   this.spotlight.position.set(50, 50, 50);
   // The spotlight will focus on (0, 0, 0) by default
   this.scene.addToScene(this.spotlight);

   // Now the ground
/*
   this.ground = new GameObject(
      new THREE.Vector3(0, -5 , 0), new String("0xFFFFFF"), 
      CUBE, new THREE.Vector3(800, 10, 800), false, false);
   this.scene.addToScene(this.ground.gShape);
*/
   // Need an origin point
   this.origin = new THREE.Object3D();
   this.scene.addToScene(this.origin);  

   // Now the main spheres
   this.sphere1 = new THREE.Object3D();
   this.sphere2 = new THREE.Object3D();

   var sphereMesh1 = new GameObject(
      new THREE.Vector3(30, 30, 0), new String("0xFFFFFF"), SPHERE, 10, true, false);
   //this.scene.addToScene(this.sphere1.gShape);  

   var sphereMesh2 = new GameObject(
      new THREE.Vector3(-30, 30, 0), new String("0xFFFFFF"), SPHERE, 10, true, false);
   //this.scene.addToScene(this.sphere2.gShape); 

   this.sphere1.add(sphereMesh1);
   this.sphere2.add(sphereMesh2);

   this.origin.add(this.sphere1);
   this.origin.add(this.sphere2);

   // Finally, let's position the camera in the correct spot
   this.scene.moveCamera(new THREE.Vector3(0, 30, 300)); // +z is backward
}

Game.prototype.update = function()
{
   var target = this;
   this.$gameView.mousemove(function(event)
   {
      // Grab the latest mouse coordinates on the screen
      target.lastX = event.pageX;
      target.lastY = event.pageY;
   });
   //this.scene.moveCamera(new THREE.Vector3(0, 0, 0));
};

Game.prototype.render = function()
{
   this.scene.renderScene();
};

/*
Take a look at this 

http://jsfiddle.net/hbt9c/61/

*/