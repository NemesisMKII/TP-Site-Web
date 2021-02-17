window.onload = function(){
  document.querySelector('div.commentaires div.btn span.tw').addEventListener('click', function() {
    // Initialize with your OAuth.io app public key
    OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');
    // Use popup for OAuth
    OAuth.popup('twitter').then(twitter => {
      //console.log('twitter:', twitter);
      twitter.get('/1.1/account/verify_credentials.json?include_email=true').then(data => {
        // console.log('username:', data.screen_name);
        $("div.commentaires div#logged").html(`Commenter avec<div class="btn"><span class="tw"></span> ${data.screen_name}</div>`);
        $("div.commentaires textarea").prop("disabled", false);
      })    
    });
  })
}