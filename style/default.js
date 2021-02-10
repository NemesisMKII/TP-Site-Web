// Fonction LOGIN

$("#btnConnexion").click(function() {

    $("#modalLogin").modal("show")				//affiche le formulaire de connexion sous forme de modal
    $("#formLogin").submit(function(event) {
        event.preventDefault()
        var pseudo = $("#myID").val()			//recup le pseudo
        var MdP = $("#myPassword").val()		//recup le mot de passe
        login (pseudo, MdP)						//lance la fonction Login
    })
})

$("#btnClose").click(function () {		//fermeture du formulaire de connection au clic sur X en haut a droite
    $("#modalLogin").hide()
})

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