/* PAGE TEMPLATES START */
var homeTEMPLATE = `
    <h2 class="text-center">Bienvenue dans l'interface de gestion administrateur</h2>
`
var photosTEMPLATE = `
    <h2 class="text-center">Gestion des photos</h2>
`
var askloginTEMPLATE = `
    <h2 class="text-center">Demandes de connexion</h2>
`
var connexionsTEMPLATE = `
    <h2 class="text-center">Connexions</h2>
`
/* PAGE TEMPLATES END */

$(document).ready(() => {
    console.log('page chargée.');
    var page = window.location.href.split('?')[1]
    if (page != undefined) {
        page = page.split('=')[1]
        if (page != undefined) {
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
            }
        }
    }
    
    $('aside ul li').click(setURL)

    function setURL() {
        window.location.href = `index.html?page=${$(this).data('id')}`

    }
})