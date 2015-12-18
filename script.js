paper.install(window);
window.onload = function() {

  $(document).ready(function() {

    /*   Click sur nouvelle partie   */
    $(".pacna").on("click", function() {
      jeux("pacna");
    });
    $(".pacrine").on("click", function() {
      jeux("pacrine");
    });
    $(".pacnic").on("click", function() {
      jeux("pacnik");
    });


    /*   Cacher le bouton nouvelle partie   */

    function jeux(joueur) {
      $(".newGame").hide();

      /*   Appel au canvas  */
      var canvas = document.getElementById('myCanvas');
      paper.setup(canvas);


      /*   Faire les fonctions du jeux ici avec paper.  */
      /*Les objets*/
      var score = 0;
      var tool = new Tool();
      var tool2 = new Tool();
      var vitesse = 6;

      /* PacMan */

      //Image //
      if (joueur === 'pacna') {
        var pac = new Raster('jous1')
        var loaded = false;

        pac.on('load', function() {
          loaded = true;
        });

        pac.onFrame = function(event) {
          if (event.count % 30 === 0) {
            pac.source = "jous2.png";

          } else if (event.count % 20 === 0) {
            pac.source = "jous1.png";
          }
        }
      } else if (joueur === 'pacrine') {
        var pac = new Raster('karine1')
        var loaded = false;
        pac.on('load', function() {
          loaded = true;
        });

        pac.onFrame = function(event) {
          if (event.count % 30 === 0) {
            pac.source = "karine2.png";

          } else if (event.count % 20 === 0) {
            pac.source = "karine1.png";
          }
        }
      } else {
        {
          var pac = new Raster('yannic1')
          var loaded = false;
          pac.on('load', function() {
            loaded = true;
          });

          pac.onFrame = function(event) {
            if (event.count % 30 === 0) {
              pac.source = "yannic2.png";

            } else if (event.count % 20 === 0) {
              pac.source = "yannic1.png";
            }
          }
        }
      }

      /*Pommes*/

      var pointx = Math.random() * $("canvas").width();
      var pointy = Math.random() * $("canvas").height();

      var posCurate = isBorder(pointx, pointy);

      var carre = new Raster('carre');

      carre.position = [posCurate[0], posCurate[1]];




      /*enemis*/
      var enemiPac = new Raster('enemiPac');
      var loaded = false;

      enemiPac.on('load', function() {
        loaded = true;
      })

      enemiPac.position.y = Math.random() * $("canvas").height();

      enemiPac.onFrame = function(event) {


        this.position.x += vitesse;
        if (this.position.x > $("canvas").width()) {
          this.position.x = 0;
          enemiPac.position.y = Math.random() * $("canvas").height();
        }

      }

      // Difficulte en fonction du score
      if (score %50 === 0)
      {
        vitesse += 2;
      }

      var enemiPac2 = new Raster('enemiPac2');
      var loaded = false;

      enemiPac2.on('load', function() {
        loaded = true;
      })

      enemiPac2.position.y = Math.random() * $("canvas").height();
      enemiPac2.position.x = $("canvas").width();

      enemiPac2.onFrame = function(event) {

        enemiPac2.position.x -= vitesse;
        if (enemiPac2.position.x < 0) {
          enemiPac2.position.x = $("canvas").width();
          enemiPac2.position.y = Math.random() * $("canvas").height();
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


        if (enemiPac.bounds.intersects(pac.bounds) || enemiPac2.bounds.intersects(pac.bounds)) {
          $(".gameOver").show();
          if (score > 100) {
            $(".ScoreEND").html("BRAVO vous avez marqué" + score + " points !!");
          } else {
            $(".ScoreEND").html(+score + " points seulement ?! C'est pas terrible ! ");
          }

          $(".new2").on("click", function() {
            location.reload();
          });
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
        /* Collision Carre PacMan*/

      function collisionCarre() {
        if (pac.position.x + 30 > carre.position.x) {

        }
        console.log("hello");
        return true;
      }


      // Whenever the window is resized, recenter the path:
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
    }

  });
}