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


			var score = 0;
      var tool = new Tool();
      var tool2 = new Tool();


      /* PacMan */

      //Image //
      var pac = new Raster('pacman');
      var loaded = false;

      pac.on('load', function() {
        loaded = true;

      })

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
      //>
      var enemiPac = new Raster('enemiPac');
      var loaded = false;

      enemiPac.on('load', function() {
          loaded = true;
        })
        //>
      var pointx = Math.random() * $("canvas").width();
      var pointy = Math.random() * $("canvas").height();
      /*var triangle = new Path.RegularPolygon(new Point(10, pointy), 3, 15)
      triangle.fillColor = 'red';
      triangle.rotate(90);
      */

	

      enemiPac.onFrame = function(event) {

        this.position.x += 6;
        if (this.position.x > $("canvas").width()) {
          this.position.x = 0;
          enemiPac.position.y = Math.random() * $("canvas").height();
      }
  }


      /* Fonction  */



      /* Le pac man suit la souris quand elle bouge */


      tool.onMouseMove = function(event) {

        var destination = event.point; //detecter la position de la mouse

        var pointRecX = pac.position.x;
        var pointRecY = pac.position.y;

        var newX = pointRecX + ((destination.x - pointRecX) / 45);
        var newY = pointRecY + ((destination.y - pointRecY) / 45);

        pac.position.x = newX;
        pac.position.y = newY;   		


				/* Gestion COllision carre et pac man */

				if (pac.bounds.intersects(carre.bounds)) {

					score += 10;
					var pointx = Math.random() * $("canvas").width();
					var pointy = Math.random() * $("canvas").height();
					carre.position.x = Math.round(pointx);
					carre.position.y = Math.round(pointy);



          $(".score").html("Score : "+score);
				}

      }

      /* le carré disparait après 10 second */


      carre.onFrame = function(event) {

        if (event.count % 200 === 0) {

          var pointx = Math.random() * $("canvas").width();
          var pointy = Math.random() * $("canvas").height();
          carre.position.x = Math.round(pointx);
          carre.position.y = Math.round(pointy);
        }


      }



      /* Collision Carre PacMan*/

      function collisionCarre() {
        if (pac.position.x + 30 > carre.position.x) {

          console.log("hello");
          return true;
        }
      }









    /* Resize */
    tool2.onResize = function(event) {

        // Whenever the window is resized, recenter the path:
        pac.position = view.center;

      }




    });
  });

}
