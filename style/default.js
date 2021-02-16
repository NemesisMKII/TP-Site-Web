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
    var formObj
    if (!localStorage.getItem('formulaire')) {
        formObj = {
            "form": []
        }
    } else {
        formObj = JSON.parse(localStorage.getItem('formulaire'))
    }
$("#myForm").submit(register)
        //envoi du formulaire
    function register(event) {
        event.preventDefault()
        var firstName = $("#firstName").val()
        var name = $("#name").val()
        var objet = $("#objet").val()
        var message = $("#message").val()
        var mail = $("#mail").val()
        
    if ( firstName == "" || name == "" || objet =="" || message == "" || $("#age").prop("checked") == false){
        alert("Tous les champs ne sont pas remplis")
    }else{
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
        //captcha
        var chiffre1 = Math.floor(Math.random() * 10); 
        var chiffre2 = Math.floor(Math.random() * 10); 
        var total = chiffre1 + chiffre2; 
        var captcha = $("#captcha").val()
        $("#captcha").text("Résoudre" + chiffre2 + "+" + chiffre2); 
       if ($("#calculer").val() == total){
        console.log("ok"); 
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
    }



//----------------------------------------------------
//FOOTER
slide = new slider("#carroussel");
//si j'en crée une deuxieme je remet -- slide = new slider("idDuNouveauCarroussel");

//-----------------------------------------------
})
//variable pour le footer
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