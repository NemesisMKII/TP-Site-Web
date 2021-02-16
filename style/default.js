$(document).ready (() => {
    var Connexion = false
    var mesUsers = {"users":    [{"id" : 1,
            "pseudo" : "Rudy",
            "mdp" : "789",
            "role" : "admin",
            "date" : 1,
            "theme" : 1},
            {"id" : 2,
                "pseudo" : "Zlatan",
                "mdp" : "123",
                "role" : "user",
                "date" : 2,
                "theme" : 2}]}

// background en fonction de la taille de l'ecran => function pour la couleur dédié
    function tablette(){
        $("header a").css('color','white')
        $("header li").removeClass('border-dark')
        $("header li").addClass('border-white')
        $("header ").removeClass('border-dark')
        $("header").addClass('border-white')
        $("header").css({'border-color':'white', 'color':'white'})
        $("body").removeClass("bg2 , bg3").addClass("bg4");
    }
    function ordinateur(){
        $("header a").css('color','black')
        $("header").removeClass('border-white')
        $("header").addClass('border-dark')
        $("header li").removeClass('border-white')
        $("header li").addClass('border-dark')
        $("header").css({'border-color':'dark', 'color':'black'})
        $("body").removeClass("bg2 , bg4").addClass("bg3");
    }
    function telephone(){
        $("header a").css('color','white')
        $("header li").removeClass('border-dark')
        $("header li").addClass('border-white')
        $("header ").removeClass('border-dark')
        $("header").addClass('border-white')
        $("header").css({'border-color':'white', 'color':'white'})
        $("body").removeClass("bg3 , bg4").addClass("bg2");
        alert('mobile')
    }
    // background en fonction de la taille de l 'ecran
    if ($(window).width() >= 1024 ){
        ordinateur()
        console.log('ecran pc 1')
    }
     if  ($(window).width() >= 800 && $(window).height() >=800) {

        if( navigator.userAgent.match(/ipad/gi)){
            console.log("tablette")
            tablette()
        }else{
            console.log("phone")
            telephone()
        }
    }
     if (navigator.userAgent.match(/ipad|android|phone|ios|iphone/gi)){
        if ($(window).width() <= 570 ){
        console.log("smart")
        telephone()
    }
}
// end background color
  
    if ($(window).width() > 992) {
        //Click on "techniques" shows techniques list
        $('#techniques').hover((e) => {
            if ($(window).width() > 992) {
                $('#technique_list').toggleClass('showlist')
            }
        })
        //Click on "categories" shows categories list
        $('#categories').hover((e) => {
            if ($(window).width() > 992) {
                $('#categories_list').toggleClass('showlist')   
            }
        })
         //Click on "categories" shows categories list
         $('#theme').hover((e) => {
            if ($(window).width() > 992) {
            $('#themeList').toggleClass('showlist')
            }
        })
    }
    
 //-------------------------------------------------------------------------------  
 //bouton detection mobile/tablet
     $('#detect-button').click(function(){
     var detector = new MobileDetect(window.navigator.userAgent)
     console.log( "Mobile: " + detector.mobile());
     console.log( "Phone: " + detector.phone());
     console.log( "Tablet: " + detector.tablet());
    console.log( "OS: " + detector.os());
    console.log( "userAgent: " + detector.userAgent());

    });

    //theme color black white grey au clic navbar
    $("li.black").click(function() {
        $("header a").css('color','white')
        $("header li").removeClass('border-dark')
        $("header li").addClass('border-white')
        $("header ").removeClass('border-dark')
        $("header").addClass('border-white')
        $("header").css({'border-color':'white', 'color':'white'})
        $("body").removeClass("bg3 , bg4").addClass("bg2");
        console.log('noir')
    });
    
    $("li.white").click(function() {
        $("header a").css('color','black')
        $("header").removeClass('border-white')
        $("header").addClass('border-dark')
        $("header li").removeClass('border-white')
        $("header li").addClass('border-dark')
        $("header").css({'border-color':'dark', 'color':'black'})
        $("body").removeClass("bg2 , bg4").addClass("bg3");
    });
    
    $("li.grey").click(function() {
        $("header a").css('color','white')
        $("header li").removeClass('border-dark')
        $("header li").addClass('border-white')
        $("header ").removeClass('border-dark')
        $("header").addClass('border-white')
        $("header").css({'border-color':'white', 'color':'white'})
        $("body").removeClass("bg2 , bg3").addClass("bg4");
    })
    // enregistrement du choix des couleurs dans le localstorage
    var themeObj
    if (!localStorage.getItem('themeColor')) {
        themeObj = {
            "themes": []
        }
    } else {
        themeObj = JSON.parse(localStorage.getItem('themeColor'))
    }
    $("ul#themeList li").on('click', function(){
        var color = $(this).attr("value")
        var theme = {
            colorChoose : color
        }
        themeObj.themes.push(theme)
        localStorage.setItem('themeColor', JSON.stringify(themeObj)) 
        });
 //------------------------------------------------------------------------------------       
    // formulaire localstorage
  
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
        alert("Votre message à été envoyé, nous vous répondons dans les meilleurs délais")
        $("#firstName").val("")
        $("#name").val("")
        $("#objet").val("")
        $("#message").val("")
        $("#mail").val("")  
        $("#calculer").val("")     
        }
    });

    $("#formLogin").submit(function(event) {
        event.preventDefault()
        var pseudo = $("#myID").val()			//recup le pseudo
        var MdP = $("#myPassword").val()		//recup le mot de passe
        login(pseudo, MdP)						//lance la fonction Login
    })

    $("#btnConnexion").click(function(e) {
        e.preventDefault()
        $('#myID').val('')
        $('#myPassword').val('')
        if (Connexion == false) {
            $("#modalLogin").show()		         //affiche le formulaire de connexion sous forme de moda
        } else {
            deconnexion()
        }
    })
  
    $("#btnClose").click(function () {		//fermeture du formulaire de connection au clic sur X en haut a droite
        $("#modalLogin").hide()
    })

    // Fonction LOGIN

    function login(pseudo, MdP) {
        var monJsonUsers								//recup du Json dans localStorage
        if (!localStorage.getItem("localUsers")) {		//si vide, creation d'un nouveau Json
            monJsonUsers = mesUsers
            console.log(monJsonUsers);
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
                }
            }
        }
        if (pseudoExist) {
            var loginOK = false
            if (MdP == monUser.mdp) {							//MdP correspond au pseudo
                alert("Content de vous revoir " + monUser.pseudo)
                loginOK = true
                monObjUser = {"userLog" : monUser}
                sessionStorage.setItem("sessionUser", JSON.stringify(monObjUser))	//Stockage de l'user dans le sessionStorage
                $("#modalLogin").hide()
                //charger le theme s'il existe
                $("#btnConnexion").text("Deconnexion")      //modifier le bouton "connexion" en déconnexion
                Connexion = true
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
        } else {
        alert("Mauvaise identification, essayez encore")
        location.reload()}
    }

    // FIN Fonction LOGIN

    function deconnexion () {
        sessionStorage.removeItem("sessionUser")
        $("#btnConnexion").text("Connexion")
        Connexion = false
        alert("Vous etes bien deconnecté")
    }
