(function(){
    angular.module("skillseval").controller("authController", authController);
    
    authController.$inject = ['$location']

    function authController ($location) {
        
        var vm = this;
        vm.continueAsGuest = continueAsGuest;

        init ();


        function init () {
            
        }

        function continueAsGuest () {
        	$location.path('/home');
        }
    }
})();