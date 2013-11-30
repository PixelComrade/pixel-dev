
// This class will take care of the interaction with the direct interaction of the DOM elements
// And the front end game loop.

$gameView = $('#gameView');
var game = new Game($gameView);

// Code for the game loop

window.requestAnimFrame = (function()
{
      return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame     ||
      window.mozRequestAnimationFrame        ||
      function(callback)
      {
         window.setTimeout(callback, 1000 / 60);
      };
})();

var counter = 0;
var limit = 30;

(function GameLoop()
{
   if(counter < limit)
   {
      requestAnimFrame(GameLoop);
      counter++;
   }
   game.update(); // TODO - update at a locked framerate
   game.render();
   console.log("Looping");
})();