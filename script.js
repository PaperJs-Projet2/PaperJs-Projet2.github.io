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
      var pac = new Raster('jous1');
      var loaded = false;

      pac.on('load', function() {
        loaded = true;

      })

	   pac.onFrame = function(event) {
		   if (event.count % 30 === 0) {
			    pac.source="jous2.png";

		   }else if(event.count % 20 === 0) {
			  pac.source="jous1.png";


		   }


	   }

      /*Pommes*/

      var pointx = Math.random() * $("canvas").width();
      var pointy = Math.random() * $("canvas").height();

      var posCurate = isBorder(pointx, pointy);

      var carre = new Path.Rectangle({
        point: [posCurate[0], posCurate[1]],
        size: [15, 15],
        strokeColor: 'black',
        fillColor: 'black' // Si option de bonus, faire des couleurs aléatoire
      });



      /*enemis*/




      var enemiPac = new Raster('enemiPac');
      var loaded = false;

      enemiPac.on('load', function() {
          loaded = true;
        })


       enemiPac.position.y = Math.random() * $("canvas").height();



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



        /* Gestion Collision carre et pac man */

        if (pac.bounds.intersects(carre.bounds)) {

          score += 10;
          var pointx = Math.random() * $("canvas").width();
          var pointy = Math.random() * $("canvas").height();

          var posCurate = isBorder(pointx, pointy);

          carre.position.x = Math.round(posCurate[0]);
          carre.position.y = Math.round(posCurate[1]);

          $(".score").html("Score : " + score);

        }

      }

      /* le carré disparait après 10 second */


      carre.onFrame = function(event) {

        if (event.count % 200 === 0) {

          var pointx = Math.random() * $("canvas").width();
          var pointy = Math.random() * $("canvas").height();

          var posCurate = isBorder(pointx, pointy);

          carre.position.x = Math.round(posCurate[0]);
          carre.position.y = Math.round(posCurate[1]);
        }


      }


      /* Resize */
      tool2.onResize = function(event) {
        pac.position = view.center;

      }





      /* Function qui verifie si le carrer et trop prés du bord */
      function isBorder(pointx, pointy) {
        var decal = 40;
        if (pointx < decal) {
          pointx += decal;
        } else if (pointx > $("canvas").width() - decal) {
          pointx -= decal;
        }
        if (pointy < decal) {
          pointy += decal;
        } else if (pointy > $("canvas").height() - decal) {
          pointy -= decal;
        }

        return [pointx, pointy];
      }

    });
  });

}
