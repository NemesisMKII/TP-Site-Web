/*
      __      ________ _____ _______ _____  _____ _____ ______ __  __ ______ _   _ _______ 
     /\ \    / /  ____|  __ \__   __|_   _|/ ____/ ____|  ____|  \/  |  ____| \ | |__   __|
    /  \ \  / /| |__  | |__) | | |    | | | (___| (___ | |__  | \  / | |__  |  \| |  | |   
   / /\ \ \/ / |  __| |  _  /  | |    | |  \___ \\___ \|  __| | |\/| |  __| | . ` |  | |   
  / ____ \  /  | |____| | \ \  | |   _| |_ ____) |___) | |____| |  | | |____| |\  |  | |   
 /_/    \_\/   |______|_|  \_\ |_|  |_____|_____/_____/|______|_|  |_|______|_| \_|  |_|   
                                                                                           
 

               _      _ _____ _   _ _______ ______ _____ _____         _______ ______ _    _ _____  
     /\      | |    ( )_   _| \ | |__   __|  ____/ ____|  __ \     /\|__   __|  ____| |  | |  __ \ 
    /  \     | |    |/  | | |  \| |  | |  | |__ | |  __| |__) |   /  \  | |  | |__  | |  | | |__) |
   / /\ \    | |        | | | . ` |  | |  |  __|| | |_ |  _  /   / /\ \ | |  |  __| | |  | |  _  / 
  / ____ \   | |____   _| |_| |\  |  | |  | |___| |__| | | \ \  / ____ \| |  | |____| |__| | | \ \ 
 /_/    \_\  |______| |_____|_| \_|  |_|  |______\_____|_|  \_\/_/    \_\_|  |______|\____/|_|  \_\
                                                                                                   
                                                                                                   
       _    __      __      _____  _____ _____  _____ _____ _______ 
      | |  /\ \    / /\    / ____|/ ____|  __ \|_   _|  __ \__   __|
      | | /  \ \  / /  \  | (___ | |    | |__) | | | | |__) | | |   
  _   | |/ /\ \ \/ / /\ \  \___ \| |    |  _  /  | | |  ___/  | |   
 | |__| / ____ \  / ____ \ ____) | |____| | \ \ _| |_| |      | |   
  \____/_/    \_\/_/    \_\_____/ \_____|_|  \_\_____|_|      |_|   
                                                                    
                                                                    

*/

/*
IMPORTANT POUR LE BON FONCTIONNEMENT DU JS:
- Eviter les doublons onload/ready
- Veillez à mètre les scripts qui sont dans"window.onload" dans un déclencheur d'evenement (on)ready ou (on)load
- Laisser ce qui est à l'extérieur de window.onload à l'extérieur d'un déclencheur d'evenement (on)ready ou (on)load
- respecter l'ordre (mettre les script en dehors de onload avec mes scripts qui sont en dehors de onload)

ATTENTION: 
:: fonction comm_add:
::: VERIFIER QUE var idpost = $("div#photos img").attr("data-id"); SOIT CORRECT
::: IL DOIT CORRESPONDRE A LA BALISE IMG (IMAGE EN GRAND AU DESSUS DE L'EXIF)
::: ET LA BALISE IMG DE LA PHOTO DOIT AVOIR UNE ATTRIBUT data-id AVEC L'ID DE LA PHOTO EN COURS DEDANS
::: SINON REDEFINIR ET M'AVERTIR EN MP SUR DISCORD 


*/