//----------------------------------------------------
//FOOTER


  carrousselMoove() //deplace le caroussel
    slide2 = new slider2("#carroussel2");
   slide = new slider("#carroussel");
  zoomImg() //zoom 1er image et au click
  fullScreen()

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
//fct responsive footer
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
$(window).resize(function(){
  carrousselMoove()
});
function carrousselMoove(){ //cache le carroussel et affiche sur la droite en fct de la taille de l'écran

    var largeurWindow = $(window).width()
    if (largeurWindow < 992) {
      $('#carroussel').hide()
      $('#carroussel2').show()
      

    }else {
      $('#carroussel2').hide()
      $('#carroussel').show()
       
    }
}
//Ajout des miniatures


// zoom
  function zoomImg(){
    var way = "ress/imagesCarrou/miniature/"
     var dossier="grande/"
     var name = $(this).attr('name')
     var nameFirst = $('.choixImg').attr('name')
     var fileExtension=$('.choixImg').attr('data-ex')

  $('.img-full').attr("src",way+dossier+nameFirst+'Max'+fileExtension) //zoom de la 1er image
  $('.choixImg').click(function(){ //zoom au click
     //var srcImg= $(this).attr('src')
     var way = "ress/imagesCarrou/miniature/" //le chemin
     var dossier="grande/" //le dossier
     var name = $(this).attr('name') //le nom
     var fileExtension= $(this).attr('data-ex')//l'extension

     $('.img-full').attr("src",way+dossier+name+'max'+fileExtension) //reecris le src de pour le zoom avec les diffrents attributs
  })
}
//fullScreen
function fullScreen(){
  $('.img-full').click(function () {
      $('#overlay').show()
      $('.imgReal').attr("src", $(this).attr('src'))
      $('#zoom').hide()
  })
  $('.closeMe').click(function () {
      $('#overlay').hide()
      $('#zoom').show()
  })
  $(document).keydown(function (event) {
     if (event.keyCode == 27){
      $('#overlay').hide()
      $('#zoom').show()
      }
  })
}
//End footer fct

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
