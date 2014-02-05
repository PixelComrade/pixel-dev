$(function()
{

   var width = $('.sidemenu').innerWidth();
   var visible = false;

   $('.sidemenu').attr('style', 'margin-left:'+(-width)+'px');

   $(window).resize(function()
   {
      console.log('resizing');
      width = $('.sidemenu').innerWidth();
      if(!visible)
         $('.sidemenu').attr('style', 'margin-left:'+(-width)+'px');
   });

   $('.sidemenu .btn').click(function()
   {
      if(visible)
         hideMenu();
      else
         showMenu();

      visible = !visible;
   });

   function showMenu()
   {
      $('.sidemenu').animate({
         'margin-left': 0
      }, 500);
   }

   function hideMenu()
   {
      $('.sidemenu').animate({
         'margin-left': -width+'px'
      }, 500);
   }
});