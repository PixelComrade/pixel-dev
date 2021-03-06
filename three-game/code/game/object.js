
/* This is the base class for an object in the level
 * To be used for (preferably) every game object in the game
 */

function GameObject(startingPos, mColor, type, size, isDynamic, getShadows, giveShadows)
{
   // TODO - Only symmetrical objects are capable of being created for now
   // StartingPos needs to be a threejs vector3
   // MColor is a hex color code
   // Type indicates what type of object this is:
      // 0 - Imported model
      // 1 - Sphere
      // 2 - Cube
      // 3 - Torus
   // Size is a threejs vector3 to indicate the mesh size
   // In the case of a spherical object, a float can be passed
   // getShadows is a bool to indicate whether this object receives shadows from other objects
   // giveShadows is a bool to indicate whether this object produces shadows on receivable objects

   // TODO - This doesn't affect the current rendering of the object
   this.material = new THREE.MeshLambertMaterial(
   {
      color: mColor
   });

   if(typeof size == "number") 
      this.radius = size;
   else
      this.size = size;
   this.segments = 16;
   this.rings = 16;

   this.gShape = null;
   switch(type)
   {
      case 0:
         break;
      case 1:
         this.gShape = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius, this.segments, this.rings),
            this.material);
         break;
      case 2:
         this.gShape = new THREE.Mesh(
            new THREE.CubeGeometry(this.size.x, this.size.y, this.size.z, 16, 16, 16),
            this.material);
         break;
      case 3:
         this.gShape = new THREE.Mesh(
            new THREE.TorusGeometry(
               this.radius * 4, this.radius, this.segments, this.rings, Math.PI * 2),
            this.material);
         break;
      default:
         break;
   }

   this.gShape.position = startingPos;

   this.gShape.receiveShadow = getShadows;
   this.gShape.castShadow = giveShadows;

   if(isDynamic == true)
   {
      this.gShape.geometry.dynamic = true;
      this.gShape.geometry.verticesNeedUpdate = true;
      this.gShape.geometry.normalsNeedUpdate = true;
   }
}

Object.prototype.move = function(change)
{
   // Change variable MUST be a ThreeJS Vector3 or a float
   // If it's a float, assume that the object should be moved along the z axis
   if(typeof change == "number")
      this.gShape.position.z += change;
   else
      this.gShape.position.add(change);
};

Object.prototype.rotateAround = function(axis)
{
   // Axis needs to be a ThreeJS Vector3
   var angle = Math.PI / 2;
   var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);
   this.gShape.matrix.applyMatrix4( matrix );
};
