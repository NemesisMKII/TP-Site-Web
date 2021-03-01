/* PAGE TEMPLATES START */

var homeTEMPLATE = `
    <h2 class="text-center">Panel de gestion administrateur</h2>
    <div class='m-3 mt-4 contentdiv'>
    
    </div>
`
var photosTEMPLATE = `
    <h2 class="text-center">Gestion des photos</h2>
    <div class='m-3 mt-4 contentdiv overflowscroll'>
        <div class='d-flex justify-content-around mt-2 overflowscroll' id="photocontainer">
        </div>
    </div>
    <div class='d-flex justify-content-center'>
        <button class='btn btn-warning mx-1' id="addphoto" >Ajouter une photo ...</button>
        <button class='btn btn-warning ms-1' id="delphoto" >Supprimer une photo ...</button>
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
    <div class='m-3 mt-4 contentdiv overflowscroll'>
        <div class='d-flex justify-content-around mt-4 mb-5' id="albumcontainer">
        
        </div>
    </div>
    <div class='d-flex justify-content-center'>
        <button class='btn btn-warning mx-1' id="addalbum" >Ajouter un album ...</button>
        <button class='btn btn-warning ms-1' id="delalbum" >Supprimer un album ...</button>
    </div>
`
/* PAGE TEMPLATES END */

