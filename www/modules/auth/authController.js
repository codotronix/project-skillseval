(function(){
    angular.module("skillseval").controller("authController", authController);
    
    authController.$inject = ['$location', 'modalService']

    function authController ($location, modalService) {
        
        var vm = this;
        vm.continueAsGuest = continueAsGuest;

        init ();


        function init () {
            // Initialize the FirebaseUI Widget using Firebase.
            var ui = new firebaseui.auth.AuthUI(firebase.auth());

            var uiConfig = {
              callbacks: {
                signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                  // User successfully signed in.
                  // Return type determines whether we continue the redirect automatically
                  // or whether we leave that to developer to handle.
                  console.log(">>>>>>> authResult ");
                  console.log(authResult);
                  $location.path('/home');
                  return false;
                },
                uiShown: function() {
                  // The widget is rendered.
                  // Hide the loader.
                  modalService.hideLoader();
                }
              },
              // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
              signInFlow: 'popup',
              //signInSuccessUrl: '/success',
              signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
              ],
              // Terms of service url.
              tosUrl: '<your-tos-url>'
            };



            // The start method will wait until the DOM is loaded.
            modalService.showLoader();
            ui.start('#firebaseui-auth-container', uiConfig);
        }

        function continueAsGuest () {
        	$location.path('/home');
        }
    }
})();