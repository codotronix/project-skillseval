(function(){
    angular.module("skillseval").controller("authController", authController);
    
    authController.$inject = ['$location']

    function authController ($location) {
        
        var vm = this;
        vm.menuItems = undefined;

        init ();


        function init () {
            
        }
    }
})();