$(document).ready(() => {
    //Load localstore if already exists, or create it
    if (!localStorage.getItem('albumlist')) {
        var albumlist = []
        localStorage.setItem('albumlist', JSON.stringify(albumlist))
    } else {
        var albumlist = JSON.parse(localStorage.getItem('albumlist'))
    }
    if (!localStorage.getItem('photolist')) {
        var dataid;
        var photolist = []
        localStorage.setItem('photolist', JSON.stringify(photolist))
    } else {
        var photolist = JSON.parse(localStorage.getItem('photolist'))
        var dataid = photolist.length + 1
    }

    /*on click on a menu element, set the url corresponding to the element, then reloads.
    page var is used to split the url in order to get only the element id
    Then, after checking if there is an id in the url,
    Switch case is used to fill the maincontainer with templates.*/
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
                    for (photoitem in photolist) {
                        $('#photocontainer').append(`
                        <img src="../ress/imagesCarrou/miniature/${photolist[photoitem].urlminiature}" class="mb-5" data-tec="${photolist[photoitem].datatec}" data-cat="${photolist[photoitem].datacat}" data-target="${photolist[photoitem].datatarget}"  name="${photolist[photoitem].name}" data-ex="${photolist[photoitem].dataex}" data-id="${photolist[photoitem].data_id}">
                        `)
                    }
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
                        <div class='album mb-5'>
                            <img src="../ress/imagesCarrou/miniature/${albumlist[albumitem].photos[0].urlminiature}" class="img-fluid fit" name="${albumlist[albumitem].name}" />
                            <p class="text-center">${albumlist[albumitem].name}</p>
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
    $('#addphoto').click(addPhoto)
    $('#delphoto').click(delPhoto)

    function addPhoto() {
        /* Used to add photo to the website, made to be obsolete and replaced 
        */
        var photoloaded = false
        $('.maincontainer').empty()
        $('.maincontainer').append(`
        <h2 class="text-center">Ajouter une photo </h2>
        <div class="m-3 mt-4 contentdiv overflowscroll">
            <form action="" class="d-flex p-5" id="form">
                <div class="d-block mx-auto" id="photoloaddiv">
                    <p class="mb-1">TEMPORAIRE: Entrez l'URL de la photo (miniature)</p>
                    <input type="text" placeholder="Ex: photo.jpg" class="mb-2" id="photoURL">
                    <input type="button" value="charger photo" id="photoload">
                </div>
                <div class="d-flex">
                    <div class="row justify-content-around">
                        <div class="col">
                            <p class="mb-1">Catégorie:</p>
                            <input type="text" class="mb-2" id="category" placeholder="initiales CAT MAJ ex: AR">
                        </div>
                        <div class="col">
                            <p class="mb-1">Technique:</p>
                            <input type="text" class="mb-2" id="technique" placeholder="initiales TEC MAJ ex: AR">
                        </div>
                        <div class="col">
                            <p class="mb-1">Date de prise de la photo:</p>
                            <input type="text" class="mb-2" id="date" placeholder="Non obligatoire">
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <div class="col">
                            <p class="mb-1">Focale:</p>
                            <input type="text" class="mb-2" id="focale" placeholder="Non obligatoire">
                        </div>
                        <div class="col">
                            <p class="mb-1">Temps d'exposition:</p>
                            <input type="text" class="mb-2" id="exposition" placeholder="Non obligatoire">
                        </div>
                        <div class="col">
                            <p class="mb-1">Iso:</p>
                            <input type="text" class="mb-2" id="iso" placeholder="Non obligatoire">
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <div class="col">
                            <p class="mb-1">Utilisation du flash:</p>
                            <input type="text" class="mb-2" id="flash" placeholder="Non obligatoire">
                        </div>
                        <div class="col">
                            <p class="mb-1">Longueur de la focale:</p>
                            <input type="text" class="mb-2" id="focalelength" placeholder="Non obligatoire">
                        </div>
                    </div>
                </div>
                <input type="submit" class="d-block mx-auto">
            </form>
        </div>
        `)

        $('#photoload').click(() => {
            $('#photoload').unbind('click')
            if (photoloaded) {
                $('#photoloaddiv').empty()
                $('#photoloaddiv').after(`
                <img src="../ress/imagesCarrou/miniature/${$('#photoURL').val()}" alt="" class="row">
                `)
            } else {
                $('#photoloaddiv').after(`
                <img src="../ress/imagesCarrou/miniature/${$('#photoURL').val()}" alt="" class="row">
                `)
            }
            
        })

        $('#form').submit((e) => {
            e.preventDefault()
            var urlref = $('#photoURL').val().split('/')
            urlref = urlref[urlref.length - 1]
            console.log(urlref);
            if ($('#technique').val().length == 0 || $('#category').val().length == 0) {
                alert('erreur')
            } else {
                var photo = {
                    urlminiature: $('#photoURL').val(),
                    datatec: $('#technique').val(),
                    datacat: $('#category').val(),
                    datatarget: 'html',
                    name: $('#photoURL').val().split('.')[0],
                    dataex: '.' + $('#photoURL').val().split('.')[1],
                    data_id: $('#photoURL').val()
                }
                photolist.push(photo)
                localStorage.setItem('photolist', JSON.stringify(photolist))
            }
            location.reload()
        })
    }

    function delPhoto() {
        var supimage = []
        $('.contentdiv').prepend(`
        <h2 class="text-center">Choisissez les photos à supprimer</h2>
        `)
        $('.contentdiv').append(`
        <button class="btn btn-success d-block mx-auto" id="confirm">Confirmer</button>
        `)
        $('img').click((e) => {
            var photo = $(e.target)
            var isalreadyselected = false
            for (item in supimage) {
                if (photo.attr('name') == supimage[item].name) {
                    photo.removeClass('selection')
                    isalreadyselected = true
                    supimage.splice(item, 1)
                }
            }
            if (isalreadyselected == false) {
                for (photoitem in photolist) {
                    if (photo.attr('name') == photolist[photoitem].name) {
                        photo.addClass('selection')
                        supimage.push(photolist[photoitem])
                    }
                }
            }
        })

        $('#confirm').click(() => {
            for (item in supimage) {
                for (photoitem in photolist) {
                    if (supimage[item].name == photolist[photoitem].name) {
                        photolist.splice(photoitem, 1)
                    }
                }
            }
            localStorage.setItem('photolist', JSON.stringify(photolist))
            location.reload()
        })
    }

    function addAlbum() {
        var album = []
        $('.maincontainer').empty()
        $('.maincontainer').append(`
        <h2 class="text-center">Ajouter un album </h2>
        <div class="m-3 mt-4 contentdiv" id="albumlisting">
            <div class="text-center pt-1">
                <p class="mb-1">Nom de l'album</p>
                <input type="text" placeholder="Entrez un nom d'album ..." id="albumtitle"/>
            </div>
            <h4 class="text-center mt-3">Choisissez une ou plusieurs photos</h4>
            <div class='d-flex justify-content-around mt-2 overflowscroll' id="photocontainer">
            </div>
        </div>
        <button class="btn btn-success d-block mx-auto" id="confirm">Confirmer</button>
        `)

        for (photoitem in photolist) {
            $('#photocontainer').append(`
            <img src="../ress/imagesCarrou/miniature/${photolist[photoitem].urlminiature}" data-tec="${photolist[photoitem].datatec}" data-cat="${photolist[photoitem].datacat}" data-target="${photolist[photoitem].datatarget}"  name="${photolist[photoitem].name}" data-ex="${photolist[photoitem].dataex}" data-id="${photolist[photoitem].data_id}">
            `)
        }
        
        $('img').click((e) => {
            var photo = $(e.target)
            var isalreadyselected = false
            for (photoitem in album) {
                if (album[photoitem].name == photo.attr('src').split('/')[photo.attr('src').split('/').length - 1].split('.')[0]) {
                    photo.removeClass('selection')
                    isalreadyselected = true
                    album.splice(photoitem, 1)
                }
            }
            if (isalreadyselected == false) {
                for (photos in photolist) {
                    if (photo.attr('src').split('/')[photo.attr('src').split('/').length - 1].split('.')[0] == photolist[photos].name) {
                        photo.addClass('selection')
                        album.push(photolist[photos])
                        console.log(album);
                    }
                }
                
            }
        })

        $('#confirm').click(() => {
            if ($('#albumtitle').val().length != 0) {
                albumobject = {
                    photos: album,
                    name: $('#albumtitle').val()
                }
                albumlist.push(albumobject)
                localStorage.setItem('albumlist', JSON.stringify(albumlist))
                location.reload()
            } else {
                alert("Veuillez rentrer un nom d'album")
            }
        })
    }

    function delAlbum() {
        var supalbum = []
        $('.contentdiv').prepend(`
        <h2 class="text-center">Choisissez les albums à supprimer</h2>
        `)
        $('.contentdiv').append(`
        <button class="btn btn-success d-block mx-auto" id="confirm">Confirmer</button>
        `)
        $('img').click((e) => {
            var album = $(e.target)
            var isalreadyselected = false
            console.log(album.attr('name'));
            for (item in supalbum) {
                if (album.attr('name') == supalbum[item].name) {
                    album.removeClass('selection')
                    isalreadyselected = true
                    supalbum.splice(item, 1)
                    console.log(supalbum);
                }
            }
            if (isalreadyselected == false) {
                for (albumitem in albumlist) {
                    if (album.attr('name') == albumlist[albumitem].name) {
                        album.addClass('selection')
                        supalbum.push(albumlist[albumitem])
                        console.log(supalbum);
                    }
                }
            }
        })

        $('#confirm').click(() => {
            for (item in supalbum) {
                for (albumitem in albumlist) {
                    if (supalbum[item].name == albumlist[albumitem].name) {
                        albumlist.splice(albumitem, 1)
                    }
                }
            }
            localStorage.setItem('albumlist', JSON.stringify(albumlist))
            location.reload()
        })
    }

    function setURL() {
        window.location.href = `index.html?page=${$(this).data('id')}`
    }
})