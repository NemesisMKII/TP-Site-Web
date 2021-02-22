améliorations css (responsive)

modifications de la fonction zoom de damien (js) + ajout manuelle des attributs data-id dans index.html
		--> pour que les commentaires s'affichent en fonctiond de la photo cliquée
		--> pour que l'utilisateur commente la photo en fonction de le l'ID de la photo utilisateur
		
		comments_show($(this).attr("data-id")); // affichage en fonction de l'id de la photo (data-id)
		 $("div#zoom img").attr("data-id", $(this).attr("data-id")); // on reaffecte le data-id de #zoom pour les commentaires
	 
	 
modifications commentaires.js
		--> debug pour que le commentaires de la photos précédement cliquée disparaissent
		--> debug -> n'importe qui pouvait suppr les comms --> problème résolu

							