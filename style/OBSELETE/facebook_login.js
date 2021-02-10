function fb_login() {  

  FB.init({
    appId      : '1381189062227096',
    cookie     : true,                     // Enable cookies to allow the server to access the session.
    xfbml      : true,                     // Parse social plugins on this webpage.
    version    : 'v9.0'           // Use this Graph API version for this call.
  });

  FB.getLoginStatus(function(response) {   // See the onlogin handler
    if (response.status === 'connected'){
      FB.login( function() {}, { scope: 'email,public_profile' } );
      FB.api('/me', function(response) {
        //console.log('Successful login for: ' + response.name);
        $("div.commentaires div#logged").html(`Commenter avec<div class="btn"><span class="fb"></span> ${response.name}</div>`);
        $("div.commentaires textarea").prop("disabled", false);
        /*document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!'; */
      });
    }
  });
}
