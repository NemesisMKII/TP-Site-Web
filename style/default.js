$(document).ready (() => {
// background en fonction de la taille de l'ecran => function pour la couleur dédié
    function tablette(){
        $("header a").css('color','white')
        $("header li").removeClass('border-dark')
        $("header li").addClass('border-white')
        $("header ").removeClass('border-dark')
        $("header").addClass('border-white')
        $("header").css({'border-color':'white', 'color':'white'})
        $("body").removeClass("bg2 , bg3").addClass("bg4");
        console.log("tablette")
    }
    function ordinateur(){
        $("header a").css('color','black')
        $("header").removeClass('border-white')
        $("header").addClass('border-dark')
        $("header li").removeClass('border-white')
        $("header li").addClass('border-dark')
        $("header").css({'border-color':'dark', 'color':'black'})
        $("body").removeClass("bg2 , bg4").addClass("bg3");
        console.log('ordinateur')
    }
    function telephone(){
        $("header a").css('color','white')
        $("header li").removeClass('border-dark')
        $("header li").addClass('border-white')
        $("header ").removeClass('border-dark')
        $("header").addClass('border-white')
        $("header").css({'border-color':'white', 'color':'white'})
        $("body").removeClass("bg3 , bg4").addClass("bg2");
        console.log('mobile')
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
                $('#technique_list').toggleClass('show')
            }
        })
        //Click on "categories" shows categories list
        $('#categories').hover((e) => {
            if ($(window).width() > 992) {
                $('#categories_list').toggleClass('show')   
            }
        })
         //Click on "categories" shows categories list
         $('#theme').hover((e) => {
            if ($(window).width() > 992) {
            $('#themeList').toggleClass('show')
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


  carrousselMoove() //deplace le caroussel
    slide2 = new slider2("#carroussel2");
   slide = new slider("#carroussel");
  zoomImg() //zoom 1er image et au click

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

//End footer fct
//--------------------------------------------------------------------------------------------
// template pour les categories & techniques
var categoriesTemplate = 
    `<div id="centerdiv" class="h-100">
    <div class="h-100">	
        <div class="row h-100 align-items-center w-100">
            <img src="%imgcategorie%" class="col-5 ms-auto border border-dark p-0 img-photographer" alt="">
            <div class="col-7">
                <div class="row mb-3 w-50 mx-auto">
                    <h3 class="text-center align-self-start">%nomcategorie%</h3>
                </div>
                <div class="row w-75 mx-auto">
                %textecategorie% 
                </div>
        </div>
    </div>
    </div>
    `
//fonction au click des categories
        $("#blackandwhite").click(function(e){
            e.preventDefault()   
            var texte = categoriesTemplate
            var nom = "Noir & Blanc"
            var textecat = "La photographie en noir et blanc élimine les distractions La couleur peut être un très bon élément de composition. ... En supprimant ainsi les couleurs, vous réduisez grandement les sources de distractions visibles. Vous pourrez alors vous concentrer sur la forme et la texture des différents éléments de votre image."
            texte = texte.replace(/%nomcategorie%/g, nom)
            texte = texte.replace(/%textecategorie%/g , textecat)
            $("main").empty()
            $("main").append(texte)  
        })
// fonction au click de portrait
    $("#portrait").click(function(e){
        e.preventDefault()   
        var texte = categoriesTemplate
        var nom = "Portrait"
        var textecat = "La photo de portrait est un art à part entière : il ne s’agit plus seulement d'immortaliser une scène ou une nature morte mais plutôt de capter une sensibilité, une personnalité, un trait d’humeur ou de caractère chez la personne qui joue les modèles devant l'objectif le temps d’une séance photo. De ce shooting photo, en studio, à domicile ou en extérieur vont naitre des images qui témoigneront d’une époque, d’une période de votre vie, d’un moment fort, peut être d’une réussite que vous aimeriez cristalliser.  Cette photo-portrait sera un concentré d'émotions pour revivre ces instants avec à chaque fois la même intensité. La photographie peut aussi avoir des vertus thérapeutiques et être un bon moyen de prendre confiance en soi, en son image, de s’accepter tel qu’on est. C’est encore le moyen de se mettre en valeur pour une photo corporate ou dans un cadre privé pour séduire de nouveaux partenaires."
        texte = texte.replace(/%nomcategorie%/g, nom)
        texte = texte.replace(/%textecategorie%/g , textecat)
        $("main").empty()
        $("main").append(texte)  
    })
//fonction au click de paysage
    $("#paysage").click(function(e){
        e.preventDefault()   
        var texte = categoriesTemplate
        var nom = "Paysage"
        var textecat = "Les paysages n’ont pas seulement enthousiasmés les grands peintres. D’innombrables photographes mondialement connus ont traité ce sujet fascinant. Dès l’Antiquité, des genres picturaux apparaissent. Ainsi, il existait en Grèce de grands portraitistes comme Zeuxis ou Appelle. Mais le paysage n’était pas à cette époque un genre pictural autonome. Il pouvait servir d’arrière-plan ou d’élément décoratif mais ne constituait pas en lui-même un sujet. Il faut attendre le 19e siècle pour que le paysage s’affirme comme un genre pictural dominant. Au paysage réaliste des peintres anglais ou des français de l’École de Barbizon succèdera le paysage impressionniste."
        texte = texte.replace(/%nomcategorie%/g, nom)
        texte = texte.replace(/%textecategorie%/g , textecat)
        $("main").empty()
        $("main").append(texte)  
    })
// fonction au click d architecture
    $("#architecture").click(function(e){
        e.preventDefault()   
        var texte = categoriesTemplate
        var nom = "Architecture"
        var textecat = "La photographie d'architecture, est l’un des principaux thèmes de la photographie. Elle consiste à réaliser des photographies d’édifices, cette restitution pouvant être fidèle, ou magnifiée selon le désir, la volonté et la sensibilité artistique du photographe"
        texte = texte.replace(/%nomcategorie%/g, nom)
        texte = texte.replace(/%textecategorie%/g , textecat)
        $("main").empty()
        $("main").append(texte)  
    })
// fonction au click de graphisme
$("#graphisme").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "graphisme"
    var textecat = "Le graphisme est une discipline qui consiste à créer, choisir et utiliser des éléments graphiques (dessins, caractères typographiques, photos, couleurs, etc.) ... Le designer graphique est alors un médiateur qui agit sur les conditions de réception et d'appropriation des informations et des savoirs qu'il met en forme"
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
})
 // fonction au click d evenement
$("#evenement").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "Evenement"
    var textecat = "L’art de la photographie ne s’improvise pas. Entre lumières, positions, angles, cadre, vous mettre en valeur, vous et vos événements. Et au-delà de cette mise en valeur, il est votre référent pour votre image et vos souvenirs."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
})   
 // fonction au click de boudoir
 // faire une fonction pour autoriser l'acces a cette categorie
 $("#boudoir").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "Boudoir"
    var textecat = "La photo boudoir mêle féminité, douceur, sensualité et émotion. A la différence de la photo de nu, les photos boudoir sont généralement prises dans un décor naturel, en studio, en chambre ou dans votre salon afin de vous représenter dans votre univers."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
})   

