(function(){

    angular.module("skillseval").controller("memcardController", memcardController);
    
    memcardController.$inject = ['modalService', '$routeParams', '$location', 'memcardService'];

    function memcardController (modalService, $routeParams, $location, memcardService) {

        var vm = this;
        vm.cards = undefined;
        vm.cardTitle = undefined;
        vm.activeCardIndex = 0;

        init();

        function init () {
            modalService.showLoader();
            //identifyLibraryType();
            getCards();            
        }


        function getCards () {
            $routeParams.libName = decodeURIComponent($routeParams.libName).toLowerCase();
            vm.cardTitle = $routeParams.memcard = decodeURIComponent($routeParams.memcard).toLowerCase();
            memcardService.getCards($routeParams.libName, $routeParams.memcard, "0")
            .then(loadCards, commonErrorHandler);
        }
        

        //load the library in vm
        function loadCards (res) {
            //console.log(res.data);
            var cards = res.data.cards;
            vm.libName = ($routeParams.memcard || $routeParams.libName).toUpperCase();

            vm.cards = cards;

            //console.log(vm.topics);
            modalService.hideLoader();
        }



        //A common error handler for now
        function commonErrorHandler (err) {
            console.log(err);           
            resetToLibraryIndexPage();
        }


        /*
        * Clear / reset required variables
        * and send back to Library Index page
        */
        function resetToLibraryIndexPage () {
            //console.log("Sending back to Library Index Page...");
            $location.path("/library");
        }

    }

})();