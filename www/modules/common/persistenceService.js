(function(){
    angular.module("skillseval").factory("persistenceService", persistenceService);
    
    persistenceService.$inject = ['$http', '$q', "secretService"];

    function persistenceService ($http, $q, secretService) {
        
        return {
            doGet: doGet
        }

        
    }
})();