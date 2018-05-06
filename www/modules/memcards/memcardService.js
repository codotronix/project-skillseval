(function(){

    angular.module("skillseval").factory("memcardService", memcardService);
    
    memcardService.$inject = ['ajaxService', 'urlService'];

    function memcardService (ajaxService, urlService) {

        return {
            getCards: getCards
        }

        function getCards (libName, cardName, fileID) {
            return ajaxService.doGet(urlService.getCardUrl(libName, cardName, fileID));
        }

    }

})();