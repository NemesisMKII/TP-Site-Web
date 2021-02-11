$(document).ready (() => {
    if ($(window).width() > 992) {
        //Click on "techniques" shows techniques list
        $('#techniques').hover((e) => {
            if ($(window).width() > 992) {
                $('#technique_list').toggleClass('show')
            }
        })
        //Click on "categories" shows categories list
        $('#categories').hover((e) => {
            if ($(window).width() > 992) {
                $('#categories_list').toggleClass('show')
            }
    })
    } 
  
    //Formulaire
    var formObj
    if (!localStorage.getItem('formulaire')) {
        formObj = {
            "form": []
        }
    } else {
        formObj = JSON.parse(localStorage.getItem('formulaire'))
    }


    $("#myForm").on("submit", function(e){
        //envoi du formulaire
        e.preventDefault()
        var firstName = $("#firstName").val()
        var name = $("#name").val()
        var objet = $("#objet").val()
        var message = $("#message").val()
        var mail = $("#mail").val()
        

    if ( firstName == "" || name == "" || objet =="" || message == "" || $("#age").prop("checked") == false){
        alert("Tous les champs ne sont pas remplis")
    }else{
        if(total ==  $("input#captcha").val()){ // si la réponse est correcte
            console.log("suite de ton script");
            var newform = {
                nom : name,
                prenom : firstName,
                email : mail,
                objetMessage : objet,
                message : message,
                date : (new Date()).getTime()
            
            } 
            formObj.form.push(newform)
            localStorage.setItem('formulaire', JSON.stringify(formObj))
            
        
            
            //envoi du formulaire via la boite de dialogue mail
            var messagesend = "   nom : " + name  ;
            messagesend += "   prenom : " + firstName ;
            messagesend += "  adresse mail :  "+ mail ;
            messagesend +=  "   message : " + message   ;
            message += encodeURI(messagesend);
            var subject = objet
            subject = encodeURI(subject)
            window.location.href=`mailto:rudy.lesur@id-formation.fr?subject=${subject}&body=${messagesend}`;
        }else{
            total = captcha_new(); // je regénère un nouveau calcul
            $("input#captcha").val(""); // et j'efface sa réponse
            alert("reponse incorrect");
        }

        //vide les champs
        alert("msg envoyé")
        $("#firstName").val("")
        $("#name").val("")
        $("#objet").val("")
        $("#message").val("")
        $("#mail").val("")       
        }
    });

    $("#btnConnexion").click(function(e) {
        e.preventDefault()
        $("#modalLogin").modal("show")				//affiche le formulaire de connexion sous forme de modal
        $("#formLogin").submit(function(event) {
            event.preventDefault()
            var pseudo = $("#myID").val()			//recup le pseudo
            var MdP = $("#myPassword").val()		//recup le mot de passe
            login(pseudo, MdP)						//lance la fonction Login
        })
    })
  
    $("#btnClose").click(function () {		//fermeture du formulaire de connection au clic sur X en haut a droite
        $("#modalLogin").hide()
    })

    // Fonction LOGIN

    function login(pseudo, MdP) {
        var monJsonUsers								//recup du Json dans localStorage
        if (!localStorage.getItem("localUsers")) {		//si vide, creation d'un nouveau Json
            monJsonUsers = {"users": [{"pseudo" : "Zlatan",
                    "mdp" : "123",
                    "role" : "larbin"}]}
        } else {
            monJsonUsers = JSON.parse(localStorage.getItem("localUsers"))
        }

        if (pseudo == "" || MdP == "") {			//verif que les input pseudo et mot de passe sont rempli
            alert("Merci de remplir les 2 champs")
        } else {
            var pseudoExist = false
            let x									//recherche du pseudo dans le Json
            for (x in monJsonUsers.users) {
                if (pseudo == monJsonUsers.users[x].pseudo) {	//pseudo OK
                    var monUser = monJsonUsers.users[x]
                    pseudoExist = true
                    break
                } else {										//pseudo non trouvé
                    alert("Mauvaise identification, essayez encore")
                    location.reload()
                }
            }
        }
        if (pseudoExist) {
            var loginOK = false
            if (MdP == monUser.mdp) {							//MdP correspond au pseudo
                alert("Content de vous revoir " + monUser.pseudo)
                loginOK = true
                sessionStorage.setItem("sessionUser", JSON.stringify(monUser))	//Stockage de l'user dans le sessionStorage
                $("#modalLogin").hide()
                //charger le theme s'il existe
                //modifier le bouton "connection" en déconnection et créer la fonction
            } else {
                alert("Mauvaise identification, essayez encore")
                location.reload()
            }
            if (loginOK) {						//pseudo + MdP OK => verif si Admin ou User
                if (monUser.role == "admin") {
                    // Mode Admin
                    alert("Mode Admin enclenché")
                } else {
                    // User Normal
                    alert("Mode Boudoir déverrouillé")
                }
            }
        }
    }


    // FIN Fonction LOGIN
//----------------------------------------------------
//FOOTER


$(window).resize(function(){
  var largeurWindow = $(window).width()
  if (largeurWindow < 992) {
    $('#carroussel').hide()
    $('#carroussel2').show()

  }else {
    $('#carroussel2').hide()
    $('#carroussel').show()      
  }
})
    slide2 = new slider2("#carroussel2");
   slide = new slider("#carroussel");
//si j'en crée une deuxieme je remet -- slide = new slider("idDuNouveauCarroussel");

//-----------------------------------------------
    
}) //celui  du ready


//variable pour le footer
  //fonction sans responsiv
