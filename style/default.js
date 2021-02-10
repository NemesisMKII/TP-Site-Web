/*
            _     _                                            _       
           | |   | |                                          | |      
   __ _  __| | __| |   ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_ ___ 
  / _` |/ _` |/ _` |  / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __/ __|
 | (_| | (_| | (_| | | (_| (_) | | | | | | | | | | |  __/ | | | |_\__ \
  \__,_|\__,_|\__,_|  \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|___/
*/                                                                      
                                                                       
window.onload = function(){
	$("#facebook").on('click', function(){
		alert("ok");
	});
	// définit les objet
	var comms_txt = $("div.commentaires textarea");
	var comms_btn = $("div.commentaires div.add span");
	comms_btn.on('click', function(){
		alert("ok");
		if(comms_txt.val().trim().length >= 3 && comms_txt.val().trim().length <= 280){ // on verifie le nb de caractères
			var id = ""; // a definir
			var idpost = $("div#photo").attr("data-id"); // on définit id du post
			var commentaire = window.btoa(unescape(encodeURIComponent(comms_txt.val()))); // on définit le commentaire
			var date = new Date().getTime(); // on définit la timestamp
			/* var auteur on définit plus tard à l'aide des réseaux sociaux
			var profil on définit plus tard à l'aide des réseaux sociaux */
			//if($(this).attr("id") == "twitter"){
			//	alert("twitter");
			//	window.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(comms_txt.val(),'_blank'));
			//}
		}else{
			alert("Votre commentaire doit faire entre 3 et 280 maximum."); // remplacer eventuellement par une modal
		}
	});

}

/*

      _                                                               _       
     | |                                                             | |      
  ___| |__   _____      __    ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_ ___ 
 / __| '_ \ / _ \ \ /\ / /   / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __/ __|
 \__ \ | | | (_) \ V  V /   | (_| (_) | | | | | | | | | | |  __/ | | | |_\__ \
 |___/_| |_|\___/ \_/\_/     \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|___/                                                                                                                                                                                                             
                                                                          
*/