//------------------------------------------------------------------------------------------------
// fonctions au click des TECHNIQUES
 // fonction au click de HDR
 $("#hdr").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "HDR"
    var textecat = "Le HDR (abréviation du terme High Dynamic Range signifiant grande plage dynamique) désigne des formats et des standards de vidéos et d'images numériques permettant de représenter des niveaux de luminosités plus élevés que la limite de 100 nits des contenus du standard SDR. Le HDR permet d'augmenter la gamme dynamique pouvant être enregistrée dans une image ou une vidéo numérique et permet d'obtenir des hautes-lumières plus lumineuses, plus détaillées et plus saturées en couleur. Les technologies liées au HDR permettent également d'améliorer le détail dans les zones sombres."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
}) 
// click high key low key
$("#highkey").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "High Key/Low Key"
    var textecat = "Une photo High-key est une image qui présente une forte prédominance des teintes claires. Légèrement surexposé sans pour autant être «brûlé » et dépourvu d’ombres, le portrait high-key se présente comme une image très claire, presque blanche sur laquelle, seuls quelques reliefs ou détails stratégiques plus foncés sont mis en évidence. Le portrait high-key propose une vision légère, romantique, douce et pure d’un visage en lumière diffuse et uniforme.<br>Une photo Low-key, quant à elle, est une image qui présente une prédominance des teintes foncées. Volontairement sous-exposé, le portrait low-key regroupe plusieurs styles d’images dont les visuels en clair-obscur. Réalisé en général avec une seule source lumineuse, le portrait low-key se présente comme une image noire sur laquelle, seuls quelques reliefs ou détails stratégiques ont été mis en lumière. Au contraire du high-key, le portrait low-key propose une vision caractérisée d’un visage en lumière contrastée."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
})  
// click high speed
$("#highspeed").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "High Speed"
    var textecat = "La photographie High Speed est une approche technique répondant à deux enjeux : une durée d'exposition aussi courte que possible et un déclenchement précis dans le temps pour le synchroniser avec le phénomène à saisir. Le but est de capter des phénomènes trop rapides pour être perçus à l'œil nu."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
}) 
// click studio
$("#studio").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "Studio"
    var textecat = "Profitez de la qualité studio professionnelle, composé de plusieurs flashs avec diffuseur de lumière et de fonds unis ou imprimés et une multitude d'accessoires et vêtements."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
}) 
// click tilt shift
$("#tiltshift").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "Tilt Shift"
    var textecat = "Le Tilt-Shift, plus communément appelé effet maquette, est à la base un effet créé par les objectifs à bascule. Il permet -grâce à un flou qui entoure le sujet- de donner une impression de miniaturisation à une photo."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
}) 
// click POSE LONGUE
$("#poselongue").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "Pose Longue"
    var textecat = "Une pose longue consiste, en photographie, à utiliser, de jour, un temps de pose assez long pour capturer nettement les éléments fixes d'une scène tout en supprimant les éléments en mouvement ou en les rendant flous et, de nuit, à transformer les sources lumineuses mobiles en trainées lumineuses"
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
}) 
// click light painting
$("#lightpainting").click(function(e){
    e.preventDefault()   
    var texte = categoriesTemplate
    var nom = "Light Painting"
    var textecat = "Le light painting est une technique visuelle de prise de vue photographique fondée sur la captation de la lumière, peu importe sa forme et son intensité, sur un capteur optique ou numérique. Cela permet de fixer la lumière dans un état temporel et d’espace."
    texte = texte.replace(/%nomcategorie%/g, nom)
    texte = texte.replace(/%textecategorie%/g , textecat)
    $("main").empty()
    $("main").append(texte)  
}) 
 //----------------------------------------------------------------------------------------------       
// a l'ext de onready
function captcha_new(){
    var chiffre1 = Math.floor(Math.random() * 10);     // retourne un chiffre entre 0 et 9
    var chiffre2 = Math.floor(Math.random() * 10);     // retourne un chiffre entre 0 et 9
    var total = chiffre1+chiffre2;		// je calcul combien font chiffre1 + chiffre2
    $("#dyna").css({'border':'black','border-radius':'5px', 'background':'white','color':'black'})
    $("#dyna").text("Résoudre l'opération suivante : " + chiffre1 + " + " + chiffre2); // ici j'informe le visiteur du calcul à réaliser en modifiant le contenu de ma balise p#captcha_dyn
    return total; // je retourne le total pour le sortir mon total de ma fonction ligne 37
}

// à l'exterieur et aprè on onload
var total = captcha_new(); // j'execute ma fonction et je sort le total de ma fonction #ligne 37