var slider = function(id){
    var self=this
   this.divCarrou = $(id); //recup la div carroussel
   this.slider=this.divCarrou.find(".slider") //je vais rechercher mon slider
   this.largeurCarrou= this.divCarrou.width() //recup la largeur de la div carroussel pour savoir de combien on doit decaler les photos
   this.largeur=0
   this.divCarrou.find("a").each(function(){ //fonction qui nous retourne le nbr images
       self.largeur +=$(this).width() //on incrémente de la largeur de chaque images
       //on recup aprés les écarts entre les photos aussi pour avoir toute la largeur du contenu
       self.largeur +=parseInt($(this).css("padding-left")) //parseint pour recup un entier //on recup le padding left
       self.largeur +=parseInt($(this).css("padding-right"))
       self.largeur +=parseInt($(this).css("margin-left"))
       self.largeur +=parseInt($(this).css("margin-right")) 

   })
   this.prec = this.divCarrou.find(".prec")// on va rechercher le bouton précendent
   this.suiv= this.divCarrou.find(".suiv")
   this.saut= this.largeurCarrou/2 //variable saut qui permet de deplacer les image de la moitié du carousselle //on enleve le/2 si on veux decaler tout le contenu de la div et pas que la moitié
   this.nbEtapes =Math.ceil(this.largeur/this.saut -this.largeurCarrou/this.saut) //nombre etapes, donc de click sur suivant avant datteindre le bout //on soustrait le nb étapes en trop
   //Match.ceil permet d'arrondir au nb superieur
   this.courant=0 //permet si on l'incrément de savoir ou on est(si on a deplacé x fois ver la gauche)
   
   //le comportement au click des boutons 
   this.suiv.click(function(){ //fonction qui au click de la souris sur suivant va deplacer les images
       //on creer ici une verification afin que si ya plus d'image il ne puisse plus click sur suivant
       if (self.courant<=self.nbEtapes) {
           self.courant++
           self.slider.animate({
               left:-self.courant*self.saut //on anime la position par rapport à la gauche(on va rettiré le saut vers la gauche sur le css)
           },1000)
       }
   })
   this.prec.click(function(){ //fonction qui au click de la souris sur précedent va deplacer les images
       //on creer ici une verification afin que si ya plus d'image il ne puisse plus click sur suivant
       if (self.courant>0) {
           self.courant--
           self.slider.animate({
               left:-self.courant*self.saut //on anime la position par rapport à la gauche(on va rettiré le saut vers la gauche sur le css)
           },1000)
       }
   })
}
var slider2 = function(id){
    var self=this
   this.divCarrou = $(id); //recup la div carroussel
   this.slider=this.divCarrou.find(".slider2") //je vais rechercher mon slider
   this.hauteurCarrou= this.divCarrou.height() //recup la largeur de la div carroussel pour savoir de combien on doit decaler les photos
   this.hauteur=0
   this.divCarrou.find("img").each(function(){ //fonction qui nous retourne le nbr images
       self.hauteur +=$(this).width() //on incrémente de la largeur de chaque images
       //on recup aprés les écarts entre les photos aussi pour avoir toute la largeur du contenu
       self.hauteur +=parseInt($(this).css("padding-top")) //parseint pour recup un entier //on recup le padding left
       self.hauteur +=parseInt($(this).css("padding-bottom"))
       self.hauteur +=parseInt($(this).css("margin-top"))
       self.hauteur +=parseInt($(this).css("margin-bottom")) 

   })
   this.prec = this.divCarrou.find(".prec2")// on va rechercher le bouton précendent
   this.suiv= this.divCarrou.find(".suiv2")
   this.saut= this.hauteurCarrou/2 //variable saut qui permet de deplacer les image de la moitié du carousselle //on enleve le/2 si on veux decaler tout le contenu de la div et pas que la moitié
   this.nbEtapes =Math.ceil(this.hauteur/this.saut -this.hauteurCarrou/this.saut) //nombre etapes, donc de click sur suivant avant datteindre le bout //on soustrait le nb étapes en trop
   //Match.ceil permet d'arrondir au nb superieur
   this.courant=0 //permet si on l'incrément de savoir ou on est(si on a deplacé x fois ver la gauche)
   
   //le comportement au click des boutons 
   this.suiv.click(function(){ //fonction qui au click de la souris sur suivant va deplacer les images
       //on creer ici une verification afin que si ya plus d'image il ne puisse plus click sur suivant
       if (self.courant<=self.nbEtapes) {
           self.courant++
           self.slider.animate({
               top:-self.courant*self.saut //on anime la position par rapport à la gauche(on va rettiré le saut vers la gauche sur le css)
           },1000)
       }
   })
   this.prec.click(function(){ //fonction qui au click de la souris sur précedent va deplacer les images
       //on creer ici une verification afin que si ya plus d'image il ne puisse plus click sur suivant
       if (self.courant>0) {
           self.courant--
           self.slider.animate({
               top:-self.courant*self.saut //on anime la position par rapport à la gauche(on va rettiré le saut vers la gauche sur le css)
           },1000)
       }
   })
}



// a l'ext de onready
function captcha_new(){
    var chiffre1 = Math.floor(Math.random() * 10);     // retourne un chiffre entre 0 et 9
    var chiffre2 = Math.floor(Math.random() * 10);     // retourne un chiffre entre 0 et 9
    var total = chiffre1+chiffre2;		// je calcul combien font chiffre1 + chiffre2
    $("#dyna").text("Résoudre l'opération suivante:" + chiffre1 + " + " + chiffre2); // ici j'informe le visiteur du calcul à réaliser en modifiant le contenu de ma balise p#captcha_dyn
    return total; // je retourne le total pour le sortir mon total de ma fonction ligne 37
}

// à l'exterieur et aprè on onload
var total = captcha_new(); // j'execute ma fonction et je sort le total de ma fonction #ligne 37
console.log(total);