/*
  _____   ____   _____ _    _ __  __ ______ _   _ _______    _______ _____ ____  _   _ 
 |  __ \ / __ \ / ____| |  | |  \/  |  ____| \ | |__   __|/\|__   __|_   _/ __ \| \ | |
 | |  | | |  | | |    | |  | | \  / | |__  |  \| |  | |  /  \  | |    | || |  | |  \| |
 | |  | | |  | | |    | |  | | |\/| |  __| | . ` |  | | / /\ \ | |    | || |  | | . ` |
 | |__| | |__| | |____| |__| | |  | | |____| |\  |  | |/ ____ \| |   _| || |__| | |\  |
 |_____/ \____/ \_____|\____/|_|  |_|______|_| \_|  |_/_/    \_\_|  |_____\____/|_| \_|
                                                                                       
                                                                                       
*/
/*
LOCALSTORAGE
json 
liste[{
	auteur --> username SN
	content --> commentaire
	date --> timestamp
	id --> uuid4 + timestamp
	idpost --> id de la photo
	snet -->type de reseau social utilisé (tw = twitter, fb = facebook, insta = instagram, pint = pinterest)
}]


*/


/*
   _____ ______ _   _     _    _ _    _ _____ _____                   
  / ____|  ____| \ | |   | |  | | |  | |_   _|  __ \                  
 | |  __| |__  |  \| |   | |  | | |  | | | | | |  | |                 
 | | |_ |  __| | . ` |   | |  | | |  | | | | | |  | |                 
 | |__| | |____| |\  |   | |__| | |__| |_| |_| |__| |                 
  \_____|______|_| \_|____\____/ \____/|_____|_____/___        _____  
 |  ____/ __ \| |  | |  __ \| \ | |_   _|/ ____| |  __ \ /\   |  __ \ 
 | |__ | |  | | |  | | |__) |  \| | | | | (___   | |__) /  \  | |__) |
 |  __|| |  | | |  | |  _  /| . ` | | |  \___ \  |  ___/ /\ \ |  _  / 
 | |   | |__| | |__| | | \ \| |\  |_| |_ ____) | | |  / ____ \| | \ \ 
 |_|___ \____/ \____/|_|  \_\_| \_|_____|_____/  |_| /_/    \_\_|  \_\
 |  __ \ / __ \|  \/  | |  | |                                        
 | |__) | |  | | \  / | |  | |                                        
 |  _  /| |  | | |\/| | |  | |                                        
 | | \ \| |__| | |  | | |__| |                                        
 |_|  \_\\____/|_|  |_|\____/                                         
                                                                      
 CENSEE ETRE INCLUSE DANS LE DEFAULT.JS                                                                    
*/

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/*
            _     _                                            _       
           | |   | |                                          | |      
   __ _  __| | __| |   ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_ ___ 
  / _` |/ _` |/ _` |  / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __/ __|
 | (_| | (_| | (_| | | (_| (_) | | | | | | | | | | |  __/ | | | |_\__ \
  \__,_|\__,_|\__,_|  \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|___/
*/                                                                      

/* FONCTION AJOUT COMMENTAIRES */
function comm_add(user, sn){
	// définit les objet

	var comms_txt = $("div.commentaires textarea");
	var comms_btn = $("div.commentaires div.add span");
	if(comms_txt.val().trim().length >= 3 && comms_txt.val().trim().length <= 280){ // on verifie le nb de caractères
		/* Je récupère, génère toutes mes valeurs */
		var date = new Date().getTime(); // on définit la timestamp
		var id = uuidv4() + "." + date; // pour minimiser un maxi les doublon j'aouter le timestamp (en ms) en plus du UUID
		var idpost = $("div#photos img").attr("data-id"); // on définit id du post
		var commentaire = window.btoa(unescape(encodeURIComponent(comms_txt.val()))); // on définit le commentaire
		// var auteur = user;
		//alert("date:" + date + "\rid " + " " + id + "\rpost " + idpost + "\rcomm: " + commentaire + "\rauth " + auteur + " (" + sn + ")");
		if (!localStorage.getItem('commentaires')) {
            comm_obj = {
                'liste': []
            }
        }else{
        	comm_obj = JSON.parse(localStorage.getItem('commentaires'))
        }

        var comm_new = {
            id: id,
            idpost: idpost,
            content: commentaire,
            date: date,
            auteur: window.btoa(unescape(encodeURIComponent(user))),
            snet: sn
        } // New line json to inset in localstorage
		comm_obj.liste.push(comm_new); // j'insère mon json dans le tableau
		localStorage.setItem('commentaires', JSON.stringify(comm_obj))
	}else{
		alert("Votre commentaire doit faire entre 3 et 280 maximum."); // remplacer eventuellement par une modal
	}
}

