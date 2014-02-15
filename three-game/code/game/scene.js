
function Scene($gameView) 
{
   this.WIDTH = $gameView.width();
   this.HEIGHT = $gameView.height();

   this.VIEW_ANGLE = 45;
   // These don't need to be accessed again - for now
   var ASPECT = this.WIDTH / this.HEIGHT,
      NEAR = 0.1,
      FAR = 300; // An arbitrary number

   // Using a WebGL renderer rather than canvas rendering, some browsers won't support this
   this.renderer = new THREE.WebGLRenderer();
   this.scene = new THREE.Scene();
   this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, ASPECT, NEAR, FAR);

   this.scene.add(this.camera);
   this.renderer.setSize(this.WIDTH, this.HEIGHT);

   //renderer.shadowMapEnabled = true;
   //renderer.shadowMapSoft = true; // A little more graphically intensive
}

Scene.prototype.addToScene = function(item)
{
   this.scene.add(item);
};

Scene.prototype.removeFromScene = function(item)
{
   // TODO - Not tested
   this.scene.remove(item);
};

Scene.prototype.moveCamera = function(change)
{
   // Change variable MUST be a ThreeJS Vector3 or a float
   // If it's a float, assume that the camera should be moved along the z axis
   if(typeof change == "number")
      this.camera.position.z += change;
   else
      this.camera.position.add(change);
};

Scene.prototype.lerpCamera = function(change)
{
   // Change variable MUST be a ThreeJS Vector3
   var target = new THREE.Vector3(
      this.camera.position.x, this.camera.position.y, this.camera.position.z);
   target.addVectors(target, change);
   this.camera.position.lerp(target, 0.75);
   // TODO - This doesn't actually work as intended
};

Scene.prototype.changeTarget = function(target)
{
   // Target variable MUST be a ThreeJS Vector3
   this.camera.lookAt(target);
}

Scene.prototype.renderScene = function()
{
   this.renderer.render(this.scene, this.camera);
};