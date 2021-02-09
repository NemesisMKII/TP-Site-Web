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
        var age = $("#age:checked").val()
 

    if ( firstName == "" || name == "" || objet =="" || message == "" || $("#age").prop("checked") == false){
        alert("Tous les champs ne sont pas remplis")
    }else{
        var newform = {
            nom : name,
            prenom : firstName,
            email : mail,
            objetMessage : objet,
            message : message,
            date : (new Date()).getTime(),
            ageLegal : age
          
        } 
        formObj.form.push(newform)
        localStorage.setItem('formulaire', JSON.stringify(formObj))
    
        $("#firstName").val("")
        $("#name").val("")
        $("#objet").val("")
        $("#message").val("")
        $("#mail").val("")
        }
    }
 


})