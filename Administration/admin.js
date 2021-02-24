/* PAGE TEMPLATES START */
var homeTEMPLATE = `
    <h2 class="text-center">Panel de gestion administrateur</h2>
    <div class='m-3 mt-4 bg-success contentdiv'>
    
    </div>
`
var photosTEMPLATE = `
    <h2 class="text-center">Gestion des photos</h2>
    <div class='m-3 mt-4 border border-dark contentdiv overflowscroll'>
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
    <div class='m-3 mt-4 border border-dark contentdiv overflowscroll'>
        <div class='d-flex justify-content-around mt-4' id="albumcontainer">
        
        </div>
    </div>
    <div class='d-flex justify-content-center'>
        <button class='btn btn-warning mx-1' id="addalbum" >Ajouter un album ...</button>
        <button class='btn btn-warning ms-1' id="delalbum" >Supprimer un album ...</button>
    </div>
`
/* PAGE TEMPLATES END */

$(document).ready(() => {

    if (!localStorage.getItem('albumlist')) {
        var albumlist = []
        localStorage.setItem('albumlist', JSON.stringify(albumlist))
    } else {
        var albumlist = JSON.parse(localStorage.getItem('albumlist'))
    }

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
                    for (albumitem in albumlist) {
                        $('#albumcontainer').append(`
                        <div class='album'>
                        </div>
                        `)
                    }
                    break
                }
            }
        }
    }
    
    $('aside ul li').click(setURL)

    $('#addalbum').click(addAlbum)
    $('#delalbum').click(delAlbum)

    function addAlbum() {
        var album = []
        $('.maincontainer').empty()
        $('.maincontainer').append(`
        <h2 class="text-center">Ajouter un album </h2>
        <div class="m-3 mt-4 border border-dark contentdiv">
            <div class="text-center pt-1">
                <p class="mb-1">Nom de l'album</p>
                <input type="text" placeholder="Entrez un nom d'album ..." id="albumtitle"/>
            </div>
            <h4 class="text-center mt-3">Choisissez une ou plusieurs photos</h4>
            <div class='d-flex justify-content-around mt-2 overflowscroll' id="photocontainer">
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
        <button class="btn btn-success d-block mx-auto" id="confirm">Confirmer</button>
        `)
        
        $('img').click((e) => {
            var photo = $(e.target)
            var isalreadyselected = false
            for (photoitem in album) {
                if (album[photoitem] == photo.attr('src')) {
                    photo.removeClass('selection')
                    isalreadyselected = true
                    album.splice(album[photoitem], 1)
                    console.log(album);
                }
            }
            if (isalreadyselected == false) {
                photo.addClass('selection')
                album.push(photo.attr('src'))
                console.log(album);
            }
        })

        $('#confirm').click(() => {
            if ($('#albumtitle').val().length != 0) {
                albumlist.push(album)
                console.log(albumlist);
                localStorage.setItem('albumlist', JSON.stringify(albumlist))
                location.reload()
            } else {
                alert("Veuillez rentrer un nom d'album")
            }
        })
    }

    function delAlbum() {
        $('.contentdiv').empty()
    }

    function setURL() {
        window.location.href = `index.html?page=${$(this).data('id')}`
    }
})