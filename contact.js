$(document).ready(function () {
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
        //vide les champs
        alert("msg envoyé")
        $("#firstName").val("")
        $("#name").val("")
        $("#objet").val("")
        $("#message").val("")
        $("#mail").val("")       
        }
    }
})