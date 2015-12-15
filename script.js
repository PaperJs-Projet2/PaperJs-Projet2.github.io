	$(document).ready(function() {


	  /*   Click sur nouvelle partie   */
	  $(".new").on("click", function() {
	    /*   Cacher le bouton nouvelle partie   */
	    $(".newGame").hide();
	    console.log("hello");
	    /*   Appel au canvas  */
	    var canvas = document.getElementById('myCanvas');
	    paper.setup(canvas);


	    with(paper){/*   Faire les fonction du jeux ici avec paper.  */

				/*Les objets*/

				/* PacMan */
				var path = new Path.Circle({
					center: view.center,
					radius: 30,
					strokeColor: 'black'
				});







				/*Pommes*/











				/*enemis*/








				/* Fonction  */


				/* Resize */
				function onResize(event) {
					// Whenever the window is resized, recenter the path:
					path.position = view.center;
				}













































	    }

	  });
	});