/*
   __ _                                       _   
  / _| |                                     | |  
 | |_| |__     ___ ___  _ __  _ __   ___  ___| |_ 
 |  _| '_ \   / __/ _ \| '_ \| '_ \ / _ \/ __| __|
 | | | |_) | | (_| (_) | | | | | | |  __/ (__| |_ 
 |_| |_.__/   \___\___/|_| |_|_| |_|\___|\___|\__|
                                                  
                                                  
*/
function fb_login() {  

  FB.init({
    appId      : '1381189062227096',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v9.0'           // Use this Graph API version for this call.
  });

  FB.getLoginStatus(function(response) {   // See the onlogin handler
    if (response.status === 'connected'){
      FB.login( function() {}, { scope: 'email,public_profile' } );
      FB.api('/me', function(response) {
        //console.log('Successful login for: ' + response.name);
        //$("div.commentaires div#logged").html(`Commenter avec<div class="btn"><span class="fb"></span> ${response.name}</div>`);
        //$("div.commentaires textarea").prop("disabled", false);
        comm_add(response.name,"fb");
        /*document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!'; */
      });
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

function addzero(str){ // add a zeo if str.length > 2 --> used in fonction "show comments"
	return (str.length==2) ? str : " 0" + str;
}

/* fonction pour afficher les commentaire en fonction de l'ID de la photo */
function comments_show(idpost){ /* fonction pour afficher les commentaire en fonction de l'ID de la photo */
	if(localStorage.getItem("commentaires")){
		var all_comments = JSON.parse(localStorage.getItem('commentaires'));
		for(i in all_comments.liste){
			var commmentaire = all_comments.liste[i];
			if(idpost == commmentaire.idpost){ // si le commentaire est detiné à la photo affichée
				//console.log(all_comments.liste[i]);
				var auteur = decodeURIComponent(escape(window.atob(commmentaire.auteur)));
				var content = decodeURIComponent(escape(window.atob(commmentaire.content)));
				var date = new Date(commmentaire.date);
				var date = "Le " + addzero(date.getDay()) + "/" + addzero(date.getMonth()) + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes();
				$("div.commentaires div.comm_all").append(`
					<div class="comm" title="${date}">
						<p class="auteur"><span class="${commmentaire.snet} ico send"></span> <span>${auteur}</span></p>
						<p class="comm">${content}</p>
					</div>
				`);
			}
		}
	}
}

window.onload = function(){
/*
  _            _ _   _                                              _   
 | |          (_) | | |                                            | |  
 | |___      ___| |_| |_ ___ _ __    ___ ___  _ __  _ __   ___  ___| |_ 
 | __\ \ /\ / / | __| __/ _ \ '__|  / __/ _ \| '_ \| '_ \ / _ \/ __| __|
 | |_ \ V  V /| | |_| ||  __/ |    | (_| (_) | | | | | | |  __/ (__| |_ 
  \__| \_/\_/ |_|\__|\__\___|_|     \___\___/|_| |_|_| |_|\___|\___|\__|
                                                                                                                                      
*/

	document.querySelector('div.commentaires div.btn span.tw').addEventListener('click', function() {
		// Initialize with your OAuth.io app public key
		OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');
		// Use popup for OAuth
		OAuth.popup('twitter').then(twitter => {
		  //console.log('twitter:', twitter);
		  twitter.get('/1.1/account/verify_credentials.json?include_email=true').then(data => {
		    // console.log('username:', data.screen_name);
		    comm_add(data.screen_name,"tw");
		  })    
		});
	})

	comments_show($("div#photos img").attr("data-id")); // affiche les commentaires de la photo au chargement



}