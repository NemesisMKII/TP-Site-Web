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
    // formulaire 
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
        
        function validateForm(){
            document.getElementById('log').innerHTML = '';
            var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
            var string2 = removeSpaces(document.getElementById('txtInput').value);
            if (string1 != string2 || string2 == ""){
            Captcha();
            document.getElementById('log').innerHTML += '<span style="font-size:16px; padding: 25px;">Entered Invalid Captcha</span> ';
            return false;
            }
            }
            function Captcha(){
            var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0');
            var i;
            for (i=0;i<6;i++){
            var a = alpha[Math.floor(Math.random() * alpha.length)];
            var b = alpha[Math.floor(Math.random() * alpha.length)];
            var c = alpha[Math.floor(Math.random() * alpha.length)];
            var d = alpha[Math.floor(Math.random() * alpha.length)];
            var e = alpha[Math.floor(Math.random() * alpha.length)];
            var f = alpha[Math.floor(Math.random() * alpha.length)];
            var g = alpha[Math.floor(Math.random() * alpha.length)];
            }
            var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
            document.getElementById("mainCaptcha").value = code
            var colors = ["#B40404", "#beb1dd", "#b200ff", "#faff00", "#0000FF", "#FE2E9A", "#FF0080", "#2EFE2E", ];
            var rand = Math.floor(Math.random() * colors.length);
            $('#mainCaptcha').css("background-color", colors[rand]);
            }
            function removeSpaces(string){
            return string.split(' ').join('');
            }
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
