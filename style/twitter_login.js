window.onload = function(){
  document.querySelector('div.commentaires div.btn span.tw').addEventListener('click', function() {
    // Initialize with your OAuth.io app public key
    OAuth.initialize('HwAr2OtSxRgEEnO2-JnYjsuA3tc');
    // Use popup for OAuth
    OAuth.popup('twitter').then(twitter => {
      console.log('twitter:', twitter);
      // Prompts 'welcome' message with User's email on successful login
      // #me() is a convenient method to retrieve user data without requiring you
      // to know which OAuth provider url to call
      //twitter.me().then(data => {
        //console.log('data:', data);
        //alert('Twitter alias:' + data.alias + ".\nView browser 'Console Log' for more details");
      //});
      // Retrieves user data from OAuth provider by using #get() and
      // OAuth provider url    
      twitter.get('/1.1/account/verify_credentials.json?include_email=true').then(data => {
        console.log('username:', data.screen_name);
        $("div.commentaires div#logged").html(`Commenter avec<div class="btn"><span class="tw"></span> ${data.screen_name}</div>`);
        $("div.commentaires textarea").prop("disabled", false);
      })    
    });
  })
}

// always overwrite window.name, in case users try to set it manually
window.name = "result"

let allLines = []

window.addEventListener("message", (message) => {
  if (message.data.console){
    let insert = document.querySelector("#insert")
    allLines.push(message.data.console.payload)
    insert.innerHTML = allLines.join(";\r")

    let result = eval.call(null, message.data.console.payload)
    if (result !== undefined){
      console.log(result)
    }
  }
})
