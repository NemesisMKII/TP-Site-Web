$(document).ready (() => {
    //Click on "techniques" shows techniques list
    $('#techniques').hover((e) => {
        $('#technique_list').toggleClass('show')
    })
    //Click on "categories" shows categories list
    $('#categories').hover((e) => {
        $('#categories_list').toggleClass('show')
    })
})