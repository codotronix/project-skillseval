(function(){
    angular.module("skillseval").controller("keyController", keyController);
    
    keyController.$inject = ['ajaxService', 'urlService', '$routeParams', '$location', 'modalService']

    function keyController (ajaxService, urlService, $routeParams, $location, modalService) {
        
        var vm = this;
        init ();


        function init () {
            populateMenu();
        }


        
    }
})();