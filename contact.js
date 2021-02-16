// a l'ext de onready
function captcha_new(){
    var chiffre1 = Math.floor(Math.random() * 10);     // retourne un chiffre entre 0 et 9
    var chiffre2 = Math.floor(Math.random() * 10);     // retourne un chiffre entre 0 et 9
    var total = chiffre1+chiffre2;		// je calcul combien font chiffre1 + chiffre2
    $("#dyna").text("Résoudre l'opération suivante:" + chiffre1 + " + " + chiffre2); // ici j'informe le visiteur du calcul à réaliser en modifiant le contenu de ma balise p#captcha_dyn
    return total; // je retourne le total pour le sortir mon total de ma fonction ligne 37
}

// int à onready
$(document).ready(function (){
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
});

// à l'exterieur et aprè on onload
var total = captcha_new(); // j'execute ma fonction et je sort le total de ma fonction #ligne 37
console.log(total);