/*
            _     _                                            _       
           | |   | |                                          | |      
   __ _  __| | __| |   ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_ ___ 
  / _` |/ _` |/ _` |  / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __/ __|
 | (_| | (_| | (_| | | (_| (_) | | | | | | | | | | |  __/ | | | |_\__ \
  \__,_|\__,_|\__,_|  \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|___/
*/                                                                      

function comm_add(user){
	// définit les objet
	alert(user);
	var comms_txt = $("div.commentaires textarea");
	var comms_btn = $("div.commentaires div.add span");
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
}
                                                                   
/*

      _                                                               _       
     | |                                                             | |      
  ___| |__   _____      __    ___ ___  _ __ ___  _ __ ___   ___ _ __ | |_ ___ 
 / __| '_ \ / _ \ \ /\ / /   / __/ _ \| '_ ` _ \| '_ ` _ \ / _ \ '_ \| __/ __|
 \__ \ | | | (_) \ V  V /   | (_| (_) | | | | | | | | | | |  __/ | | | |_\__ \
 |___/_| |_|\___/ \_/\_/     \___\___/|_| |_| |_|_| |_| |_|\___|_| |_|\__|___/                                                                                                                                                                                                             
                                                                          
*/



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
        comm_add("fb:"+response.name);
        /*document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!'; */
      });
    }
  });
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
		    //$("div.commentaires div#logged").html(`Commenter avec<div class="btn"><span class="tw"></span> ${data.screen_name}</div>`);
		    //$("div.commentaires textarea").prop("disabled", false);
		    comm_add("twitter:"+data.screen_name);
		  })    
		});
	})
}