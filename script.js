paper.install(window);
window.onload = function() {

  $(document).ready(function() {


    /*   Click sur nouvelle partie   */
    $(".new").on("click", function() {
      /*   Cacher le bouton nouvelle partie   */
      $(".newGame").hide();



      /*   Appel au canvas  */
      var canvas = document.getElementById('myCanvas');
      paper.setup(canvas);


      /*   Faire les fonction du jeux ici avec paper.  */

      /*Les objets*/

      var tool = new Tool();
			var tool2 = new Tool();


      /* PacMan */
      var pac = new Path.Circle({
        center: view.center,
        radius: 30,
        strokeColor: 'red'
      });




      /*Pommes*/

      var pointx = Math.random() * $("canvas").width();
      var pointy = Math.random() * $("canvas").height();


      var carre = new Path.Rectangle({
        point: [pointx, pointy],
        size: [15, 15],
        strokeColor: 'black',
        fillColor: 'black' // Si option de bonus, faire des couleurs aléatoire
      });








      /*enemis*/
      var pointx = Math.random() * $("canvas").width();
      var pointy = Math.random() * $("canvas").height();


      var triangle = new Path.RegularPolygon(new Point(10, pointy), 3, 15)
      triangle.fillColor = 'red';
      triangle.rotate(90);


      triangle.onFrame = function(event) {

        this.position.x += 6;
			if(this.position.x > $("canvas").width()){
				this.position.x = 0;
			triangle.position.y = Math.random() * $("canvas").height();
			}


      }






      tool.onMouseMove = function(event) {

        var destination = event.point; //detecter la position de la mouse

				var pointRecX = pac.position.x;
				var pointRecY = pac.position.y;

				var newX = pointRecX+((destination.x-pointRecX)/100);
				var newY = pointRecY+((destination.y-pointRecY)/100);

				pac.position.x = newX;
			 	pac.position.y = newY;


      }



      /* Resize */
      tool2.onResize = function(event) {
        // Whenever the window is resized, recenter the path:
        pac.position = view.center;

      }




    });
  });

}
