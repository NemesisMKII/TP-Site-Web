/* PAGE TEMPLATES START */
var homeTEMPLATE = `
    <h2 class="text-center">Panel de gestion administrateur</h2>
    <div class='m-3 mt-4 bg-success contentdiv'>
    
    </div>
`
var photosTEMPLATE = `
    <h2 class="text-center">Gestion des photos</h2>
    <div class='m-3 mt-4 border border-dark contentdiv'>
        <div class='d-flex justify-content-around mt-4' id="photocontainer">
            <img src="../ARphoto.jpg" class='m-2'/>
            <img src="../BOphoto.jpg" class='m-2'/>
            <img src="../EVphoto.jpg" class='m-2'/>
            <img src="../GRphoto.jpg" class='m-2'/>
            <img src="../HDphoto.png" class='m-2'/>
            <img src="../HKphoto.jpg" class='m-2'/>
            <img src="../HSphoto.jpg" class='m-2'/>
            <img src="../GRphoto.jpg" class='m-2'/>
            <img src="../LPphoto.jpg" class='m-2'/>
            <img src="../NBphoto.jpg" class='m-2'/>
            <img src="../PAphoto.jpg" class='m-2'/>
            <img src="../PLphoto.jpg" class='m-2'/>
            <img src="../POphoto.jpg" class='m-2'/>
            <img src="../STphoto.jpg" class='m-2'/>
            <img src="../TSphoto.jpg" class='m-2'/>
        </div>
    </div>
    
`
var askloginTEMPLATE = `
    <h2 class="text-center">Demandes de connexion</h2>
`
var connexionsTEMPLATE = `
    <h2 class="text-center">Connexions</h2>
`

var albumsTEMPLATE = `
    <h2 class="text-center">Gérer les albums</h2>
    <div class='m-3 mt-4 border border-dark contentdiv'>
        <div class='d-flex justify-content-around mt-4' id="albumcontainer">
        
        </div>
    </div>
    <div class='d-flex justify-content-center'>
        <button class='btn btn-warning mx-1' >Ajouter un album ...</button>
        <button class='btn btn-warning ms-1' >Supprimer un album ...</button>
    </div>
`
/* PAGE TEMPLATES END */

$(document).ready(() => {
    var page = window.location.href.split('?')[1]
    if (page != undefined) {
        page = page.split('=')[1]
        if (page != undefined) {
            if (page == 'return') {
                window.location.href = '../index.html'
            } else {
                $('main div.maincontainer').empty()
            switch(page) {
                case 'home':
                    $('main div.maincontainer').append(homeTEMPLATE)
                    break
                case 'photos':
                    $('main div.maincontainer').append(photosTEMPLATE)
                    break
                case 'asklogin':
                    $('main div.maincontainer').append(askloginTEMPLATE)
                    break
                case 'connexions':
                    $('main div.maincontainer').append(connexionsTEMPLATE)
                    break
                case 'albums':
                    $('main div.maincontainer').append(albumsTEMPLATE)
                    break
                }
            }
        }
    }
    
    $('aside ul li').click(setURL)

    function setURL() {
        window.location.href = `index.html?page=${$(this).data('id')}`
    }
})