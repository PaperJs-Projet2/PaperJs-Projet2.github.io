paper.install(window);
window.onload = function() {

  $(document).ready(function() {


    /*   Click sur nouvelle partie   */
    $(".new").on("click", function() {
      /*   Cacher le bouton nouvelle partie   */
      $(".newGame").hide();
      console.log("hello");
      /*   Appel au canvas  */
      var canvas = document.getElementById('myCanvas');
      paper.setup(canvas);


      /*   Faire les fonction du jeux ici avec paper.  */

      /*Les objets*/

      var tool = new Tool();

      var tool3 = new Tool();


      /* PacMan */
      var path = new Path.Circle({
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


      }








      /* Fonction  */


      /* Resize */
      function onResize(event) {
        // Whenever the window is resized, recenter the path:
        path.position = view.center;
        carre.position = Point.random() * view.size;
      }




    });
  });

}
